import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  BackHandler
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {emojis} from '../../assets/data/dummydata';
import PostCard from '../../component/PostCard';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const {height, width} = Dimensions.get('window');
const Deshbord = () => {
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    // Add the event listener for the back button press
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app when back button is pressed
      return true; // Return true to prevent default behavior (i.e., going back to the previous screen)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const msgRef = firestore().collectionGroup('allposts');

      msgRef.onSnapshot(querysnap => {
        const allMsg = querysnap.docs.map(docsnap => {
          return {
            ...docsnap.data(),
          };
        });

        const sortedPosts = allMsg.sort((a, b) => b.createdAt - a.createdAt); // Sort the posts based on createdAt in descending order
        console.log(sortedPosts, 'sortedPosts');
        setUserData(sortedPosts);

        console.log(allMsg, 'allMsg');
        setUserData(allMsg);
        // setMessages(allMsg);
      });
      const shuffledPosts = shuffleArray(allMsg); // Shuffle the posts array
      console.log(shuffledPosts, 'shuffledPosts');
      setUserData(shuffledPosts);

      // postsRef.forEach(doc => {
      //   const userData = doc.data().userData;
      //   const postText = doc.data().text;
      //   const mediaUrls = doc.data().media;
      //   const createdAt = doc.data().createdAt;

      //   // Create a post object with the required data
      //   const post = {
      //     userData,
      //     postText,
      //     mediaUrls,
      //     createdAt,
      //   };

      //   allPosts.push(post);
      // });
      // console.log(allPosts, 'Allposts');

      // setUserData(allPosts);
    };

    fetchData();
  }, []);

  const shuffleArray = array => {
    // Fisher-Yates shuffle algorithm
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleSearchButtonPress = () => {
    setShowSearchInput(false);
  };

  const handleCancleButtonPress = () => {
    setShowSearchInput(true);
  };

  const handleSearchInputChange = text => {
    setSearchText(text);
  };

  const handlecancletextButton = () => {
    setSearchText('');
  };

  const renderPostCard = ({item}) => {
    console.log(item.userData.images, 'item');
    return (
      <PostCard
        username={item?.userData.username}
        desc={item?.text}
        media={item?.media}
        // profileImgs={item?.userData.images}
        Source={item?.userData.images}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
        }}>
        <Image
          source={require('../../assets/images/macd.png')}
          style={{height: 40, width: 40}}
        />
        <Image
          source={require('../../assets/images/macd.png')}
          style={{height: 40, width: 40}}
        />
      </View>

      {showSearchInput ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/chatlogo.png')}
              style={{height: 60, width: 60}}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 10,
              }}>
              Discover
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={handleSearchButtonPress}>
              <Ionicons name="search" size={30} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="md-notifications" size={30} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: 'gray',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 20}}>
                <Ionicons name="search" size={20} color={'black'} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder="Search"
                  style={{marginLeft: 20, width: '75%'}}
                  value={searchText}
                  onChangeText={handleSearchInputChange}
                  autoFocus={true}
                />
                {searchText !== '' && (
                  <TouchableOpacity onPress={handlecancletextButton}>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color={'black'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={handleCancleButtonPress}>
              <Text style={{color: 'blue'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: 100,
              backgroundColor: 'red',
              marginTop: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }}></View>
        </>
      )}

      {userData.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} size={'large'} color={'blue'} />
        </View>
      ) : (
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPostCard}
        />
      )}
    </SafeAreaView>
  );
};

export default Deshbord;

const styles = StyleSheet.create({});
