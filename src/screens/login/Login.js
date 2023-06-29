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
import {Formik} from 'formik';
import * as Yup from 'yup';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();

  const getList = async values => {
    let userRef = await firestore().collection('Users').get();
    return userRef.docs.map(
      i =>
        i.data().username == values.username &&
        i.data().password == values.password,
    );
  };
  const handleFormSubmit = values => {
    console.log(values);
    getList(values).then(res => {
      if (res[0] == true) {
        navigation.navigate('TabNavtigation');
      } else {
        Alert.alert('Warning', 'Invalid Cradentials');
      }
    });
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
