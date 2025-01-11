import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import CustomModal from '../../../../shared/CustomModal';
import { screenHeight, screenWidth } from '../../../../utils/responsive';
import { FlashList } from '@shopify/flash-list';
import { countryOptions } from '../../../../mock/mock';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { primaryColor } from '../../../../utils/color';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

type props = {
    setCountryFlag: (data: any) => void,
    visible: boolean,
    toogleVisible: () => void,
    setCountryOptionValue: (data: string) => void
}

const ContryModal = ({ setCountryFlag, setCountryOptionValue, toogleVisible, visible }: props) => {
    const sharedScale = useSharedValue(0); 
    const sharedOpacity = useSharedValue(0); 

    const modalAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: sharedScale.value }],
            opacity: sharedOpacity.value,
        };
    });

    useEffect(() => {
        if (visible) {
            sharedOpacity.value = withTiming(1, { duration: 400 });
            sharedScale.value = withSequence(
                withTiming(1.1, { duration: 250 }), 
                withTiming(1, { duration: 250 })
            );
        } else {
            sharedOpacity.value = withTiming(0, { duration: 400 });
        }
    }, [visible]);

    const RenderComponent = useCallback(() => (
        <View style={{ height: 20 }} />
    ), [])

    const RenderModalItem = useCallback((item: { name: string; icon: string }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={() => {
                    setCountryOptionValue(item.name);
                    setCountryFlag(item.icon);
                    toogleVisible();
                }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View
                        key={`${item.icon}-${item.name}`}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <Image
                            source={{ uri: item.icon }}
                            width={50}
                            height={50}
                            style={{ borderRadius: 30 }}
                        />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            {item.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, []);

    return (
        <CustomModal isVisible={visible}>
            <View style={[styles.modal, { }]}>
                <Animated.View style={[styles.closemodalbox, modalAnimatedStyle]}>
                    <TouchableOpacity activeOpacity={0.85} onPress={toogleVisible}>
                        <View
                            style={{
                                borderWidth: 2.5,
                                borderRadius: 15,
                                borderColor: primaryColor,
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                                alignSelf: 'flex-end',
                            }}>
                            <AntDesignIcon name="close" color={'#dadada'} size={25} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    className='bg-[#1D272A] rounded-[15px]'
                    style={[{ width: screenWidth * 0.72, height: screenHeight * 0.51 },modalAnimatedStyle]}>
                    <FlashList
                        estimatedItemSize={70}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={RenderComponent}
                        ListFooterComponent={RenderComponent}
                        scrollEventThrottle={16}
                        keyExtractor={(_, index) => index.toString()}
                        data={countryOptions}
                        renderItem={({ item }) => (
                            <RenderModalItem icon={item.icon} name={item.name} />
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    />
                </Animated.View>
            </View>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: screenHeight * 0.03,
    },
    inputcontainer2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    modal: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closemodalbox: {
        width: screenWidth * 0.73,
    },
});

export default ContryModal;