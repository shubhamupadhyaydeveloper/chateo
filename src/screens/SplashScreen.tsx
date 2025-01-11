import { View, Text, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { navigate, resetAndNavigate } from '../utils/navigationutils';
import { mmkvStorage } from '../store/mmkv';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {

  const isValidUser = mmkvStorage.getItem('id');

  useEffect(() => {
    setTimeout(() => {
      if (isValidUser) {
        resetAndNavigate('AppMainScreen');
      } else {
        resetAndNavigate('AuthScreen');
      }
    }, 2500);
  }, [isValidUser]);

  return (
    <View style={{ width, height: '100%', backgroundColor: 'black' }}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View className="items-center justify-center">
          <LottieView
            style={{ width: width * 0.8, height: height * 0.5 }}
            autoPlay
            duration={2300}
            source={require('../../assets/lottie/splash.json')}
            loop={false}
          />
        </View>
        <View>
          <ActivityIndicator size={35} color={'#00AA82'} />
          <Text className="text-white font-semibold mt-[20px]">Powered by React Native</Text>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
