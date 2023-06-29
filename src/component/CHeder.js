import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CHeder = ({title, ficone, isize, sicone, onpress,otherstyle}) => {
  return (
    <View
      style={[styles.continer,{otherstyle}]}>
      <TouchableOpacity onPress={onpress}>
        <Ionicons name={ficone} size={isize} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.txt}>{title}</Text>
      <TouchableOpacity onPress={onpress}>
        <Ionicons name={sicone} size={isize} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default CHeder;

const styles = StyleSheet.create({
  txt: {fontSize: 25, fontWeight: 'bold', color: 'black'},
  continer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth:0.2
  }
});
