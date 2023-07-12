import React from 'react';
import {
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
import {createaccount} from '../../utils/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpData} from '../../redux/Slices/UserSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username can have maximum 15 characters')
    .required('Username is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid password',
    )
    .required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  createpin: Yup.string()
    .matches(/^[0-9]{4}$/, 'Invalid Pin')
    .required('Pin is required'),
});

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user.data);
  console.log(data, 'data');

  const handleFormSubmit = values => {
    console.log(values);

    values.finalData = {};
    dispatch(setSignUpData([values]));
    navigation.navigate('SuccessScreen');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Image
        source={require('../../assets/images/chatlogo.png')}
        style={{height: 220, width: 220, alignSelf: 'center'}}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          //   marginTop: 10,
        }}
        >
        Create Account
      </Text>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmpassword: '',
          createpin: '',
        }}
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
              otherstyle={{marginTop: 30}}
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
              otherstyle={{marginTop: 35}}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password && touched.password}
              errorMessage={errors.password}
            />
            <CTextinput
              title={'Confirm password'}
              otherstyle={{marginTop: 35}}
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              value={values.confirmpassword}
              isPassword={true}
              error={errors.confirmpassword && touched.confirmpassword}
              errorMessage={errors.confirmpassword}
            />
            <CTextinput
              title={'Create PIN'}
              otherstyle={{marginTop: 35}}
              onChangeText={handleChange('createpin')}
              onBlur={handleBlur('createpin')}
              value={values.createpin}
              isPassword={true}
              error={errors.createpin && touched.createpin}
              errorMessage={errors.createpin}
            />
            <Text
              style={{
                textAlign: 'center',
                width: '80%',
                alignSelf: 'center',
                marginTop: 25,
                opacity: 0.6,
                fontSize: 12,
                color: 'black',
              }}>
              {createaccount}
            </Text>

            {/* <CButton btntxt={'Log In'} otherstyle={{ marginTop: 30 }} onPress={handleSubmit} /> */}
            <CButton
              btntxt={'Sign up'}
              otherstyle={{marginTop: 10}}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 20,
          paddingBottom: 50,
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center', fontSize: 15, color: 'black'}}>
          Already have an Account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'blue',
              fontWeight: '700',
              opacity: 0.7,
              fontSize: 17,
            }}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
});
