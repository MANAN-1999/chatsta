import {
  Text,
  View,
  Image,
  Linking,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import CHeder from '../../../component/CHeder';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const GroupChat = () => {
  const route = useRoute();
  const allData = route.params.item;
  const navigation = useNavigation();
  const roomId = route.params.groupId;
  const groupName = route.params.groupName;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const data = useSelector(state => state.userData.userData);

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('GroupChatRooms')
      .doc(roomId)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messageList = querySnapshot.docs.map(doc => doc.data());
        setMessages(messageList);
      });

    return () => unsubscribe();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (messageText.trim() === '') {
      return;
    }

    try {
      const messageData = {
        messageId:
          Date.now().toString() + Math.floor(Math.random() * 10000).toString(),
        roomId,
        senderId: data?.id,
        senderName: data?.username,
        text: messageText,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      await firestore()
        .collection('GroupChatRooms')
        .doc(roomId)
        .collection('Messages')
        .doc(messageData?.messageId)
        .set(messageData);

      setMessageText('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const renderMessages = ({item, index}) => {
    const timestamp = item?.createdAt;

    const date = new Date(
      timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000,
    );

    const renderMessage = text => {
      const parts = text.text.split(emailRegex);

      const highlightedParts = parts.map((part, index) => {
        if (emailRegex.test(part)) {
          return (
            <Text
              key={index}
              style={styles.highlightedText}
              onPress={() => Linking.openURL(`mailto:${part}`)}>
              {part}
            </Text>
          );
        } else {
          return (
            <Text
              style={{
                color: text.senderId == data.id ? 'white' : 'black',
              }}
              key={index}>
              {part}
            </Text>
          );
        }
      });
      return (
        <View>
          <Text style={styles.containers}>{highlightedParts}</Text>
        </View>
      );
    };

    return (
      <View
        style={{
          margin: 8,
        }}
        key={index}>
        <View
          style={[
            styles.message,
            {
              backgroundColor: item.senderId == data.id ? '#002DE3' : 'white',
              alignSelf: item.senderId == data.id ? 'flex-end' : 'flex-start',
            },
          ]}>
          <Text
            style={[
              styles.senderNameText,
              {
                color: item.senderId == data.id ? 'white' : 'black',
                textAlign: item.senderId == data.id ? 'right' : 'left',
              },
            ]}>
            {item.senderName}
          </Text>

          <Text
            style={{
              color: item.senderId == data.id ? 'white' : 'black',
            }}>
            {renderMessage(item)}
          </Text>

          <Text
            style={[
              styles.dateText,
              {
                color: item.senderId == data.id ? 'white' : 'black',
              },
            ]}>
            {/* {moment(date).format('LT')} */}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeder
        isIcon={true}
        ficone={'md-chevron-back'}
        isize={30}
        title={groupName}
        otherstyle={styles.cHeaderStyle}
        onpress={() => navigation.goBack()}
      />
      <FlatList
        data={messages}
        renderItem={renderMessages}
        keyExtractor={item => item.messageId}
        inverted={true}
        showsVerticalScrollIndicator={false}
      />

      {/* <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarBtn} onPress={() => onPlus()}>
          <AntDesign name="plus" size={20} color={'grey'} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write your message......."
          placeholderTextColor={'black'}
          value={messageText}
          onChangeText={txt => setMessageText(txt)}
          multiline={true}
        />
        <TouchableOpacity
          disable={messageText.length == 0 ? true : false}
          style={styles.bottomBarBtn}
          onPress={() => handleSendMessage()}>
          <Feather name="send" size={20} color={'#002DE3'} />
        </TouchableOpacity>
      </View> */}
       <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="md-add-circle-sharp" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="mic-sharp" size={30} color="blue" />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="grin-hearts" size={25} color="blue" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={txt => setMessageText(txt)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="clock" size={25} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialCommunityIcons name="fire" size={25} color="blue" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleSendMessage()}
          style={styles.sendButtonContainer}>
          <Image
            source={require('../../../assets/images/chatlogo.png')}
            style={styles.sendButtonImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 18,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 20,
    marginLeft: 10,
  },
  message: {
    elevation: 6,
    maxWidth: '80%',
    minWidth: '20%',
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    alignSelf: 'flex-end',
    padding: 9,
    marginVertical: 4,
    shadowOffset: {width: 0, height: 2},
    borderTopEndRadius: 9,
    marginHorizontal: 12,
    borderBottomLeftRadius: 9,
  },
  dateText: {
    textAlign: 'right',
    fontSize: 10,
    marginTop: 8,
  },
  bottomBar: {
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 9,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  bottomBarBtn: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '75%',
    color: 'black',
    padding: 8,
    backgroundColor: '#F7F7FC',
    minHeight: 40,
  },
  highlightedText: {
    color: 'red',
  },
  containers: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  profileIcon: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  senderNameText: {
    fontSize: 12,
    marginLeft: 6,
    marginBottom: 9,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  attachmentMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentBox: {
    width: '90%',
    elevation: 6,
    height: 180,
    backgroundColor: 'white',
  },
  closeBtn: {
    top: -8,
    right: -8,
    elevation: 6,
    position: 'absolute',
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  modalHeading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    // fontFamily: Fonts.MulishBold,
    marginVertical: 24,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  attachmentBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  attachmentViewContainer: {
    height: height,
    backgroundColor: 'grey',
  },
  viewAttach: {
    flex: 1,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachViewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  attachFileName: {
    color: 'white',
    fontSize: 18,
    // fontFamily: Fonts.MulishBold,
  },
  attachFileType: {
    color: 'white',
    fontSize: 14,
    // fontFamily: Fonts.MulishRegular,
  },
  attachViewInputcontainer: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  attachViewInput: {
    borderWidth: 1,
    width: '80%',
    color: 'black',
    height: 50,
    padding: 9,
    fontSize: 14,
    borderRadius: 12,
  },
  cHeaderStyle:{
    paddingVertical:12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: width,
    alignSelf: 'center',
    borderTopWidth: 0.2,
  },
  iconContainer: {
    marginRight: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '65%',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    marginRight: 5,
    padding: 5,
    color: 'black',
  },
  sendButtonContainer: {
    marginLeft: 5,
  },
  sendButtonImage: {
    height: 50,
    width: 50,
  },
});
