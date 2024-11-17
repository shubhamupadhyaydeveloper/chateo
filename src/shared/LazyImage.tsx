import { View, Text, Image, ImageStyle } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

const LazyImage = ({
    image,
    width,
    height,
    style,
}: {
    image: string;
    width: number;
    height: number;
    style?: ImageStyle ;
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
                <View style={{alignSelf : 'center',justifyContent : 'center',height : '100%'}} >
                    <LottieView
                        source={require('../../assets/lottie/loader.json')}
                        style={{ width: 200, height: 100 }}
                        loop
                        autoPlay
                    />
                </View>
            )}
        </FastImage>
    );
};

export default LazyImage;
