
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CImageard = ({text, oterstyle, onSelectImage, onImageDelete}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        setSelectedImage(image);
        if (onSelectImage) {
          onSelectImage(image);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    if (onImageDelete) {
      onImageDelete(selectedImage);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, oterstyle]}
      activeOpacity={0.9}
      onPress={handleImageUpload}>

      {selectedImage ? (
        <>
          <Image source={{uri: selectedImage?.path}} style={styles.image} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleImageDelete}>
            <Ionicons name="md-trash-bin" size={20} style={styles.deleteIcon} />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.contentContainer}>
          <Ionicons name="md-add-circle" size={50} style={styles.icon} />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CImageard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 6,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  icon: {
    color: 'white',
  },
  text: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 15,
    padding: 5,
  },
  deleteIcon: {
    color: 'blue',
  },
});
