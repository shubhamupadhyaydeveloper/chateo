import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import { screenHeight } from '../utils/responsive';


type props = {
    title?: string
}

const CustomLiked = ({ title }: props) => {
    const [pressed, setPressed] = useState(false);
    const scaleShared = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleShared.value }],
        };
    });

    const handleOnPress = () => {
        setPressed(prev => !prev);
        {
            pressed === false &&
                (scaleShared.value = withSequence(
                    withSpring(.8,{damping : 15,stiffness : 200}),
                    withSpring(1.2, { damping: 15, stiffness: 200 }),
                    withSpring(1, { damping: 15, stiffness: 200 }),
                ));
        }
    };
    return (
        <View>
            <TouchableWithoutFeedback onPress={handleOnPress}>
                <View style={{ gap: screenHeight * .01 }} className="flex flex-row items-center">
                    <Animated.View style={[animatedStyle]}>
                        <IonIcons
                            name={pressed ? 'heart' : 'heart-outline'}
                            color={pressed ? '#00AA82' : 'white'}
                            size={25}
                        />
                    </Animated.View>
                    {title && (
                        <Text className="text-[18px] font-400 text-white">
                            {title}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default CustomLiked;
