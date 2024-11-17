import { View, Text, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import React from 'react'

const OutgoingCallScreen = ({ otherUserId, setType }: { otherUserId: number | null, setType: any }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-around',
                backgroundColor: '#050A0E',
            }}>
            <View
                style={{
                    padding: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 14,
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        color: '#D0D4DD',
                    }}>
                    Calling to...
                </Text>

                <Text
                    style={{
                        fontSize: 36,
                        marginTop: 12,
                        color: '#ffff',
                        letterSpacing: 6,
                    }}>
                    {otherUserId}
                </Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setType('JOIN');
                        otherUserId = null;
                    }}
                    style={{
                        backgroundColor: '#FF5D5D',
                        borderRadius: 30,
                        height: 60,
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={{ width: 50, height: 50, backgroundColor: "red", borderRadius: 25 }}>

                        <IonIcon name='call' color={'white'} size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default OutgoingCallScreen;