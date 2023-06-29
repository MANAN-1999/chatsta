import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createnewpass, newpassdescripction} from '../../utils/Strings';
import CTextinput from '../../component/CTextinput';
import CButton from '../../component/CButton';
import { useNavigation } from '@react-navigation/native';

const CreateNewPassword = () => {
    const navigation =useNavigation()
  return (
    <View style={styles.containar}>
      <Text style={styles.title}>{createnewpass}</Text>
      <Text style={styles.subtitle}>{newpassdescripction}</Text>

      <CTextinput title={'New Password'} otherstyle={{marginTop:70}} isPassword={true} showIcon={true}/>
      <CTextinput  title={'Confirm New Password'} otherstyle={{marginTop:30}} isPassword={true}/>

      <CButton btntxt={"Save"} otherstyle={{marginTop:50}} onPress={()=>navigation.navigate('PasswordUpdated')}/>
    </View>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    backgroundColor:'snow'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop:100
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign:'center',
    width:'60%',
    alignSelf:'center',
    marginTop:15
  },
});
