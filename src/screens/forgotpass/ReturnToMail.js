import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {chackemailtext, emaildescripction} from '../../utils/Strings';

const ReturnToMail = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contentContainer}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CreateNewPassword')}>
        <Image
          source={require('../../assets/images/email.png')}
          style={styles.image}
        />
        <Text style={styles.checkEmailText}>{chackemailtext}</Text>
        <Text style={styles.emailDescription}>{emaildescripction}</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text>Return to</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnToMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  checkEmailText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  emailDescription: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    width: '60%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loginText: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
});
