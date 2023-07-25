import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProfileCard from '../../component/ProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../../component/PostCard';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';


const { width,height } = Dimensions.get('window');

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const reduxData = useSelector(state => state.userData.userData);
  const [activeImageIndex, setActiveImageIndex] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      const msgRef = firestore().collectionGroup('allposts');

      msgRef.onSnapshot(querysnap => {
        const allMsg = querysnap.docs.map(docsnap => {
          return {
            ...docsnap.data(),
          };
        });

        const filteredPosts = allMsg.filter(msg => {
          return msg.userData && msg.userData.id === reduxData.id;
        });

        const sortedPosts = filteredPosts.sort(
          (a, b) => b.createdAt - a.createdAt
        );
        setUserData(sortedPosts);
      });
    };

    fetchData();
  }, []);

  const renderPostCard = ({ item }) => {
    return (
      <PostCard
        username={item?.userData.username}
        desc={item?.text}
        media={item?.media}
        Source={item?.userData.images}
      />
    );
  };

  const renderProfileCard = () => {
    const item = userData.length > 0 ? userData[0] : null;
    if (item) {
      return (
        <ProfileCard
          name={item?.userData.username}
          location={item?.userData.Location}
          heights={item?.userData.lastQue.height}
          bios={item?.userData.finalData.bio}
          quotes={item?.userData.lastQue.quotes}
        />
      );
    }
    return null;
  };


  const handleDotChange = (index) => {
    setActiveImageIndex(index);
  };

  const renderProfileImages = () => {
    const item = userData.length > 0 ? userData[0] : null;
    if (item) {
      return (
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const activeIndex = Math.round(offsetX / width);
              setActiveImageIndex(activeIndex);
            }}
          >
            {item.userData.images.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />
              </View>
            ))}
          </ScrollView>
          <View style={styles.paginationDots}>
            {item.userData.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  index === activeImageIndex && styles.activeDot,
                ]}
                onPress={() => handleDotChange(index)}
              />
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  // const renderProfileImages = () => {
  //   const item = userData.length > 0 ? userData[0] : null;
  //   if (item) {
  //     return (
  //       <View style={styles.imageContainer}>
  //         {item.userData.images.map((image, index) => (
            
  //           <View key={index} style={styles.imageItem}>
  //             <Image source={{ uri: image }} style={styles.image} resizeMode='cover'/>
  //           </View>
  //         ))}
  //       </View>
  //     );
  //   }
  //   return null;
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* <View style={styles.imageRow}>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator>
              {renderProfileImages()}
            </ScrollView>
          </View> */}
          <View style={styles.imageRow}>
            {renderProfileImages()}
          </View>

          <View style={styles.profileCardContainer}>
            {renderProfileCard()}
          </View>

          <View style={styles.connectionContainer}>
            <View style={styles.connectionCount}>
              <Text>{'                 '}</Text>
            </View>
            <View style={styles.connectionText}>
              <Text style={styles.connectionTextTitle}>Connection</Text>
              <Text> 190</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.connectionRequest}>
                <Text style={styles.connectionRequestText}>2 Request</Text>
                <Ionicons
                  name={'md-chevron-forward-sharp'}
                  size={10}
                  color={'black'}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.followContainer}>
            <TouchableOpacity style={styles.followItem}>
              <Image
                source={require('../../assets/images/chatlogo.png')}
                style={styles.followImage}
              />
              <Text>Krunal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followItem}>
              <Image
                source={require('../../assets/images/chatlogo.png')}
                style={styles.followImage}
              />
              <Text>Krunal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followItem}>
              <Image
                source={require('../../assets/images/chatlogo.png')}
                style={styles.followImage}
              />
              <Text>Krunal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followItem}>
              <Image
                source={require('../../assets/images/chatlogo.png')}
                style={styles.followImage}
              />
              <Text>Krunal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followItem}>
              <Image
                source={require('../../assets/images/chatlogo.png')}
                style={styles.followImage}
              />
              <Text>Krunal</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>My Posts</Text>
          </View>

          <FlatList
            data={userData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPostCard}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
   backgroundColor: '#e3e8e8'
  },
  contentContainer: {
    flex: 1,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
   
    // marginTop: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    // backgroundColor: 'gray',
  },
  imageItem: {
    alignItems: 'center',
  },
  image: {
    height: 400,
    width: width,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius:25
  },
  profileCardContainer: {
    // height:height,
    width: width,
    alignSelf: 'center',
    marginTop:30
  },
  connectionContainer: {
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'snow',
    // borderRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  connectionCount: {
    // flex: 1,
  },
  connectionText: {
    flexDirection: 'row',
    alignItems: 'center',



  },
  connectionTextTitle: {
    fontSize: 20,
    color: 'black',
    
  },
  connectionRequest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  connectionRequestText: {
    fontSize: 10,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor:'snow',
    width:'95%',
    alignSelf:'center',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  followItem: {
    alignItems: 'center',
  },
  followImage: {
    height: 50,
    width: 50,
  },
  postContainer: {
    height: 40,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'snow',
    elevation: 5,
  },
  postTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default Profile;
