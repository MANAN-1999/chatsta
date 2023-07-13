import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import CHeder from '../../../component/CHeder';
import { useNavigation } from '@react-navigation/native';

const ContactList = () => {
  const data = useSelector(state => state.userData.userData);
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    const getUserList = () => {
      firestore()
        .collection('Users')
        .get()
        .then(res => {
          let allUsers = [];
          res.docs.map(i => allUsers.push(i.data()));
          let filterData = allUsers.filter(i => i.id !== data.id);
          setUserList(filterData);
        });
    };
    getUserList();
  }, []);
  console.log(userList);

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          height: 100,
          width: '90%',
          backgroundColor: 'gray',
          alignSelf: 'center',
          marginVertical: 12,
          justifyContent: 'center',
        }} onPress={()=>navigation.navigate('ChatScreen', {item: item})}>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'snow',
              borderRadius: 25,
              
            }}
              source={{uri: item?.images[0]}}
          />
          <Text style={{marginLeft:20}}> {item.username}</Text>

         {/* { console.log(userList.username,'jasjasfasfas')} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CHeder
        isIcon={true}
        ficone={'md-chevron-back'}
        isize={30}
        title={'Create New Chat'}
        otherstyle={{width: '90%', alignSelf: 'center',paddingVertical:10}}
        onpress={()=>navigation.goBack()}
      />

      <FlatList
        data={userList}
        renderItem={renderCard}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

export default ContactList;

const styles = StyleSheet.create({});
