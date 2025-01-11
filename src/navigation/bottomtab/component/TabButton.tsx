import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from '../../../utils/Icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TabBarButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const sharedWidth = useSharedValue(0);
    const sharedOpacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: sharedWidth.value,
            opacity: sharedOpacity.value,
        };
    });


    const handleAnimation = () => {
        if (focused) {
            sharedWidth.value = withSpring(65, {
                damping: 80,
                stiffness: 200,
            });
            sharedOpacity.value = withTiming(1, { duration: 230 });
        } else {
            sharedWidth.value = withSpring(20, {
                damping: 80,
                stiffness: 200,
            });
            sharedOpacity.value = withTiming(0, { duration: 150 });
        }
    };

    useEffect(() => {
        handleAnimation();
    }, [focused]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Animated.View
                    className="absolute rounded-full bg-[#003728]"
                    style={[{ height: 32, top: 10 }, animatedStyle]}
                />
                <View className="relative">
                    <Icon
                        type={item.type}
                        name={focused ? item.activeIcon : item.inActiveIcon}
                        color={focused ? '#CEFECE' : 'white'}
                        size={item.size}
                    />
                </View>
                <Text
                    style={[
                        styles.label,
                        {
                            color: "white",
                            fontWeight: focused ? '800' : '400',
                            marginTop: 7,
                        },
                    ]}
                >
                    {item.label}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.249,
        height: '100%',
    },
    label: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
});

export default TabBarButton;
