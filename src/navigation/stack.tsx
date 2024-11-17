import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackNavigationType } from '../types/navigation';

import Testing from '../feature/voice_call/screens/Testing';
import VideoCallView from '../feature/voice_call/components/VideoCallView';
import ChatScreen from '../feature/chat/screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AddContacts from '../feature/contact/screens/AddContacts';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator<stackNavigationType>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right' }} initialRouteName='SplashScreen'>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='AddContact' component={AddContacts} />
      <Stack.Screen name='Testing' component={Testing} />
      <Stack.Screen name='VideoCallView' component={VideoCallView} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
