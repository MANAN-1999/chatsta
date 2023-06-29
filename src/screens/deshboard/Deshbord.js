import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {emojis} from '../../assets/data/dummydata';
import PostCard from "../../component/PostCard";

const Deshbord = () => {
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleSearchButtonPress = () => {
    setShowSearchInput(false);
  };
  const handleCancleButtonPress = () => {
    setShowSearchInput(true);
  };
  const handleSearchInputChange = text => {
    setSearchText(text);
  };
  const handlecancletextButton = () => {
    setSearchText(' ');
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
        }}>
        <Image
          source={require('../../assets/images/macd.png')}
          style={{height: 40, width: 40}}
        />
        <Image
          source={require('../../assets/images/macd.png')}
          style={{height: 40, width: 40}}
        />
      </View>

      {showSearchInput ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/chatlogo.png')}
              style={{height: 60, width: 60}}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 10,
              }}>
              Discover
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={handleSearchButtonPress}>
              <Ionicons name="search" size={30} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="md-notifications" size={30} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: 'gray',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 20}}>
                <Ionicons name="search" size={20} color={'black'} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder="Search"
                  style={{marginLeft: 20, width: '75%'}}
                  value={searchText}
                  onChangeText={handleSearchInputChange}
                  autoFocus={true}
                />
                {searchText !== '' && (
                  <TouchableOpacity onPress={handlecancletextButton}>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color={'black'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={handleCancleButtonPress}>
              <Text style={{color: 'blue'}}>Cancle</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: '40%',
              backgroundColor: 'red',
              marginTop: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }}></View>
        </View>
      )}
      <PostCard />
    </View>

  );
};

export default Deshbord;

const styles = StyleSheet.create({});
