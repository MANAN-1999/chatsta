import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import CImageard from '../../component/CImageard';
import CButton from '../../component/CButton';
import {addphoto, addphotodesc} from '../../utils/Strings';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {setAddImage} from '../../redux/Slices/UserSlice';

const AddPhotosScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data} = useSelector(state => state.user);
  console.log(data, 'data');
  const [imageArray, setImageArray] = useState([]);

  // const uploadImage = async image => {
  //   const {path} = image;
  //   const reference = storage().ref(`images/${Math.random() * 100}-manan`);
  //   const task = reference.putFile(path);

  //   task.on('state_changed', taskSnapshot => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
  //     );
  //   });

  //   task.then(() => {
  //     console.log('Image uploaded to the bucket!');
  //   });
  //   dispatch(setAddImage(image));
  // };

  const uploadImagesToStorage = async filePaths => {
    try {
      const uploadTasks = filePaths.map(async filePath => {
        try {
          const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
          const ref = storage().ref(`images/${fileName}`);
          const response = await fetch(filePath);
          const blob = await response.blob();
          const task = ref.put(blob);

          task.on(
            'state_changed',
            snapshot => {
              console.log(snapshot.bytesTransferred, 'of', snapshot.totalBytes);
            },
            error => {
              console.log(error);
            },
          );

          await task;
          const downloadURL = await ref.getDownloadURL();
          console.log(downloadURL, 'downloadURL');
          return downloadURL;
        } catch (error) {
          console.log('Error uploading image:', error.message);
          return null;
        }
      });

      const uploadedImageUrls = await Promise.all(uploadTasks);
      console.log('Uploaded Image URLs:', uploadedImageUrls);

      // Filter out any null values from the array
      const filteredImageUrls = uploadedImageUrls.filter(url => url !== null);
      console.log(filteredImageUrls, 'filteredImageUrls');

      // Store the uploaded image URLs in your desired array in Redux or component state
      // For example:
      // dispatch(setUploadedImages(filteredImageUrls));
      // or
      // setUploadedImages(filteredImageUrls);

      return filteredImageUrls;
    } catch (error) {
      console.log('Error uploading images:', error);
      return [];
    }
  };

  const handleImageSelect = image => {
    setImageArray(pre => [...pre, image.path]);
  };

  const handleImageSelect1 = image => {
    setImageArray(pre => [...pre, image.path]);
  };

  const handleImageSelect2 = image => {
    setImageArray(pre => [...pre, image.path]);
  };

  const handleImageSelect3 = image => {
    setImageArray(pre => [...pre, image.path]);
  };

  const handleImageSelect4 = image => {
    setImageArray(pre => [...pre, image.path]);
  };

  const handleImageDelete = deletedImage => {
    setImageArray(prevArray =>
      prevArray.filter(image => image !== deletedImage.path),
    );
  };

  const handleNext = async () => {
    try {
      uploadImagesToStorage(imageArray)
        .then(async uploadedImageUrls => {
          console.log(uploadedImageUrls,"uploadedImageUrls");
          dispatch(setAddImage(uploadedImageUrls));
          navigation.navigate('Moreaboutyou');
        })
        .catch(error => {
          console.log(error, 'error');
        });
    } catch (error) {
      console.log('Error uploading images to Firebase Storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{addphoto}</Text>
      <Text style={styles.subtitle}>{addphotodesc}</Text>
      <View style={styles.mainPhotoContainer}>
        <CImageard
          title="Click here to upload main photo"
          oterstyle={{height: '100%', borderRadius: 20}}
          onSelectImage={handleImageSelect}
          onImageDelete={handleImageDelete}
        />
      </View>
      <View style={styles.additionalPhotosContainer}>
        <CImageard
          oterstyle={styles.comCard}
          onSelectImage={handleImageSelect1}
          onImageDelete={handleImageDelete}
        />
        <CImageard
          oterstyle={styles.comCard}
          onSelectImage={handleImageSelect2}
          onImageDelete={handleImageDelete}
        />
        <CImageard
          oterstyle={styles.comCard}
          onSelectImage={handleImageSelect3}
          onImageDelete={handleImageDelete}
        />
        <CImageard
          oterstyle={styles.comCard}
          onSelectImage={handleImageSelect4}
          onImageDelete={handleImageDelete}
        />
      </View>

      <CButton
        btntxt={'Next'}
        otherstyle={styles.button}
        onPress={() => handleNext()}
      />
    </View>
  );
};

export default AddPhotosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    width: '87%',
    marginTop: 10,
  },
  mainPhotoContainer: {
    height: '45%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  additionalPhotosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  additionalPhotoCard: {
    height: 90,
    width: 906,
    marginRight: 10,
    borderRadius: 20,
  },
  button: {
    marginTop: 50,
  },
  comCard: {
    height: 70,
    width: 70,
    marginBottom: 20,
  },
});
