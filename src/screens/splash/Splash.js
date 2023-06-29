import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBording');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

    // useEffect(() => {
    //   checkLoggedInUser();
    // }, []);
  
    // const checkLoggedInUser = async () => {
    //   const email = await AsyncStorage.getItem('EMAIL');
    //   const password = await AsyncStorage.getItem('PASSWORD');
  
    //   if (email && password) {
    //     navigation.navigate('Bottom Tab');
    //   }
    //   else{
    //       navigation.navigate('Login');
    //   }
    // }
  return (
    <ImageBackground
      source={require('../../assets/images/onbording.png')}
      style={styles.backgroundImage}
      blurRadius={15}>
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/images/chatlogo.png')}
          style={styles.overlayImage}
        />
        <Text style={styles.text}>Chatsta</Text>
        <Text style={styles.text}>Social Massanger</Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});
