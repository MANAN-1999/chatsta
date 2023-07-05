import {
  StyleSheet,
  Text,
  View,
  Picker,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  emailandlocationdescripction,
  youremailandlocaton,
} from '../../utils/Strings';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import {setuserEmail} from '../../redux/Slices/UserSlice';

const EmailandLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.data);
  console.log(data, 'data');

  const [Email, setEmail] = useState('');
  const [Location, setLocation] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([
    {id: 1, name: 'Option 1'},
    {id: 2, name: 'Option 2'},
    {id: 3, name: 'Option 3'},
  ]);
  const handleDropdownItemPress = item => {
    setLocation(item.name);
    setIsDropdownVisible(false);
  };

  const onNext = () => {
    if (Email.length > 0 && Location.length > 0) {
      dispatch(setuserEmail({Email, Location}));
      navigation.navigate('AddPhotosScreen');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{youremailandlocaton}</Text>
        <Text style={styles.namedisc}>{emailandlocationdescripction}</Text>
        <CTextinput title={'Email ID'} otherstyle={{marginTop: 50}} onChangeText={setEmail}/>
        <CTextinput
          title={'Location'}
          otherstyle={{marginTop: 30}}
          placeholder={'Type Your Location'}
          showAnotherIcon={true}
          value={Location}
          onChangeText={setLocation}
          showDropdown={true}
          dropdownItems={dropdownItems}
          onDropdownItemPress={handleDropdownItemPress}
        />
      </View>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.bottomContainer}>
          <CButton
            btntxt={'Next'}
            onPress={()=> onNext()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmailandLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  namedisc: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    width: '84%',
    alignSelf: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    // alignItems: 'center',
    marginBottom: 50,
  },
});
