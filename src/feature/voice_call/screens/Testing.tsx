import React, { useState } from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client'


const Testing = () => {
    const [stream, setStream] = useState<any>(null);
    const socket = io('http://192.168.1.110:4000')
    const start = async () => {
       
        if (!stream) {
            try {
                const s = await mediaDevices.getUserMedia({ video: true,audio : true });
                 console.log('this is stream',s)
                setStream(s);
            } catch (e) {
                console.error(e);
            }
        }
    };
    const stop = () => {
        console.log('stop');
        if (stream) {
            stream.release();
            setStream(null);
        }
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.body}>
                {
                    stream &&
                    <RTCView
                        streamURL={stream.toURL()}
                        style={styles.stream} />
                }
                <View
                    style={styles.footer}>
                    <Button
                        title="Start"
                        onPress={start} />
                    <Button
                        title="Stop"
                        onPress={stop} />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
        ...StyleSheet.absoluteFillObject
    },
    stream: {
        flex: 1
    },
    footer: {
        display : 'flex',
        gap : 10,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    },
});

export default Testing;