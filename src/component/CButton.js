import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CButton = ({ btntxt, otherstyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, otherstyle]}>
        <Text style={styles.buttonText}>{btntxt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'yellow',
    // paddingVertical: 12,
    borderRadius: 25,
    height:50,
    width:'60%',
    alignSelf:'center',
    // alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CButton;
