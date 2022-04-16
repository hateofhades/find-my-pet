import tensorflow as tf
import tensorflow_datasets as tfds

IMG_LEN = 224
IMG_SHAPE = (IMG_LEN,IMG_LEN,3)
N_BREEDS = 120

dataset, info = tfds.load(name="stanford_dogs", with_info=True)
get_name = info.features['label'].int2str

def preprocess(ds_row):

  image = tf.image.convert_image_dtype(ds_row['image'], dtype=tf.float32)
  image = tf.image.resize(image, (IMG_LEN, IMG_LEN), method='nearest')
  
  label = tf.one_hot(ds_row['label'],N_BREEDS)

  return image, label

filename = input("Input file: ")
dog = tf.io.read_file(filename)
dog = tf.io.decode_jpeg(dog)

test_dictionary = {
    'image' : dog,
    'label':0,
}

pic,_ = preprocess(test_dictionary)

model = tf.keras.models.load_model('dog_model.h5')
model.summary()

img_tensor = tf.expand_dims(pic,0)
pred = model(img_tensor)

top_components = tf.reshape(tf.math.top_k(pred, k=5).indices,shape=[-1])
top_matches = [get_name(i) for i in top_components]

print("Dog Breed: {}".format(top_matches[0]))