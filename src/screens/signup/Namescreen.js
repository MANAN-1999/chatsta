import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import {namediscripction, whatisname} from '../../utils/Strings';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserName} from '../../redux/Slices/UserSlice';

const Namescreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.user);
  console.log(data, 'data');

  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');

  const onNext = () => {
    if (FName.length > 0 && LName.length > 0) {
      dispatch(setUserName({FName, LName}));

      navigation.navigate('EmailandLocation');
    }
  };

  return (
    <View style={styles.containar}>
      <Text style={styles.title}>{whatisname}</Text>
      <Text style={styles.namedisc}>{namediscripction}</Text>

      <CTextinput
        title={'First Name'}
        onChangeText={txt => setFName(txt)}
        otherstyle={{marginTop: 50}}
      />
      <CTextinput
        title={'Last Name'}
        onChangeText={txt => setLName(txt)}
        otherstyle={{marginTop: 30}}
      />
      <CButton
        btntxt={'Next'}
        otherstyle={{marginTop: 100}}
        onPress={() => onNext()}
      />
    </View>
  );
};

export default Namescreen;

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'snow',
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
});
