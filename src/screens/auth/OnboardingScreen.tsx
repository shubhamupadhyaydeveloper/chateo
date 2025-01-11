import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { onboardingImage } from '../../utils/images';
import { screenHeight, screenWidth } from '../../utils/responsive';
import CustomButton from '../../../storybook/stories/CustomButton/CustomButton';
import { navigate } from '../../utils/navigationutils'
import Animated, { useAnimatedScrollHandler, useSharedValue, runOnJS, useAnimatedStyle, interpolate, Extrapolation, withSpring, useDerivedValue } from 'react-native-reanimated';


const OnboardingScreen = () => {
    const data = Array.from({ length: 3 }, (_, index) => index + 1);
    const currentIndex = useSharedValue(0)
    const scrollX = useSharedValue(0);

    const handleScroll = useAnimatedScrollHandler(e => {
        scrollX.value = e.contentOffset.x;
        currentIndex.value = Math.floor(e.contentOffset.x / screenWidth)
    });


    // setCurrentIndex(index.value)

    const RenderComponent = memo(({ item, index }: { item: number; index: number }) => {
        const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
                scrollX.value,
                [
                    (index - 1) * screenWidth,
                    index * screenWidth,
                    (index + 1) * screenWidth,
                ],
                [0.78, 1, .78],
                Extrapolation.CLAMP
            );

            return {
                transform: [{ scale: withSpring(scale, { damping: 40, stiffness: 200 }) }],
            };
        });

        return (
            <View
                key={index}
                style={{
                    width: screenWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                
                }}
            >
                <View className='justify-around items-center flex h-full'>
                    <View className='items-center justify-center'>
                    <Animated.Image style={[animatedStyle,{width : screenWidth * .47,height : screenHeight * .15}]} source={onboardingImage} />
                     <Text className='text-customwhite text-[13px] font-bold'>Welcome to Chateo </Text>
                    </View>
                    <View style={{ width: screenWidth * .85 }}>
                        <Animated.Text style={[animatedStyle]} className='text-customwhite text-[17px] font-bold text-center'>Connect easily with your family and friends over countries Tap on start to get started chat with your friends</Animated.Text>
                    </View>
                </View>
            </View>
        );
    });

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={"black"} barStyle={'light-content'} />
            <View className='flex  h-full'>
                {/* <View>

                <View className='items-center'>
                    <Image source={onboardingImage} className='' />
                    <View>
                        <Text className='text-primarygreen text-[17px] font-bold'>Welcome to Chateo</Text>
                    </View>
                </View>
                <View
                    className='self-center text-center flex  '
                    style={{marginTop : screenHeight * .02}}
                >
                    <View style={{ width: screenWidth * .76 }} className='self-center text-center'>

                    <Text className='text-white text-center font-extrabold text-[21px]'>
                        Connect easily with your family and friends over countries
                    </Text>
                    </View>
                </View>
                </View> */}
                <View style={{ height: screenHeight * .7 }}>
                    <Animated.FlatList
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        pagingEnabled
                        horizontal
                        renderItem={({ item, index }) => <RenderComponent index={index} item={item} />}
                    />
                </View>

                <View style={{ marginTop: screenHeight * .05 }} className="flex flex-row gap-[5px] items-center justify-center mt-[5px]">
                    {data.map((item, index) => {
                        const dotStyle = useAnimatedStyle(() => {
                            return {
                                backgroundColor: currentIndex.value === index ? '#00AA82' : 'white',
                            };
                        });

                        return (
                            <Animated.View
                                key={index}
                                className="w-[7px] h-[7px] rounded-full"
                                style={dotStyle}
                            />
                        )
                    })}
                </View>

                <View className='items-center' style={{ marginTop: screenHeight * .05 }}>
                    <Text className='text-white text-center'>Terms & Privacy Policy</Text>
                    <View className='mt-[5px]'>
                        <CustomButton title='Start Messaging' onPress={() => navigate('EnterNumber')} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OnboardingScreen;