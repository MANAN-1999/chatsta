import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const OnBording = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          flex: 1
        }}>
        <Image
          source={require('../../assets/images/onbording.png')}
          style={{height: 'auto', width: 'auto', flex: 1}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnBording;
