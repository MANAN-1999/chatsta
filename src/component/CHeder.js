import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CHeder = ({
  title,
  ficone,
  isize,
  sicone,
  onpress,
  otherstyle,
  isIcon,
  profileimg,
  imgstyle,
}) => {
  return (
    <View style={[styles.continer, otherstyle]}>
      {isIcon ? (
        <TouchableOpacity onPress={onpress}>
          <Ionicons name={ficone} size={isize} color={'gray'} />
        </TouchableOpacity>
      ) : (
       <TouchableOpacity style={{height:50,width:50,backgroundColor:'red',borderRadius:25}}>
       <Image  />
       </TouchableOpacity>
       
      )}
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
  continer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
  },
  imgstyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
