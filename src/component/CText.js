import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CText = ({ text, onPress ,otherstyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer,otherstyle]}>
      <View style={styles.iconContainer}>
        <Ionicons name={'chevron-down-sharp'} size={20} color={'blue'} /> 
      </View>
      <Text style={styles.text}>{text}</Text> 
    </TouchableOpacity>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconContainer: {
    marginRight: 8,
    Size:20,
    color:'black',
    width:'5%',
    alignSelf:'center'
  },
  
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    width:'40%'
  },
};

export default CText;
