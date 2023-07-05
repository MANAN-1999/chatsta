import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const ChatScreen = () => {
  const scrollViewRef = useRef(null);
  const data = useSelector(state => state.userData.userData);

  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    // const allMessages = await firestore()
    //   .collection('chatRoom')
    //   .doc(data?.username)
    //   .collection(item?.username)
    //   .get();
    // let listMsg = [];
    // allMessages.docs.map((i, e) => {
    //   listMsg.push(i.data());
    // });
    // setMessages(listMsg);

    const msgRef = firestore()
      .collection('chatRoom')
      .doc(data?.username)
      .collection(item?.username)
      .orderBy('time', 'asc');

    msgRef.onSnapshot(querysnap => {
      const allMsg = querysnap.docs.map(docsnap => {
        return {
          ...docsnap.data(),
        };
      });
      console.log(allMsg, 'allMsg');
      setMessages(allMsg);
    });
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        sender: data?.username,
        reciver: item?.username,
        time: firestore.FieldValue.serverTimestamp(),
      };
      firestore()
        .collection('chatRoom')
        .doc(data?.username)
        .collection(item?.username)
        .add(newMessage)
        .then(res => console.log('messages sent'));

      firestore()
        .collection('chatRoom')
        .doc(item?.username)
        .collection(data?.username)
        .add(newMessage)
        .then(res => console.log('messages sent'));

      setInputText('');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'snow'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'md-chevron-back'} size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {item?.username}
        </Text>
        <View>
          <Text>{'    '}</Text>
        </View>
      </View>
      <View style={{borderBottomWidth: 0.2, borderColor: 'gray'}}>
        <Text style={{textAlign: 'center', marginBottom: 6, color: 'black'}}>
          I'm Using Chatsta
        </Text>
        <View
          style={{
            width: 50,
            height: 8,
            backgroundColor: 'blue',
            alignSelf: 'center',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}></View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          justifyContent: 'flex-end',
        }}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent:
                message.sender === data?.username ? 'flex-end' : 'flex-start',
            }}>
            {message.sender !== data?.username && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  borderRadius: 20,
                  backgroundColor: 'blue',
                }}></View>
            )}
            <View
              style={{
                flexDirection: 'column',
                alignItems:
                  message.sender === data?.username ? 'flex-end' : 'flex-start',
              }}>
              <View
                style={{
                  backgroundColor:
                    message.sender === data?.username
                      ? 'lightblue'
                      : 'lightgray',
                  borderTopRightRadius:
                    message.sender === data?.username ? 10 : 0,
                  borderTopLeftRadius:
                    message.sender === data?.username ? 10 : 10,
                  borderBottomRightRadius:
                    message.sender === data?.username ? 0 : 10,
                  borderBottomLeftRadius:
                    message.sender === data?.username ? 10 : 10,
                  padding: 10,
                }}>
                <Text>{message.text}</Text>
              </View>
              <Text style={{fontSize: 10, marginTop: 4, color: 'gray'}}>
                {/* {message.time} */}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          width: width,
          alignSelf: 'center',
          borderTopWidth: 0.2,
        }}>
        <TouchableOpacity>
          <Ionicons name="md-add-circle-sharp" size={30} color={'blue'} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="mic-sharp" size={30} color={'blue'} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            width: '65%',
            alignItems: 'center',
            paddingHorizontal: 5,
            borderRadius: 20,
          }}>
          <TouchableOpacity style={{marginRight: 5}}>
            <FontAwesome5 name="grin-hearts" size={25} color={'blue'} />
          </TouchableOpacity>
          <TextInput
            style={{flex: 1, marginRight: 5, padding: 5, color: 'black'}}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity>
            <FontAwesome5 name="clock" size={25} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="fire" size={25} color={'blue'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSend} style={{marginLeft: 5}}>
          <Image
            source={require('../../assets/images/chatlogo.png')}
            style={{height: 50, width: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
