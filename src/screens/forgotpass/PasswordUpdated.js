import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {passupdated, updatepassdiscripction} from '../../utils/Strings';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';

const PasswordUpdated = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containare}>
      <Image
        source={require('../../assets/images/updatepass.png')}
        style={styles.img}
      />
      <Text style={styles.title}>{passupdated}</Text>
      <Text style={styles.discripction}>{updatepassdiscripction}</Text>

      <CButton
        btntxt={'Log In'}
        onPress={() => navigation.navigate('Login')}
        otherstyle={styles.btn}
      />
    </View>
  );
};

export default PasswordUpdated;

const styles = StyleSheet.create({
  containare: {
    flex: 1,
    backgroundColor: 'snow',
    justifyContent: 'center',
  },
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  discripction: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  btn: {
    marginTop: 80,
  },
});
