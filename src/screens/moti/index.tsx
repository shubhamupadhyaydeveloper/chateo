import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');

const MotiAnimationScreen = () => {
    const [pressed, setPressed] = useState(false); // Default value is false

    const _trackHeight = 27;
    const _trackWeight = _trackHeight * 2;

    const handleClick = () => {
        console.log('clicked');
        setPressed(!pressed); // Toggle the pressed state
    };

    return (
        <Pressable onPress={handleClick} >
            <View style={styles.center}>
                {/* Background Track */}
                <MotiView
                    style={{
                        position: 'absolute',
                        width: _trackWeight,
                        height: _trackHeight,
                        borderRadius: _trackHeight / 2,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 300,
                        easing: Easing.inOut(Easing.ease),
                    }}
                    animate={{
                        backgroundColor: pressed ? 'skyblue' : 'gray',
                    }}
                />

                {/* Sliding Circle */}
                <MotiView
                    animate={{
                        translateX: pressed ? _trackWeight / 4 : -_trackWeight / 4,
                        width: pressed ? 5 : 15,
                        backgroundColor: pressed ? 'white' : 'black',
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400, // Higher stiffness for a faster spring
                        damping: 70,    // Lower damping for a bouncy effect, higher for smoother stopping
                        mass: .5,        // You can play with the mass for slight adjustments
                        overshootClamping: false, // Prevents overshooting if set to true,
                    }}
                    style={{
                        height: 15,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <MotiView
                        style={{
                            height: 20,
                            borderColor: 'black',
                            borderWidth: 3,
                            borderRadius: 15,
                        }}
                        animate={{
                            width: pressed ? 0 : 20,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 300,
                            easing: Easing.inOut(Easing.ease),
                        }}
                    /> */}
                </MotiView>
            </View>
        </Pressable>
    );
};

export default MotiAnimationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
});
