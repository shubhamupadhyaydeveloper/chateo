import {View, Text, StatusBar, Dimensions} from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { resetAndNavigate } from '../utils/navigationutils';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {

  useEffect(() => {
    setTimeout(() => {
        resetAndNavigate('AppScreen');
    },2500)
  },[])
  return (
    <View style={{width, height: '100%', backgroundColor: 'black'}}>
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
          justifyContent: 'center',
        }}>
        <LottieView
          style={{width: width * 0.8, height: height * 0.5}}
          autoPlay
          duration={2300}
          source={require('../../assets/lottie/splash.json')}
          loop={false}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            position: 'absolute',
            bottom: height * 0.38,
            fontFamily: 'Poppins-Bold',
          }}>
          Chateo
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
