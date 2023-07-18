import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
  image,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.continer, otherstyle]}>
      {isIcon ? (
        <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={ficone} size={isize} color={'gray'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            // backgroundColor: 'red',
            borderRadius: 25,
            marginBottom: 3,
            // width: '10%',
            overflow:'hidden'
          }}>
          <Image source={{ uri: image }} style={{width:'100%',height:'100%',}} />
        </TouchableOpacity>
      )}
      <Text style={styles.txt}>{title}</Text>
      <TouchableOpacity style={{width: '10%'}} onPress={onpress}>
        <Ionicons name={sicone} size={isize} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default CHeder;

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
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
