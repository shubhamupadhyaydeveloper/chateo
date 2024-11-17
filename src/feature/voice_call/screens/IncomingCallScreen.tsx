import { View, Text, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import React from 'react'

const IncomingCallScreen = ({ otherUserId, setType }: { otherUserId: number, setType: any }) => {
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
                        fontSize: 36,
                        marginTop: 12,
                        color: '#ffff',
                    }}>
                    {otherUserId} is calling..
                </Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setType('WEBRTC_ROOM');
                    }}
                    style={{
                        backgroundColor: 'green',
                        borderRadius: 30,
                        height: 60,
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={{ width: 50, height: 50, backgroundColor: "green", borderRadius: 25 }}>

                        <IonIcon name='call' color={'white'} size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default IncomingCallScreen;