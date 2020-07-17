import os
from flask import Flask, flash, request, redirect, url_for,session
from werkzeug.utils import secure_filename
from flask import send_from_directory
from flask import render_template
import json
import sqlite3
import numpy as np
from PIL import Image
from operations import grayscale, negative

with sqlite3.connect('files.db') as conn:
	cur = conn.cursor()
	cur.execute("""CREATE TABLE IF NOT EXISTS uploads(
	   id INTEGER PRIMARY KEY AUTOINCREMENT,
	   fname TEXT,
	   ext TEXT);
	""")
	conn.commit()
	cur.execute("""CREATE TABLE IF NOT EXISTS operations(
	   id INTEGER PRIMARY KEY AUTOINCREMENT,
	   file INTEGER,
	   version INTEGER DEFAULT 0,
	   redo INTEGER DEFAULT 0);
	""")
	conn.commit()
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ext = None

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

def allowed_file(filename):
	global ext
	ext = filename.rsplit('.', 1)[1].lower()
	return '.' in filename and ext in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
        # check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			global ext
			filename = secure_filename(file.filename)
            #app.logger.debug(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			conn = sqlite3.connect('files.db')
			cur = conn.cursor()
			#app.logger.debug("""INSERT INTO uploads(fname) VALUES('{}');""".format(filename))
			cur.execute("""INSERT INTO uploads(fname,ext) VALUES('{}','{}');""".format(filename,ext))
			conn.commit()
			cur.execute("SELECT * FROM uploads order by id desc;")
			result = cur.fetchone()
			loc = result[0]
			cur.execute("""INSERT INTO operations(file) VALUES('{}');""".format(loc))
			conn.commit()
			os.mkdir(app.config['UPLOAD_FOLDER']+"/"+str(loc))
			img_path =  os.path.join(app.config['UPLOAD_FOLDER'],str(loc), "0."+ext)
			file.save(img_path)
			session['response'] = '1'
			return redirect(url_for('load_img', loc=loc))

	return render_template('index.html')

@app.route('/<loc>')
def load_img(loc):
	path =  app.config['UPLOAD_FOLDER']+"/"+str(loc)
	conn = sqlite3.connect('files.db')
	cur = conn.cursor() 
	cur.execute("SELECT * FROM uploads where id = '{}'".format(loc))
	ext = cur.fetchone()[2]
	cur.execute("SELECT * FROM operations where file = '{}' group by file order by version desc;".format(loc))
	name = str(cur.fetchone()[2])+"."+ext
	return render_template('index.html',path =path+"/"+name, name = name)

@app.route('/<filename>')
def load_page(filename):
	return render_template(filename)

@app.route('/uploads/<folder>/<filename>')
def uploaded_file(folder,filename):
    return send_from_directory(app.config['UPLOAD_FOLDER']+"/"+folder,filename)

@app.route('/edit', methods=['POST'])
def operation():
	try :
		operation = request.form.get('Operation')
		img_path = request.form.get('Image')
		img = np.array(Image.open(img_path))
		file_id = int(img_path.split('/')[1])
		#app.logger.debug(file_id)
		if operation == "Grayscale":
			operated_img = grayscale(img)
		elif operation == "Negative":
			operated_img = negative(img)
		#app.logger.debug(operated_img)
		conn = sqlite3.connect('files.db')
		cur = conn.cursor()
		cur.execute("SELECT * FROM uploads where id = '{}'".format(file_id))
		result = cur.fetchone()
		ext = result[2]
		cur.execute("SELECT * FROM operations where file = '{}' group by file order by version desc;".format(file_id))
		version = int(cur.fetchone()[2]) + 1
		cur.execute("""INSERT INTO operations(file,version) VALUES('{}','{}');""".format(file_id,version))
		conn.commit()
		path = app.config['UPLOAD_FOLDER']+"/"+str(file_id)+"/"+str(version)+"."+ext
		operated_img.save(path)
		#app.logger.debug(path)
		load_img(file_id)
		return json.dumps({"status":"Ok","file":file_id})
	except Exception as e: 
		return json.dumps({"status":"Error","error":e})
