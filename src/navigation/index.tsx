import { View, Text } from 'react-native';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack/stack';
import { navigationRef } from '../utils/navigationutils';
import AuthStackNavigator from './stack/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';

type navigatonType = {
  SplashScreen: undefined,
  AppMainScreen: undefined,
  AuthScreen: undefined
}

const MainNavigation = () => {
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0A1014',
    },
  };

  const Navigation = createNativeStackNavigator<navigatonType>();


  return (
    <NavigationContainer ref={navigationRef} theme={myTheme} >
      <Navigation.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
        <Navigation.Screen name="SplashScreen" component={SplashScreen} />
        <Navigation.Screen name="AppMainScreen" component={StackNavigator} />
        <Navigation.Screen name="AuthScreen" component={AuthStackNavigator} />
      </Navigation.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
