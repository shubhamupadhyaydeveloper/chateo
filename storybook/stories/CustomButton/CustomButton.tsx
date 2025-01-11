import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../src/utils/responsive';

const CustomButton = ({ title, onPress }: { title: string, onPress?: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.85}>
            <View style={{ width: screenWidth * .9 }} className='rounded-full py-[13px] px-[5px] bg-primarygreen items-center'>
                <Text className='text-white text-center'>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton;