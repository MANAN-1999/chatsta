import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik,useFormikContext} from 'formik';
import * as Yup from 'yup';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../redux/Slices/UserDataSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn');
      if (value === 'true') {
        // User is already logged in, navigate to the dashboard screen

        navigation.navigate('TabNavtigation');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async values => {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('username', '==', values.username)
      .where('password', '==', values.password)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return {hasMatch: true, userData};
    } else {
      return {hasMatch: false, userData: null};
    }
  };

  // const handleFormSubmit = values => {
  //   getList(values).then(({hasMatch, userData}) => {
  //     console.log(hasMatch, 'hasMatch');
  //     if (hasMatch) {
  //       AsyncStorage.setItem('loggedIn', 'true');
  //       dispatch(setUserData(userData)); // Dispatch the action with user data
  //       navigation.navigate('TabNavtigation');
  //     } else {
  //       Alert.alert('Warning', 'Invalid Credentials');
  //     }
  //   });
  // };
  const handleFormSubmit = async (values, { resetForm }) => {
    const { hasMatch, userData } = await getList(values);
    if (hasMatch) {
      AsyncStorage.setItem('loggedIn', 'true');
      dispatch(setUserData(userData)); // Dispatch the action with user data
      navigation.navigate('TabNavtigation');
    } else {
      Alert.alert('Warning', 'Invalid Credentials');
    }
    resetForm(); // Reset the form after submission
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Image
        source={require('../../assets/images/chatlogo.png')}
        style={{height: 250, width: 250, alignSelf: 'center'}}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Sign in to continue
      </Text>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleFormSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CTextinput
              title={'Username'}
              otherstyle={{marginTop: 60}}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              error={errors.username && touched.username}
              errorMessage={errors.username}
            />
            <CTextinput
              title={'Password'}
              isPassword={true}
              showIcon={true}
              otherstyle={{marginTop: 30}}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password && touched.password}
              errorMessage={errors.password}
            />
            <TouchableOpacity
              style={{
                width: '40%',
                height: 'auto',
                alignSelf: 'center',
                marginTop: 30,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Or enter your PIN
              </Text>
              <View style={{borderBottomWidth: 1, marginTop: 5}}></View>
            </TouchableOpacity>
            {/* <CButton btntxt={'Log In'} otherstyle={{ marginTop: 30 }} onPress={handleSubmit} /> */}
            <CButton
              btntxt={'Log In'}
              otherstyle={{marginTop: 20}}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <TouchableOpacity
        style={{marginTop: 15, alignSelf: 'center'}}
        onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={{fontSize: 14, opacity: 0.4, color: 'black'}}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 60,
          paddingBottom: 50,
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center', fontSize: 15, color: 'black'}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'blue',
              fontWeight: '700',
              opacity: 0.7,
              fontSize: 17,
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
});
