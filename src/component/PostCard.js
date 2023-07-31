import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { emojis } from '../assets/data/dummydata';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const PostCard = ({ username, desc, media, profileImgs, Source }) => {
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    const initialIsPlaying = media.map(() => false);
    setIsPlaying(initialIsPlaying);
  }, [media]);

  const handleMediaScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / width);
    setActiveMediaIndex(currentIndex);
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

  return (
    <View style={styles.container}>
      <View style={styles.headerMainView}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.profileImg}>
            <Image source={{ uri: Source ? Source[0] : undefined}} style={{ height: '100%', width: '100%' }} />
          </TouchableOpacity>
          <View style={styles.profileName}>
            <Text style={[styles.descText, { marginTop: 0 }]}>{username}</Text>
            <Text style={[styles.descText, { marginTop: 0 }]}>Today at 5:15 pm</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ios-ellipsis-horizontal-sharp" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.descText, { marginLeft: 10 }]}>{desc}</Text>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleMediaScroll} scrollEventThrottle={16}>
        <View style={{ flexDirection: 'row',backgroundColor:'white' }}>
          {media.map((item, index) =>
            item.type === 'video' ? (
              <TouchableOpacity key={index} style={styles.vediomediaItem} onPress={() => togglePlay(index)}>
                <View>
                  <Video
                    ref={ref => (videoRefs.current[index] = ref)}
                    source={{ uri: item.url }}
                    style={styles.video}
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
            ) : item.type === 'image' ? (
              <View key={index} style={styles.mediaItem}>
                <Image source={{ uri: item.url }} style={styles.image} />
              </View>
            ) : null
          )}
        </View>
      </ScrollView>

      {media.length > 1 && (
        <View style={styles.paginationContainer}>
          {media.map((_, index) => (
            <View key={index} style={[styles.paginationDot, index === activeMediaIndex && styles.activeDot]} />
          ))}
        </View>
      )}

      <View style={styles.emojiContainer}>
        {emojis.map((item, index) => (
          <TouchableOpacity key={index} style={styles.emojiItem}>
            <Image source={item.image} style={styles.emojiImage} />
            {item.price !== '' && (
              <View style={styles.emojiTextBackground}>
                <Text style={styles.emojiText}>{item.price}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.commentBtn}>
          <Ionicons name="md-chatbox-ellipses-outline" size={25} color="black" />
          <Text style={styles.commentStyle}>2 Comments</Text>
        </View>
        <View style={styles.commentContainer}>
          <Ionicons name="md-add-circle" size={25} color="black" />
          <TouchableOpacity style={styles.commentInput}>
            <Text style={styles.commentText}>write a comment</Text>
          </TouchableOpacity>
          <Ionicons name="md-arrow-up-circle-sharp" size={25} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 'auto',
    backgroundColor: 'snow',
    alignSelf: 'center',
    paddingBottom: 35,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    marginVertical: 12,
  },
  headerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileName: {
    marginLeft: 10,
    color: 'black',
  },
  descText: {
    marginTop: 10,
    color: 'black',
    marginBottom: 10,
  },
  mediaContainer: {
    marginTop: 10,
    flexDirection: 'row',
    height: 200,
    // width: 'auto',
  },
  mediaItem: {
    marginRight: 10,
    marginLeft: 5,
    width: width * 0.85,
    backgroundColor:'#FFFFF'
  },
  vediomediaItem: {
    width: width * 0.9,
    // backgroundColor:'blue'
  },
  videoWrapper: {
    height: 200,
    alignItems: 'center',
    borderRadius: 20,
  },
  video: {
    width: 'auto',
    height: 200,
    borderRadius: 20,
  },
  image: {
    width:'auto',
    height: 200,
    resizeMode: 'contain',
    overflow:'hidden'
    // borderRadius: 20,
  },
  itemName: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  emojiItem: {
    alignItems: 'center',
  },
  emojiImage: {
    height: 30,
    width: 30,
  },
  emojiTextBackground: {
    width: 35,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: 10,
  },
  emojiText: {
    color: 'snow',
    textAlign: 'center',
    fontSize: 10,
  },
  commentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentStyle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
    marginLeft: 7,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentInput: {
    width: '82%',
    height: 35,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: 'center',
  },
  commentText: {
    marginLeft: 20,
    color: 'black',
    opacity: 0.6,
    fontSize: 15,
  },
  playButton: {
    position: 'absolute',
    left: width / 2.3,
    top: 75,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});
