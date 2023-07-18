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
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ContactList = () => {
  const data = useSelector(state => state.userData.userData);
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();

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
        }}
        onPress={() => navigation.navigate('ChatScreen', {item: item})}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'snow',
              borderRadius: 25,
            }}
            source={{uri: item?.images[0]}}
          />
          <Text style={{marginLeft: 20}}> {item.username}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onGroupClick = () => {
    navigation.navigate('CreateGroup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeder
        isIcon={true}
        ficone={'md-chevron-back'}
        isize={30}
        title={'Create New Chat'}
        otherstyle={styles.cHeaderStyle}
        onpress={() => navigation.goBack()}
      />

      <TouchableOpacity style={styles.createGrpBtn} onPress={onGroupClick}>
        <View style={styles.grpBtnLeft}>
          <AntDesign name="addusergroup" color="#7d7eff" size={24} />
          <Text style={styles.grpBtnText}>New Group</Text>
        </View>
        <AntDesign name="pluscircleo" color="#7d7eff" size={24} />
      </TouchableOpacity>
      <FlatList
        data={userList}
        renderItem={renderCard}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cHeaderStyle: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  createGrpBtn: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grpBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grpBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7d7eff',
    marginLeft: 8,
  },
});
