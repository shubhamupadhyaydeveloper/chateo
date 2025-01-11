import { View, Text, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from "react-native-vector-icons/Entypo"
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Animated, { Extrapolation, interpolate, SlideInRight, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { stackNavigationType } from '../../types/navigation';
import { screenHeight, screenWidth } from '../../utils/responsive';
import { ProfileDetailOption, ProfileDetailOption2 } from '../../mock/mock';
import Icon from '../../utils/Icons';
import { bouncyTransition } from '../../utils/sharedTransition';

const ProfileDetail = () => {
    const route = useRoute<RouteProp<stackNavigationType, 'ProfileDetail'>>()
    const { name, profileImage } = route.params
    const navigation = useNavigation()
    const positionX = useSharedValue(screenWidth * .35)
    const positionY = useSharedValue(20)
    const scrollY = useSharedValue(0)
    const scaleImage = useSharedValue(1)
    const textOpacity = useSharedValue(1)
    const textPositionX = useSharedValue(20)

    const handleScroll = useAnimatedScrollHandler(e => {
        scrollY.value = e.contentOffset.y
    })

    const imageAnimatedStyle = useAnimatedStyle(() => {
        positionX.value = interpolate(scrollY.value, [0, 90], [screenWidth * .35, screenWidth * .02], Extrapolation.CLAMP)
        scaleImage.value = interpolate(scrollY.value, [0, 90], [1, .38], Extrapolation.CLAMP)
        positionY.value = interpolate(scrollY.value, [0, 90], [20, -screenHeight * .04], Extrapolation.CLAMP)

        return {
            position: 'absolute',
            top: positionY.value,
            left: positionX.value,
            zIndex: 10,
            transform: [{ scale: scaleImage.value }]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        textOpacity.value = interpolate(scrollY.value, [60, 90], [0, 1], Extrapolation.CLAMP)
        textPositionX.value = interpolate(scrollY.value, [60, 90], [20, 60], Extrapolation.CLAMP)
        return {
            opacity: textOpacity.value,
            marginLeft: textPositionX.value
        }
    })
    return (
        <SafeAreaView>
            <View className="bg-[black] pb-[15px] px-[5px] pt-5 flex flex-row justify-between items-center">
                <View className='flex flex-row items-center'>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <View className='flex flex-row'>
                            <MaterialIcon
                                name="arrow-back"
                                color="#E8EDEE"
                                size={25}
                                className="mr-2"
                            />
                            <Animated.Text style={[textAnimationStyle]} className=' text-[18px] text-customwhite font-bold'>{name[0].toUpperCase() + name.slice(1)}</Animated.Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View className='flex flex-row px-3 gap-[10px]'>
                    <EntypoIcon name="dots-three-vertical" color={'#E8EDEE'} size={18} />
                </View>
            </View>

            <Animated.View style={[imageAnimatedStyle]}>
                <Animated.Image sharedTransitionTag="sharedImagechat" sharedTransitionStyle={bouncyTransition} source={{ uri: profileImage }} style={{ width: screenWidth * .32, height: screenHeight * .162 }} />
            </Animated.View>

            <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={{ height: screenHeight * .09 }} />

                <View className='mt-5 mb-5 self-center'>
                    <Text className='text-customwhite font-bold text-[18px] text-center'>{name[0].toUpperCase() + name.slice(1)}</Text>
                    <View>
                        <Text className='text-[#82888C] text-[16px] mt-[3px] text-center'>+919899898989</Text>
                        <Text className='text-[#82888C] text-[15px] mt-[7px] text-center'>Last seen Sun 6:25 PM</Text>
                    </View>

                    <View className='flex flex-row justify-between px-[20px] gap-[5px] items-center' style={{ width: screenWidth, marginTop: screenHeight * .05 }}>
                        {ProfileDetailOption.map((item, index) => (
                            <TouchableWithoutFeedback key={index} >
                            <View className='border-[#82888C] border-[.5px] flex gap-[5px] h-[70px] w-[70px] rounded-[15px] items-center justify-center' >
                                <Icon type={item.type} name={item.label} color='#00AA82' />
                                <Text className='text-customwhite text-center'>{item.name}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>

                    <View>
                        <View style={{ marginTop: screenHeight * .05, marginLeft: screenHeight * .025, marginBottom: screenHeight * .03 }}>
                            <Text className='text-customwhite text-[16px] font-semibold '>Hey there! I am using WhatsApp</Text>
                        </View>
                    </View>

                    <View className='flex justify-between px-[20px] ' style={{ marginTop: screenHeight * .05,gap : screenHeight* .04 }}>
                        {ProfileDetailOption2.map((item, index) => (
                            <View key={index} className=' flex flex-row gap-[20px] rounded-[15px] ' >
                                <Icon type={item.type} name={item.label} color='#555B5F' size={25} />
                                <View className='flex  '>
                                    <Text className='text-customwhite text-[16px] '>{item.name}</Text>
                                    {item.message && (
                                        <View style={{ width: screenWidth * .7 }}>
                                            <Text className='text-[#555B5F]'>{item.message}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                </View>
            
             <View style={{height : screenHeight * .2}}/>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default ProfileDetail;