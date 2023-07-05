import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Check if the onboarding flag exists in AsyncStorage
        const onboardingFlag = await AsyncStorage.getItem('onboardingFlag');

        if (onboardingFlag === null) {
          // Flag doesn't exist, user is opening the app for the first time
          await AsyncStorage.setItem('onboardingFlag', 'true');
          setTimeout(() => {
            navigation.replace('OnBording');
          }, 3000);
        } else {
          // Flag exists, user has already gone through the onboarding process
          setTimeout(() => {
            navigation.replace('Login');
          }, 3000);
        }
      } catch (error) {
        console.log('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
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
