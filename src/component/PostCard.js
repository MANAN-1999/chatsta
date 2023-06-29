import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {emojis} from '../assets/data/dummydata';

const PostCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hedermainview}>
        <View style={styles.hprofile}>
          <TouchableOpacity style={styles.profileimg}></TouchableOpacity>
          <View style={styles.profilename}>
            <Text style={[styles.desctxt,{marginTop:0}]}>Kewin Hayward</Text>
            <Text style={[styles.desctxt,{marginTop:0}]}>Today at 5:15 pm</Text>
          </View>
        </View>
        <TouchableOpacity>
        <Ionicons
          name={'ios-ellipsis-horizontal-sharp'}
          size={20}
          color={'black'}
        />
         </TouchableOpacity>
      </View>
      <Text style={styles.desctxt}>
        We upload the new vedio every week! Don't Forgot to suscribe and share
        the vedio!
      </Text>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../assets/images/beach.jpg')}
          style={styles.image}
        />
        <Text style={styles.itemname}>hello my name is xyz</Text>
      </View>
      <View style={styles.emojicontaner}>
        {emojis.map((item, index) => (
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Image source={item.image} style={styles.emojiimage} />
            <View style={styles.emojitxtbackground}>
              {item.price !== '' && (
                <Text style={styles.emojitxt}>{item.price}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.commentbtn}>
          <Ionicons
            name={'md-chatbox-ellipses-outline'}
            size={25}
            color={'black'}
          />
          <Text style={styles.commentstyle}>2 Comments</Text>
        </View>
        <View style={styles.commnentcontainer}>
          <Ionicons name="md-add-circle" size={25} color={'black'} />
          <TouchableOpacity style={styles.commentxtinput}>
            <Text style={styles.commenttxt}>write a comment</Text>
          </TouchableOpacity>
          <Ionicons name="md-arrow-up-circle-sharp" size={25} color={'black'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '80%',
    backgroundColor: 'snow',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  hedermainview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hprofile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileimg: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  },
  profilename: {
    marginLeft: 10,
    color:'black'
  },
  desctxt: {
    marginTop: 10,
    color:'black'
  },
  imagecontainer: {
    marginTop: 10,
    height: 'auto',
  },
  emojiimage: {
    height: 30,
    width: 30,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  itemname: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  emojicontaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    marginTop: 20,
  },
  emojitxtbackground: {
    height: 'auto',
    width: 35,
    backgroundColor: 'blue',
    borderRadius: 13,
    marginTop: 10
  },
  emojitxt: {
    color: 'snow',
    textAlign: 'center',
    fontSize: 10,
  },
  commentbtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentstyle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
    marginLeft: 7,
  },
  commnentcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentxtinput: {
    width: '82%',
    height: 35,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: 'center',
  },
  commenttxt: {
    marginLeft: 20,
    color: 'black',
    opacity: 0.6,
    fontSize: 15,
  },
});
