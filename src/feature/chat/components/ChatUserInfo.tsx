import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { navigate } from '../../../utils/navigationutils';
import { bouncyTransition } from '../../../utils/sharedTransition';


type ChatUserInfoProps = {
    name: string,
    image: string,

}

const ChatUserInfo = ({ name, image }: ChatUserInfoProps) => {
    const navigation = useNavigation()
    const handleProfile = useCallback(() => {
        navigate('ProfileDetail', {
            name,
            profileImage: image
        })
    }, [])
    return (
        <View className="bg-[black] pb-[10px] px-[5px]  pt-5 flex flex-row justify-between items-center">
            <View className='flex flex-row items-center'>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcon
                        name="arrow-back"
                        color="white"
                        size={25}
                        className="mr-2"
                    />
                </TouchableOpacity>

                <View className='flex flex-row items-center gap-[10px]'>
                    <View>
                        <Animated.Image sharedTransitionTag="sharedImagechat" sharedTransitionStyle={bouncyTransition} source={{ uri: image }} style={{ width: 40, height: 40 }} />
                    </View>
                    <TouchableOpacity activeOpacity={.85} onPress={handleProfile}>
                        <View>
                            <Text className='text-white text-[15px] font-medium'>{name}</Text>
                            <Text className='text-[#82888C] text-[11px] font-medium'>10:12 AM</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex flex-row px-3 gap-[10px]'>
                <MaterialCommunityIcon name='phone-outline' color={"white"} size={25} />
                <MaterialCommunityIcon name='video-outline' color={"white"} size={25} />
            </View>
        </View>
    )
}

export default ChatUserInfo;

const styles = StyleSheet.create({})