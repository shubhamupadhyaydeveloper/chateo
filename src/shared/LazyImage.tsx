import { View, Text, Image, ImageStyle } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { unknowUserImage } from '../utils/images';
import Animated from 'react-native-reanimated';

const LazyImage = ({
    image,
    width,
    height,
    style,
    sharedTag
}: {
    image: string;
    width: number;
    height: number;
    style?: ImageStyle ;
    sharedTag?:string
}) => {
    const [loading, setLoading] = useState(true);
    return (
        <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: image, priority: FastImage.priority.normal, }}
            style={[{ width, height ,borderRadius : 20},]}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
        >
            {loading && (
                <View style={{alignSelf : 'center',justifyContent : 'center'}} >
                    <Animated.Image sharedTransitionTag={sharedTag}  source={unknowUserImage} style={{width: 40,height : 40}} />
                </View>
            )}
        </FastImage>
    );
};

export default LazyImage;
