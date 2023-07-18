import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeder from '../../component/CHeder';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const {width, height} = Dimensions.get('window');

const grpIcon =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlolGHpVdG4bh5lkXCCYO68aDJ0Gru8CWeuIcGRQvU&s';

const Messages = () => {
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const data = useSelector(state => state.userData.userData);

  const groupListRef = firestore().collection('Groups');

  // const getGroupList = async userId => {
  //   try {
  //     const querySnapshot = await groupListRef
  //       .where('memberIds', 'array-contains', userId)
  //       .get();
  //     const groupList = querySnapshot.docs.map(doc => doc.data());
  //     setGroupList(groupList);
  //   } catch (error) {
  //     console.log('Error getting group list:', error);
  //   }
  // };

  const getGroupList = async userId => {
    try {
      const unsubscribe = groupListRef
        .where('memberIds', 'array-contains', userId)
        .onSnapshot(querySnapshot => {
          const groupList = querySnapshot.docs.map(doc => doc.data());
          setGroupList(groupList);
        });

      // Optional: Store the unsubscribe function to unsubscribe from the snapshot listener when needed
      // For example, you can call `unsubscribe()` to stop listening for updates
    } catch (error) {
      console.log('Error getting group list:', error);
    }
  };

  useEffect(() => {
    getGroupList(data?.id);
  }, []);

  useEffect(() => {
    const listRef = firestore()
      .collection('AllUserList')
      .doc('list')
      .collection(data?.id)
      // .orderBy('time', 'desc')
      .onSnapshot(querySnapshot => {
        const allUsers = querySnapshot.docs.map(doc => doc.data());
        setUserList(allUsers);
      });

    return () => {
      listRef(); // Unsubscribe from the snapshot listener
    };
  }, [data?.id]);

  const recentChatList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.chatcontainer}
        onPress={() => navigation.navigate('ChatScreen', {item: item})}>
        <View style={styles.chatItemContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{uri: item?.imageURL}} style={styles.avatar} />
          </View>
          <View style={styles.chatDetails}>
            <Text style={styles.username}>{item?.username}</Text>
            <Text style={styles.lastMessage}>{item?.lastMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RecentScreen = () => (
    <FlatList
      data={userList}
      renderItem={recentChatList}
      keyExtractor={(_, index) => index.toString()}
    />
  );

  const renderGrpCard = ({item, index}) => {
    const {groupId, groupName} = item;

    const handleGroupPress = () => {
      navigation.navigate('GroupChat', {groupId, groupName, item});
    };

    return (
      <TouchableOpacity style={styles.groupCard} onPress={handleGroupPress}>
        <Image
          source={{
            uri: grpIcon,
          }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            resizeMode: 'contain',
          }}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.groupName}>{groupName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const GroupScreen = () => (
    <FlatList
      data={groupList}
      renderItem={renderGrpCard}
      keyExtractor={(_, index) => index}
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'recent', title: 'Recent'},
    {key: 'group', title: 'Group'},
  ]);

  const renderScene = SceneMap({
    recent: RecentScreen,
    group: GroupScreen,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CHeder
        title={'Messages'}
        sicone={'ios-create-outline'}
        image={data?.images[0]}
        isize={25}
        otherstyle={{borderBottomWidth: 0}}
        onpress={() => navigation.navigate('ContactList')}
      />
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={'black'} />
        <TextInput
          placeholder="Find People And Conversations"
          color={'black'}
          style={{fontSize: 15}}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'snow',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
  },
  chatcontainer: {
    width: '100%',
    marginTop: 10,
  },
  chatItemContainer: {
    height: 60,
    borderRadius: 25,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  chatDetails: {
    width: '80%',
    marginLeft: 15,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  lastMessage: {
    marginTop: 3,
    fontSize: 13,
    color: 'gray',
  },
  groupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'snow',
    borderBottomWidth: 0.2,
  },
  indicator: {
    backgroundColor: 'blue',
    height: 6,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: 40,
    marginLeft: width / 5.8,
  },
  tabLabel: {
    color: '#000000',
    fontSize: 16,
  },
  groupCard: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    padding: 9,
    backgroundColor: 'white',
    marginVertical: 12,
  },
  groupName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
});
