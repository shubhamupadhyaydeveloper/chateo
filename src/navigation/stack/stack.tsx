import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackNavigationType } from '../../types/navigation';
import ChatScreen from '../../feature/chat/screens';
import AddContacts from '../../feature/contact/screens';
import VideoCallView from '../../feature/voice_call/components/VideoCallView';
import BottomTabStack from '../bottomtab/bottomtab';
import ProfileDetail from '../../screens/profile/ProfileDetail';
import ProfileImage from '../../screens/HomeScreen/profile/ProfileImage';
import StatusContent from '../../feature/status/screens/StatusContent';
import SearchPage from '../../feature/search';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator<stackNavigationType>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right' }} initialRouteName='AppScreen'>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="AppScreen" component={BottomTabStack} />
      <Stack.Screen name='AddContact' component={AddContacts} options={{ headerTransparent: true, headerBlurEffect: "light" }} />
      <Stack.Screen name='VideoCallScreen' component={VideoCallView} />
      <Stack.Screen name='ProfileDetail' component={ProfileDetail} options={{ animation: 'fade', }} />
      <Stack.Screen name='ProfileImage' component={ProfileImage} options={{ animation: 'fade', presentation : 'transparentModal'}} />
      <Stack.Screen name='StatusContent' component={StatusContent} options={{animation : 'fade'}} />
      <Stack.Screen name='SearchScreen' component={SearchPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
