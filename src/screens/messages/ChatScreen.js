import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const ChatScreen = () => {
  const scrollViewRef = useRef(null);
  const data = useSelector((state) => state.userData.userData);

  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  console.log(item);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const msgRef = firestore()
      .collection('chatRoom')
      .doc(data?.username)
      .collection(item?.username)
      .orderBy('time', 'asc');

    msgRef.onSnapshot((querySnapshot) => {
      const allMsg = querySnapshot.docs.map((doc) => doc.data());
      setMessages(allMsg);
    });
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        sender: data?.username,
        receiver: item?.username,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      firestore()
        .collection('chatRoom')
        .doc(data?.username)
        .collection(item?.username)
        .add(newMessage)
        .then(() => console.log('Message sent'));

      firestore()
        .collection('chatRoom')
        .doc(item?.username)
        .collection(data?.username)
        .add(newMessage)
        .then(() => console.log('Message sent'));

      const senderData = {
        id: item?.id,
        username: item?.username,
        lastMessage: inputText,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      console.log(senderData, 'senderData');

      const receiverData = {
        id: data?.id,
        username: data?.username,
        imageURL: data?.images[0],
        lastMessage: inputText,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      const check1Ref = firestore()
        .collection('AllUserList')
        .doc('list')
        .collection(data?.id)
        .doc(item?.id);

      const check2Ref = firestore()
        .collection('AllUserList')
        .doc('list')
        .collection(item?.id)
        .doc(data?.id);

      check1Ref
        .get()
        .then((res1) => {
          if (res1.exists) {
            return check1Ref.update({ ...senderData, imageURL: item?.imageURL });
          } else {
            return check1Ref.set({ ...senderData, imageURL: item?.images[0] });
          }
        })
        .then(() => {
          console.log('Check1 completed');
          return check2Ref.get();
        })
        .then((res2) => {
          if (res2.exists) {
            return check2Ref.update(receiverData);
          } else {
            return check2Ref.set(receiverData);
          }
        })
        .then(() => {
          console.log('Check2 completed');
        })
        .catch((error) => {
          console.log('Error:', error);
        });

      setInputText('');
    }
  };

  const getDisplayDate = (messageDate) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const messageMoment = moment(messageDate.toDate());

    if (messageMoment.isSame(today, 'd')) {
      return 'Today';
    } else if (messageMoment.isSame(yesterday, 'd')) {
      return 'Yesterday';
    } else {
      return messageMoment.format('D MMMM , YYYY');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{item?.username}</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      <View style={styles.divider} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => {
          const displayDate = getDisplayDate(message.time);
          const showDateHeader = index === 0 || displayDate !== getDisplayDate(messages[index - 1].time);

          return (
            <React.Fragment key={index} >
              {showDateHeader && <Text style={[styles.dateText,{textAlign:'center',fontSize:15,fontWeight:'600',color:'black'}]}>{displayDate}</Text>}
              <View
                style={[
                  styles.messageContainer,
                  message.sender === data?.username ? styles.sentMessageContainer : styles.receivedMessageContainer,
                ]}
              >
                {message.sender !== data?.username && (
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: item?.imageURL }} style={styles.avatar} />
                  </View>
                )}
                <View style={styles.messageContentContainer}>
                  <View
                    style={[
                      styles.messageContent,
                      message.sender === data?.username ? styles.sentMessageContent : styles.receivedMessageContent,
                    ]}
                  >
                    <Text>{message.text}</Text>
                  </View>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: item.senderId === data.id ? 'black' : 'black',
                        textAlign: item.senderId === data.id ? 'right' : 'left',
                      },
                    ]}
                  >
                    {moment(message.time.toDate()).format('LT')}
                  </Text>
                </View>
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
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
            value={inputText}
            onChangeText={txt => setInputText(txt)}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome5 name="clock" size={25} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialCommunityIcons name="fire" size={25} color="blue" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSend}
          style={styles.sendButtonContainer}>
          <Image
            source={require('../../assets/images/chatlogo.png')}
            style={styles.sendButtonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerPlaceholder: {
    width: 50,
    height: 20,
  },
  divider: {
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
  },
  receivedMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    // borderRadius: 20,
  },
  messageContentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messageContent: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  sentMessageContent: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
  },
  receivedMessageContent: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    color: 'gray',
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
  dateText: {
    fontSize: 10,
    margin: 3,
    // marginLeft: 30,
  },
});

export default ChatScreen;
