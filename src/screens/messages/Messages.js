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

const Messages = () => {
  const [userList, setUserList] = useState([]);
  const data = useSelector(state => state.userData.userData);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const getListUser = async () => {
  //     const list = [];
  //     const querySnapshot = await firestore()
  //       .collection('Users')
  //       .where('username', '!=', data?.username)
  //       .get();
  //     querySnapshot.docs.map((i, e) => {
  //       list.push(i.data());
  //     });
  //     setUserList(list);
  //   };

  //   getListUser();
  // }, []);

  useEffect(() => {
    const listRef = firestore()
      .collection('AllUserList')
      .doc('list')
      .collection(data?.id)
      .orderBy('createdAt', 'desc');

    listRef.onSnapshot(querysnap => {
      const allMsg = querysnap?.docs.map(docsnap => {
        return {
          ...docsnap.data(),
        };
      });
      setUserList(allMsg);
      console.log(allMsg, 'last');
    });
  }, []);

  const recentChatList = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.chatcontainer}
          key={index}
          onPress={() => navigation.navigate('ChatScreen', {item: item})}>
          <View>
            <View
              style={{
                height: 60,
                borderRadius: 25,
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: item?.imageURL}}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
              <View style={{width: '80%', marginLeft: 15}}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                  {item?.name}
                </Text>
                {/* <Text style={{marginTop: 3, fontSize: 13, color: 'gray'}}>
                  {item.lastmassage}
                </Text> */}
                <Text style={{marginTop: 3, fontSize: 13, color: 'gray'}}>
                  {item?.lastMessage}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RecentScreen = () => (
    <FlatList
      data={userList}
      renderItem={recentChatList}
      keyExtractor={(_, index) => index}
    />
  );

  const GroupScreen = () => (
    <View style={styles.chatcontainer}>
      <Text>Group Tab Content</Text>
    </View>
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
        isize={25}
        otherstyle={{borderBottomWidth: 0}}
        onpress={() => navigation.navigate('ContactList')}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'gray',
          width: '100%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          height: 40,
        }}>
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
  chatcontainer: {
    flex: 1,
    width: width,
    marginTop: 10,
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
    // fontWeight: 'bold',
    fontSize: 16,
  },
});
