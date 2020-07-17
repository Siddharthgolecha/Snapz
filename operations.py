import numpy as np

def grayscale(img):
	return np.dot(img[...,:3],[0.2989,0.5870,0.1140])

def negative(img):
	r = 255 - img[:,:,0]
	g = 255 - img[:,:,1]	
	b = 255 - img[:,:,2]	
	return [r,g,b]

def crop(img):

	pass

def resize(img):

	pass
