import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackNavigationType } from '../types/navigation';

import Testing from '../feature/voice_call/screens/Testing';

import ChatScreen from '../feature/chat/screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AddContacts from '../feature/contact/screens/AddContacts';
import VideoCallView from '../feature/voice_call/components/VideoCallView';
import BottomTabStack from './bottomtab/bottomtab';
import { Easing } from 'react-native-reanimated'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator<stackNavigationType>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right', gestureEnabled: true, gestureDirection: 'horizontal', }} initialRouteName='SplashScreen'>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="AppScreen" component={BottomTabStack} />
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='AddContact' component={AddContacts} options={{ headerTransparent: true, headerBlurEffect: "light" }} />
      <Stack.Screen name='Testing' component={Testing} />
      <Stack.Screen name='VideoCallScreen' component={VideoCallView} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
