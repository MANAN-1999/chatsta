// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {ForgotPassword, discripctions, noproblem} from '../../utils/Strings';
// import CTextinput from '../../component/CTextinput';
// import CButton from '../../component/CButton';
// import {useNavigation} from '@react-navigation/native';

// const ForgotPass = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.containar}>
//       <Text style={styles.heding}>{ForgotPassword}</Text>
//       <Text style={styles.noprotxt}>{noproblem}</Text>
//       <Text style={styles.discripction}>{discripctions}</Text>
//       <CTextinput title={'Email ID'} otherstyle={{marginTop: 70}} />
//       <CButton btntxt={'Get Reset Link'} otherstyle={{marginTop: 50}} onpress={() => navigation.navigate('ReturnToMail')}/>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           alignSelf: 'center',
//           marginTop: 'auto',
//           paddingBottom: 50,
//           bottom: 0,
//         }}>
//         <Text>Return to</Text>
//         <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
//           <Text style={{color: 'blue', fontSize: 15, fontWeight: '600'}}>
//             {' '}
//             Log in
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ForgotPass;

// const styles = StyleSheet.create({
//   containar: {
//     flex: 1,
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: 'snow',
//   },
//   heding: {
//     fontSize: 22,
//     textAlign: 'center',
//     marginTop: 100,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   noprotxt: {
//     textAlign: 'center',
//     marginTop: 10,
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   discripction: {
//     textAlign: 'center',
//     color: 'black',
//     marginTop: 20,
//     fontSize: 14,
//     fontWeight: '400',
//     width: '80%',
//     alignSelf: 'center',
//   },
// });

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react'; 
import {ForgotPassword, discripctions, noproblem} from '../../utils/Strings';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import {useNavigation} from '@react-navigation/native';

const ForgotPass = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetLink = () => {
    console.log(email.length,"email.length");
    if (email.length == 0) {
      navigation.navigate('OopsScreen');
    } else {
       navigation.navigate('ReturnToMail');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{ForgotPassword}</Text>
      <Text style={styles.noprotxt}>{noproblem}</Text>
      <Text style={styles.description}>{discripctions}</Text>
      <CTextinput
        title={'Email ID'}
        otherstyle={{marginTop: 70}}
        onChangeText={text => setEmail(text)}
      />
      <CButton
        btntxt={'Get Reset Link'}
        otherstyle={{marginTop: 50}}
        onPress={handleResetLink}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 'auto',
          paddingBottom: 50,
          bottom: 0,
        }}>
        <Text>Return to</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'blue', fontSize: 15, fontWeight: '600'}}>
            {' '}
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'snow',
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 100,
    color: 'black',
    fontWeight: 'bold',
  },
  noprotxt: {
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  description: {
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '400',
    width: '80%',
    alignSelf: 'center',
  },
});
