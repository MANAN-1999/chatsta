import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CHeder from '../../component/CHeder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Post = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const {width, height} = Dimensions.get('window');
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const data = useSelector(state => state.userData.userData);
  // console.log(data, 'data');

  // For Bottom Tab Bar Close On Post Screen
  useLayoutEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  useEffect(() => {
    if (!isFocused) {
      setSelectedMedia([]);
      setIsPlaying([]);
    }
  }, [isFocused]);

  const openMediaPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'any',
      multiple: true,
      cropping: true,
    })
      .then(media => {
        const newSelectedMedia = [...selectedMedia];

        media.forEach(item => {
          if (item.mime.startsWith('image')) {
            console.log(item, 'item');
            newSelectedMedia.push({type: 'image', path: item.path});
          } else if (item.mime.startsWith('video')) {
            newSelectedMedia.push({type: 'video', path: item.path});
          }
        });

        setSelectedMedia(newSelectedMedia.slice(0, 2));
        setIsPlaying(
          Array(newSelectedMedia.filter(m => m.type === 'video').length).fill(
            false,
          ),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const togglePlay = index => {
    const videoRef = videoRefs.current[index];
    if (videoRef) {
      videoRef.presentFullscreenPlayer();
      setIsPlaying(prevIsPlaying => {
        const updatedIsPlaying = [...prevIsPlaying];
        updatedIsPlaying[index] = !updatedIsPlaying[index];
        return updatedIsPlaying;
      });
    }
  };

  const uploadMediaToStorage = async media => {
    try {
      const promises = media.map(async item => {
        if (item.type === 'image') {
          const reference = storage().ref(`images/${Date.now()}`);
          await reference.putFile(item.path);
          const downloadURL = await reference.getDownloadURL();
          return {type: 'image', url: downloadURL};
        } else if (item.type === 'video') {
          const reference = storage().ref(`videos/${Date.now()}`);
          await reference.putFile(item.path);
          const downloadURL = await reference.getDownloadURL();
          return {type: 'video', url: downloadURL};
        }
      });

      return Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  };

  const PostuId = () => {
    const length = 10;
    let id = '';

    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      id += characters.charAt(randomIndex);
    }

    return id;
  };

  const handlePost = async () => {
    try {
      setIsLoding(true);
      console.log(data, 'data');
      const uploadedMediaUrls = await uploadMediaToStorage(selectedMedia);
      const docPostId = PostuId();

      const postRef = await firestore()
        .collection('posts')
        .doc(data?.docId)
        .collection('allposts');

      postRef
        .add({
          PostuId: docPostId,
          text: postText,
          media: uploadedMediaUrls,
          userData: data,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })

        .then(() => {
          navigation.goBack();
          setIsLoding(false);
          console.log('Success.........');
          console.log(uploadedMediaUrls, 'uploadedMediaUrls');
          console.log(postText, 'postText');
        });

      // Navigate to another screen and pass the post ID as a parameter
      // navigation.navigate('TabNavigation', { postId: postRef.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'snow',
        height: height,
        marginTop: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
      }}>
      <CHeder
        title={'Create Post'}
        sicone={'close-sharp'}
        isize={30}
        onpress={() => navigation.goBack()}
      />

      <View
        style={{
          height: '80%',
          width: '95%',
          borderBottomWidth: 0.2,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        {isLoding ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator
              animating={isLoding}
              size={'large'}
              color={'blue'}
            />
          </View>
        ) : (
          <>
            <TextInput
              placeholder="What's new? "
              placeholderTextColor={'gray'}
              multiline={true}
              style={{marginTop: 2, fontSize: 20, color: 'black'}}
              alue={postText}
              onChangeText={setPostText}
            />

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {selectedMedia.map((item, index) => (
                <View key={index} style={{position: 'relative'}}>
                  {item.type === 'image' ? (
                    <Image
                      source={{uri: item.path}}
                      style={{
                        width: width / 3,
                        height: 120,
                        resizeMode: 'stretch',
                        borderRadius: 20,
                      }}
                    />
                  ) : item.type === 'video' ? (
                    <TouchableOpacity
                      onPress={() => togglePlay(index)}
                      style={{marginRight: 5}}>
                      <View
                        style={{
                          width: width / 1.9,
                          height: 120,
                          alignItems: 'center',
                          borderRadius: 20,
                        }}>
                        <Video
                          ref={ref => (videoRefs.current[index] = ref)}
                          source={{uri: item.path}}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 20,
                          }}
                          resizeMode="stretch"
                          controls={false}
                          repeat
                          paused={!isPlaying[index]}
                        />
                        {!isPlaying[index] && (
                          <View style={styles.playButton}>
                            <Ionicons name="play" color={'white'} size={20} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    onPress={() => {
                      const updatedSelectedMedia = selectedMedia.filter(
                        (_, i) => i !== index,
                      );
                      const updatedIsPlaying = isPlaying.filter(
                        (_, i) => i !== index,
                      );
                      setSelectedMedia(updatedSelectedMedia);
                      setIsPlaying(updatedIsPlaying);
                    }}
                    style={styles.deleteButton}>
                    <Ionicons name="md-trash-bin" size={20} color={'blue'} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      <View
        style={{
          paddingVertical: 20,
          width: '95%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={openMediaPicker}>
            <Ionicons name="images-outline" color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 20}}>
            <Ionicons name="musical-notes-outline" color={'black'} size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handlePost}
          style={{
            width: '50%',
            height: 50,
            backgroundColor: '#6e7df0',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/images/chatlogo.png')}
            style={{height: 30, width: 30}}
          />
          <Text style={{marginLeft: 10, fontSize: 30, color: 'snow'}}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  playButton: {
    position: 'absolute',
    left: 75,
    top: 34,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
