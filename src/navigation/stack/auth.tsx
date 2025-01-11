import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authNavigationType, stackNavigationType } from '../../types/navigation'
import AuthEnterCode from '../../screens/auth/AuthEnterCode';
import SplashScreen from '../../screens/SplashScreen';
import AuthEnterNumber from '../../screens/auth/number/AuthEnterNumber';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import AuthProfile from '../../screens/auth/AuthProfile';

const AuthStackNavigator = () => {
    const Auth = createNativeStackNavigator<authNavigationType>();
    return (
        <Auth.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right', gestureEnabled: true, gestureDirection: 'horizontal', }} initialRouteName='Onboarding'>
            <Auth.Screen name='EnterCode' component={AuthEnterCode} />
            <Auth.Screen name='EnterNumber' component={AuthEnterNumber} />
            <Auth.Screen name='Onboarding' component={OnboardingScreen} />
            <Auth.Screen name='AuthProfile' component={AuthProfile} />
        </Auth.Navigator>
    );
};

export default AuthStackNavigator;
