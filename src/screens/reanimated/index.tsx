import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeInUp, FadeOutLeft, FadeOutUp, LinearTransition, SlideInLeft, SlideOutLeft } from 'react-native-reanimated'

const _spacing = 8
const _buttonHeight = 42

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const AnimatedButton = ({ children, style, ...rest }: AnimatedProps<PressableProps>) => {
    return (
        <AnimatedPressable
            style={[style, {
                height: _buttonHeight,
                borderRadius: _buttonHeight / 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: _spacing * 2
            }]}

            {...rest}

        >
            {children}
        </AnimatedPressable>
    )
}
const ReanimatedScreen = () => {
    const [index, setIndex] = useState(1)
    const maximum = 5
    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 20 }}>{index}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: _spacing }}>
                {index > 1 && (
                    <AnimatedButton
                        style={{ backgroundColor: '#d2d2d2', }}
                        onPress={() => setIndex(prev => Math.max(0, prev - 1))}
                        entering={SlideInLeft.springify().damping(80).stiffness(300).mass(.8)}
                        exiting={SlideOutLeft.springify().damping(80).stiffness(300).mass(.8)}
                    >
                        <Text style={{ color: 'black' }}>Go back</Text>
                    </AnimatedButton>
                )}
                <AnimatedButton
                    style={{ backgroundColor: '#155E95', flex: 1 }}
                    onPress={() => setIndex(prev => Math.min(maximum, prev + 1))}
                    layout={LinearTransition.springify().damping(80).stiffness(200)}
                >
                    {index === maximum ? (
                        <Animated.Text
                            key='finish'
                            style={{ fontSize: 16, color: 'white' }}
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                        >
                            Finish
                        </Animated.Text>
                    ) : (
                        <Animated.Text
                            key='continue'
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                            layout={LinearTransition.springify().damping(80).stiffness(200)}
                            style={{ fontSize: 16, color: 'white' }}
                        >
                            Contiue
                        </Animated.Text>
                    )}

                </AnimatedButton>
            </View>
        </View>
    )
}

export default ReanimatedScreen;

const styles = StyleSheet.create({})