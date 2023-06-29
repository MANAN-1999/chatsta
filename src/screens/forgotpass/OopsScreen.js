import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CButton from '../../component/CButton';
import {oops, sorrydescripction} from '../../utils/Strings';
import { useNavigation } from '@react-navigation/native';

const OopsScreen = () => {
    const navigation=useNavigation()
  return (
    <View style={{flex: 1, justifyContent: 'center',backgroundColor:'snow'}}>
      <Image
        source={require('../../assets/images/oops.png')}
        style={{height: 200, width: 200, alignSelf: 'center'}}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 30,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {oops}
      </Text>
      <Text
        style={{
          marginTop: 40,
          fontSize: 18,
          width: '80%',
          textAlign: 'center',
          alignSelf: 'center',
          color: 'black',
          fontWeight: '400',
        }}>
        {sorrydescripction}
      </Text>
      <CButton btntxt={'Sign Up New Account'} otherstyle={{marginTop: 80}} onPress={()=>navigation.navigate('SignUp')} />
    </View>
  );
};

export default OopsScreen;

const styles = StyleSheet.create({});
