import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Yahoo = () => {
    const navigation=useNavigation()
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  return (
    <TouchableOpacity style={{flex:1,justifyContent:'center'}} >
     <Image source={require('../../assets/images/yahoo.png')} style={{height:200,width:200,alignSelf:'center'}}/>
     <Text style={{fontSize:30,fontWeight:'bold',color:'black',alignSelf:'center',marginTop:50}}>Yahooo!</Text>
    </TouchableOpacity>
  )
}

export default Yahoo

const styles = StyleSheet.create({})