import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CarouselItemData, CarouselItemtype } from '../../utils/mock';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

const _ImageHeight = screenHeight * .75
const _spacing = 8;
const _ImageFullHeight = _ImageHeight + _spacing * 2

function AnimateCard({ item, index, scrollY }: { item: CarouselItemtype, index: number, scrollY: SharedValue<number> }) {
    const carouselStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollY.value, [index - 1, index, index + 1], [0.3, 1, 0.3], Extrapolation.CLAMP),
            transform: [{ scale: interpolate(scrollY.value, [index - 1, index, index + 1], [0.92, 1, 0.92], Extrapolation.CLAMP) }]
        }
    })
    return (
        <Animated.View style={[{
            height: _ImageHeight,
            padding: _spacing,
            borderRadius: _spacing + 2,
            gap: _spacing
        }, carouselStyle]}>
            <Image source={{ uri: item.image, }} style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]} blurRadius={50} />
            <Image source={{ uri: item.image, }} style={{ height: "90%", width: "100%", flex: 1 }} />
            <View style={{ gap: 3 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Lorems</Text>
                <Text style={{ color: 'white' }} numberOfLines={3}>
                    {item.title}
                </Text>
            </View>

        </Animated.View>
    )
}

const CarouselScreen = () => {
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler(e => {
        scrollY.value = e.contentOffset.y / _ImageFullHeight
    })

    return (
        <Animated.FlatList
            data={CarouselItemData}
            contentContainerStyle={{
                paddingHorizontal: 15,
                gap: _spacing * 2,
                paddingVertical: (screenHeight - _ImageFullHeight) / 3
            }}
            snapToInterval={_ImageFullHeight}
            decelerationRate="normal"
            renderItem={({ item, index }) => (
                <AnimateCard index={index} item={item} scrollY={scrollY} />
            )}
            onScroll={onScroll}
            scrollEventThrottle={16}
        />
    )
}

export default CarouselScreen;

const styles = StyleSheet.create({})