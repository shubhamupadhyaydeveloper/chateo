import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { screenWidth } from '../../../../utils/responsive';

const ProgressLine = ({ length }: { length: number }) => {
    const height = 2;
    const borderRadius = 1;
    const lineContent = Array.from({ length: length }, (_, index) => index);
    const lineWidth = Math.floor(screenWidth / length);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const segmentWidths = lineContent.map(() => useSharedValue(0));

    useEffect(() => {
        const animateSegments = async () => {
            for (let i = 0; i < segmentWidths.length; i++) {
                // SetCurrentIndex(i)

                await new Promise((resolve) => {
                    segmentWidths[i].value = withTiming(lineWidth, { duration: 5000 }, () => {
                        runOnJS(resolve)(null);
                    });
                });
            }
        };

        animateSegments();
    }, []);

    return (
        <View style={{ width: screenWidth, flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'center', display: 'flex' }}>
            {lineContent.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => ({
                    width: segmentWidths[index].value,
                }));
                return (
                    <View key={index} style={[styles.segmentContainer, { width: lineWidth }]}>
                        <View style={styles.backgroundBar}>
                            <Svg height={height} width={lineWidth}>
                                <Rect
                                    x="0"
                                    y="0"
                                    width={lineWidth}
                                    height={height}
                                    rx={borderRadius}
                                    ry={borderRadius}
                                    fill="#3C474F"
                                />
                            </Svg>
                        </View>
                        <Animated.View style={[styles.foregroundBar, animatedStyle]} />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    segmentContainer: {
        height: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundBar: {
        position: 'absolute',
        width: '100%',
    },
    foregroundBar: {
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
        position: 'absolute',
    },
});

export default ProgressLine;
