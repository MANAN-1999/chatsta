import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CHeder from '../../component/CHeder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeUserData } from '../../redux/Slices/UserDataSlice';

const Settings = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  useLayoutEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  const handleRemoveData = () => {
    dispatch(removeUserData());
     navigation.navigate('Login')
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'snow',
        height: height,
        marginTop: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
        flex: 1,
      }}>
      <CHeder
        title={'Create Post'}
        sicone={'close-sharp'}
        isize={30}
        isIcon={true}
        onpress={() => navigation.goBack()}
      />
      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: 40,
          borderColor: 'gray',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity style={styles.btnstyle} onPress={()=>navigation.navigate('Accounts')}>
          <Ionicons name="md-person-outline" size={25} color={'blue'} />
          <Text style={styles.txt}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnstyle}>
          <Ionicons name="md-notifications-outline" size={25} color={'blue'} />
          <Text style={styles.txt}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnstyle}>
          <Ionicons name="server-outline" size={25} color={'blue'} />
          <Text style={styles.txt}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnstyle}>
          <Ionicons name="star-outline" size={25} color={'blue'} />
          <Text style={styles.txt}>Membership</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: 20,
          borderColor: 'gray',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity style={styles.btnstyle}>
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={'blue'}
          />
          <Text style={styles.txt}>Informative Pages</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 20}}
          onPress={handleRemoveData}>
        <Text style={{color: 'red', fontSize: 20, fontWeight: '500'}}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  btnstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  txt: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
});
