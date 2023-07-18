import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CreateGroup = () => {
  const data = useSelector(state => state.userData.userData);
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [grpName, setGrpName] = useState('');
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

  const renderList = ({item, index}) => {
    const isSelected = selectedUsers.some(user => user.id === item?.id);

    const handleCheckboxPress = () => {
      if (isSelected) {
        setSelectedUsers(selectedUsers.filter(user => user.id !== item?.id));
      } else {
        setSelectedUsers([...selectedUsers, item]);
      }
    };
    return (
      <View style={styles.card} key={index}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.images[0]}} style={styles.profileImg} />
          <Text style={styles.userName}>{item.username}</Text>
        </View>

        <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: isSelected ? 0 : 2,
            borderColor: isSelected ? null : '#7d7eff',
            backgroundColor: isSelected ? '#7d7eff' : null,
          }}
          onPress={handleCheckboxPress}
        />
      </View>
    );
  };

  const renderCard = ({item, index}) => {
    return (
      <View key={index} style={{marginHorizontal: 12}}>
        <Image
          source={{uri: item?.images[0]}}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            resizeMode: 'contain',
          }}
        />
        <Text style={{textAlign: 'center', color: 'black'}}>
          {item.username}
        </Text>
      </View>
    );
  };

  const createGRP = async () => {
    if (selectedUsers.length <= 0) {
      Alert.alert('Warning', 'Please Select Users');
    } else {
      try {
        const groupDocRef = firestore().collection('Groups').doc();
        const groupId = groupDocRef.id;
        const selectedUserIds = selectedUsers.map(user => user.id);
        const groupName = grpName.length < 1 ? 'New Group' : grpName;

        const groupData = {
          groupId,
          groupName,
          creatorId: data?.id,
          memberIds: [data?.id, ...selectedUserIds],
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };

        await groupDocRef.set(groupData);

        // Create a chat room for the group
        const chatRoomData = {
          roomId: groupId, // Generate a unique chat room ID
          groupId,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };

        await firestore()
          .collection('GroupChatRooms')
          .doc(chatRoomData?.roomId)
          .set(chatRoomData);

        // Redirect to the chat room screen for the newly created group
        // navigation.navigate('GroupChat', {roomId: chatRoomData.roomId});
        navigation.navigate('Messages');
      } catch (error) {
        console.log(error, 'err');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerSideBtn}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Group</Text>

        <TouchableOpacity onPress={createGRP}>
          <Text style={styles.headerSideBtn}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* group Name */}
      <View style={styles.groupName}>
        <TextInput
          placeholder="Group Name (Optional)"
          placeholderTextColor={'grey'}
          style={styles.grpInput}
          onChangeText={txt => setGrpName(txt)}
        />

        {/* Search Input */}
        <TextInput
          placeholder="search for name to add"
          placeholderTextColor={'grey'}
          style={styles.searchInput}
        />
      </View>

      {/* Selected User */}
      <View style={{marginVertical: 12}}>
        <FlatList
          data={selectedUsers}
          horizontal
          renderItem={renderCard}
          keyExtractor={(_, index) => index}
        />
      </View>

      {/* User List */}
      <FlatList
        data={userList}
        renderItem={renderList}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{width: '90%', alignSelf: 'center'}}
      />
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSideBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7d7eff',
  },
  groupName: {
    width: '90%',
    alignSelf: 'center',
  },
  grpInput: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  searchInput: {
    elevation: 1,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    height: 35,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginLeft: 12,
  },
  card: {
    height: 60,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
