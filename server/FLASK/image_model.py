import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import pickle

# Set dataset path
dataset_path = "../FLASK/vsd_dataset"  # Update with your actual dataset path

# Image dimensions
IMG_HEIGHT = 128
IMG_WIDTH = 128
BATCH_SIZE = 32

# Data Augmentation & Preprocessing
datagen = ImageDataGenerator(
    rescale=1.0/255
)

# Load the training data
train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Manually split the dataset into training and validation sets (80% training, 20% validation)
val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

# Check how many images are found by the generator
print(f"Number of images in training set: {len(train_data.filenames)}")
print(f"Number of images in validation set: {len(val_data.filenames)}")

# Define CNN Model
model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(train_data.num_classes, activation='softmax')
])

# Compile Model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train Model
epochs = 10
history = model.fit(train_data, validation_data=val_data, epochs=epochs)

# Save Model
model.save("image_model.h5")

# Print final message
print("Model training complete. Saved as image_model.h5")
