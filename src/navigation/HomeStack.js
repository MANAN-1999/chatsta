import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBording from '../screens/onbording/OnBording';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import Login from '../screens/login/Login';
import ForgotPass from '../screens/forgotpass/ForgotPass';
import ReturnToMail from '../screens/forgotpass/ReturnToMail';
import SignUp from '../screens/signup/SignUp';
import OopsScreen from '../screens/forgotpass/OopsScreen';
import CreateNewPassword from '../screens/forgotpass/CreateNewPassword';
import PasswordUpdated from '../screens/forgotpass/PasswordUpdated';
import SuccessScreen from '../screens/signup/SuccessScreen';
import Deshbord from '../screens/deshboard/Deshbord';
import Namescreen from '../screens/signup/Namescreen';
import ProgressBarLine from '../component/ProgressBarLine';
import EmailandLocation from '../screens/signup/EmailandLocation';
import AddPhotosScreen from '../screens/signup/AddPhotosScreen';
import Moreaboutyou from '../screens/signup/Moreaboutyou';
import AlmostDone from '../screens/signup/AlmostDone';
import Yahoo from '../screens/signup/Yahoo';
import TabNavtigation from './TabNavtigation';
import Accounts from '../screens/settings/Accounts';
import ChatScreen from '../screens/messages/ChatScreen';
import ContactList from '../screens/messages/ContactList/ContactList';
import CreateGroup from '../screens/messages/CreateGroup/CreateGroup';
import GroupChat from '../screens/messages/GroupChat/GroupChat';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBording" component={OnBording} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ReturnToMail" component={ReturnToMail} />
      <Stack.Screen name="OopsScreen" component={OopsScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="ProgressBarLine" component={ProgressBarLine} />
      <Stack.Screen name="Namescreen" component={Namescreen} />
      <Stack.Screen name="EmailandLocation" component={EmailandLocation} />
      <Stack.Screen name="AddPhotosScreen" component={AddPhotosScreen} />
      <Stack.Screen name="Moreaboutyou" component={Moreaboutyou} />
      <Stack.Screen name="AlmostDone" component={AlmostDone} />
      <Stack.Screen name="Yahoo" component={Yahoo} />
      <Stack.Screen name="TabNavtigation" component={TabNavtigation} />
      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ContactList" component={ContactList} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="GroupChat" component={GroupChat} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
