import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Deshbord from '../screens/deshboard/Deshbord';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Messages from '../screens/messages/Messages';
import Profile from '../screens/profile/Profile';
import Settings from '../screens/settings/Settings';
import Post from '../screens/post/Post';

const Tab = createBottomTabNavigator();

const TabNavtigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: 'snow',
          elevation: 10,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'snow',
        tabBarActiveBackgroundColor: '#5c76db',
        tabBarItemStyle: {
          // alignItems:'center',
          justifyContent: 'center',
          alignSelf: 'center',
          height: 60,
          width: 60,
          // borderWidth:1,
          margin: 6,
          borderRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Dashbord"
        component={Deshbord}
        options={{
          tabBarLabelStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-home-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabelStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-chatbox-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarVisible: false,
          tabBarLabelStyle: {display: 'none'},
          tabBarItemStyle: {
            height: 80,
            width: 80,
            // padding: 10,
            borderRadius: 40,
            // borderBottomWidth: 1,
            // // position:'absolute',
            // top: -40,
            backgroundColor: 'transparent',
            // borderWidth:0.2
            // tabBarActiveBackgroundColor: 'snow',
            // elevation: 6,
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                height: 70,
                width: 70,

                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 35,
                // elevation:6,
                overflow: 'hidden',
                top: -40,
              }}>
              <View
                style={{
                  height: '90%',
                  width: '90%',
                  borderRadius: 30,
                  backgroundColor: 'yellow',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                  <Ionicons name="md-add-sharp" color={'black'} size={50}/>
                </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabelStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavtigation;
