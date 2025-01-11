import { View, Text, StatusBar, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity, TouchableWithoutFeedbackBase } from 'react-native'
import React, { memo, useState } from 'react'
import CustomHeader from '../../../shared/CustomHeader';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { screenHeight, screenWidth } from '../../../utils/responsive';
import Animated, { runOnJS, SlideInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { navigate } from '../../../utils/navigationutils';
import { homeMenuOptions } from '../../../mock/mock';

export const HompageSearchComponent = memo(() => (
    <TouchableWithoutFeedback onPress={() => navigate('SearchScreen')} >
        <View style={{ width: screenWidth * .95, padding: screenHeight * .019, paddingHorizontal: 20 }} className='bg-[#22282C] self-center items-center gap-[10px] mb-[5px] rounded-full flex flex-row'>
            <View className=''>
                <FontistoIcon name='search' color={'#82888C'} size={20} />
            </View>

            <Text className='text-[#82888C]'>
                Search
            </Text>
        </View>
    </TouchableWithoutFeedback>
))

const HomepageHeader = () => {
    const [input, setInput] = useState<string>('')
    const [visible, SetVisible] = useState(false)
    const modalBottom = useSharedValue(200)

    const closeReplyModal = () => {
        modalBottom.value = withTiming(200, { duration: 150 }, () => {
            // Run this after the animation completes
            runOnJS(SetVisible)(false);
        });

    }
    const openReplyModal = () => {
        SetVisible(true)
        modalBottom.value = withTiming(0, { duration: 150 });
    }

    const animatedOptionBar = useAnimatedStyle(() => {
        return {
            bottom: modalBottom.value
        }
    })

    return (
        <View>
            <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
            <View style={{ paddingHorizontal: 15 }}>
                <CustomHeader onModalOpen={openReplyModal} />
            </View>

            <Modal
                animationType="none"
                transparent={true}
                visible={visible}
                onRequestClose={closeReplyModal} // Handles hardware back button
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={closeReplyModal} // Closes modal when clicking outside
                >
                    <View
                        className="absolute right-[10px] overflow-hidden"
                        style={{
                            width: screenWidth * 0.5,
                            marginTop: screenHeight * 0.07,
                            height: screenHeight * 0.3,
                        }}
                    >
                    <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                        <Animated.View
                            className="bg-[#292f32] rounded-[12px] relative"
                            style={[{ height: 200 , gap : 10,padding : 10}, animatedOptionBar]}
                    >
                            {homeMenuOptions.map(
                                (item, index) => (
                                    <View key={index} className="px-[5px]">
                                        <Text className="text-customwhite text-[14.5px]">{item}</Text>
                                    </View>
                                )
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>


        </View>
    )
}

export default HomepageHeader;