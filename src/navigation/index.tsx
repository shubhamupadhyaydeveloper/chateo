import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack';
import { navigationRef } from '../utils/navigationutils';

const MainNavigation = () => {
  return (
   <NavigationContainer ref={navigationRef}>
     <StackNavigator />
   </NavigationContainer>
  )
}

export default MainNavigation;