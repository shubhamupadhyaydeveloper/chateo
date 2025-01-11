import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { FlashList } from "@shopify/flash-list";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native';
import { mmkvStorage } from '../../store/mmkv';
import { navigate, resetAndNavigate } from '../../utils/navigationutils';
import CustomHeader from '../../../storybook/stories/CustomHeader/CustomHeader';
import { screenHeight, screenWidth } from '../../utils/responsive';
const { width, height } = Dimensions.get('window')

const CallScreen = () => {
    // const scrollY = useSharedValue(0);
    // const [contentHeight, setContentHeight] = useState(1);
    // const [listHeight, setListHeight] = useState(1);

    // const scrollHandler = useAnimatedScrollHandler(e => {
    //      scrollY.value = e.contentOffset.y
    // });

    // const scrollIndicatorHeight = listHeight / contentHeight * 50;

    // const animatedIndicatorStyle = useAnimatedStyle(() => {
    //     const translateY = interpolate(
    //         scrollY.value,
    //         [0, contentHeight - listHeight],
    //         [0, listHeight - scrollIndicatorHeight]
    //     );

    //     return {
    //         transform: [{ translateY }],
    //     };
    // });

    const RenderItem = React.memo(({ item, index }: { item: any, index: number }) => (
        <View key={index} className='h-[100px] bg-blue-400 items-center justify-center'>
            <Text className='text-white text-center text-[20px] font-bold'>{item.id} Item</Text>
        </View>
    ));

    const handleLogOut = () => {
        mmkvStorage.setItem('id', '')
        resetAndNavigate('AuthScreen')
    }

    const renderSeparator = useCallback(() => <View className='h-[15px]' />, []);
    return (
        <SafeAreaView className='h-full ' >
            <View className='px-[15px]'>
                <CustomHeader title='Calls' />
                <Text className='text-white'>this is calls</Text>
            </View>

            <TouchableOpacity onPress={handleLogOut}>
                <Text className='text-red-500 text-center mt-5'>soory logout please</Text>
            </TouchableOpacity>


            <View className='absolute' style={{ right: screenWidth * .07, width: 53, height: 53, backgroundColor: "#09af1e", bottom: screenHeight * .145, borderRadius: 15 }}>
                <TouchableOpacity activeOpacity={.85} onPress={() => navigate('AddContact')}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', height: '100%' }}>
                        <MaterialIcon name='add-call' color={"black"} size={25} />
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default CallScreen;