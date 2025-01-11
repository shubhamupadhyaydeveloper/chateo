import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const StatusCircle = ({ profileImage, length }: { profileImage: string; length: number }) => {
    const radius = 20;
    const strokeWidth = 2.5; 
    const circumference = 2 * Math.PI * radius; 
    const gapSize = 4; 
    const segmentCount = length;
    const segmentLength = segmentCount > 1 ? (circumference - segmentCount * gapSize) / segmentCount : circumference;
    const statusContent = Array.from({ length: segmentCount }, (_, index) => index);

    return (
        <View style={styles.container}>
    
            <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
                {segmentCount === 1 ? (
                 
                    <Circle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        stroke={'#09af1e'} 
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                ) : (
                 
                    statusContent.map((_, index) => (
                        <Circle
                            key={index}
                            cx={radius + strokeWidth / 2}
                            cy={radius + strokeWidth / 2}
                            r={radius}
                            stroke={'#09af1e'} 
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${segmentLength} ${gapSize}`}
                            strokeDashoffset={-(segmentLength + gapSize) * index}
                            fill="none"
                        />
                    ))
                )}
            </Svg>

   
            <View style={styles.imageContainer}>
                <Image source={{ uri: profileImage }} style={styles.image} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40, 
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        position: 'absolute',
        width: 34, 
        height: 34,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default StatusCircle;
