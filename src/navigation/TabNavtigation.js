import { StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Deshbord from '../screens/deshboard/Deshbord';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Messages from '../screens/messages/Messages';
import Profile from '../screens/profile/Profile';
import Settings from '../screens/settings/Settings';
import Post from '../screens/post/Post';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [showTabBar, setShowTabBar] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowTabBar(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowTabBar(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: [styles.tabBar, showTabBar ? null : styles.hiddenTabBar],
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'snow',
          tabBarActiveBackgroundColor: '#5c76db',
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Deshbord}
          options={{
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home-sharp" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="md-chatbox-ellipses-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={Post}
          options={{
            tabBarVisible: false,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.postTabBarItem,
            tabBarIcon: ({ color, size }) => (
              <View style={styles.postTabBarIcon}>
                <View style={styles.postTabBarIconInner}>
                  <Ionicons name="md-add-sharp" color={'black'} size={50} />
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-sharp" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 80,
    backgroundColor: 'snow',
    elevation: 10,
  },
  hiddenTabBar: {
    display: 'none',
  },
  tabBarLabel: {
    display: 'none',
  },
  tabBarItem: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    width: 60,
    margin: 6,
    borderRadius: 30,
  },
  postTabBarItem: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
  },
  postTabBarIcon: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    overflow: 'hidden',
    bottom: 10,
  },
  postTabBarIconInner: {
    height: '90%',
    width: '90%',
    borderRadius: 30,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigation;
