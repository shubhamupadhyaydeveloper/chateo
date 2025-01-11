import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { RouteProp, useRoute } from '@react-navigation/native';
import { bouncyTransition } from '../../../utils/sharedTransition';
import { stackNavigationType } from '../../../types/navigation';
import { screenHeight, screenWidth } from '../../../utils/responsive';

const ProfileImage = () => {
    const route = useRoute<RouteProp<stackNavigationType, 'ProfileImage'>>()
    const { image, sharedTag } = route.params

    return (
        <SafeAreaView className=''>
            <View className='h-full bg-[rgba(0,0,0,0.5)]'>
                <View style={{ width: screenWidth * .7, height: screenHeight * .35, position: 'absolute', top: screenHeight * .12, left: screenWidth * .15 }} className='items-center justify-center bg-[#21211f]'>
                    <View className='relative top-[-10px]  bg-[#ffffff] w-full p-2'>
                         <Text className='text-black  text-[15px] font-semibold'>Profile Image</Text>
                    </View>
                    <Animated.Image sharedTransitionTag={sharedTag} source={{ uri: image }} style={{ width: 200, height: 200 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileImage;