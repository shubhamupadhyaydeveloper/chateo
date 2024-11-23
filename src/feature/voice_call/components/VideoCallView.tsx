import io, { Socket } from 'socket.io-client';

import {
  mediaDevices,
  RTCPeerConnection,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
  RTCView,
} from 'react-native-webrtc';
import { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, ScrollView, Text, TextInput, View } from 'react-native';
import VideoStreamView from './VideoStreamView';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window')

export default function VideoCallView() {
  const [currentUserId, setCurrentUserId] = useState<string>(Math.floor(Math.random() * 900000 + 100000).toString());

  const [targetUserId, setTargetUserId] = useState('')


  const [incomingCall, setIncomingCall] = useState<{ callerId: any, rtcMessage: any }>({ callerId: null, rtcMessage: null }); // Stores incoming call data

  // Stream of local user
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // When a call is connected, the video stream from the receiver is appended to this state in the stream
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);

  const peerConnection = useRef<RTCPeerConnection>()

  // socket connection
  useEffect(() => {
    const _socket = io('http://192.168.1.110:4000', {
      query: {
        callerId: currentUserId
      }
    });

    socket?.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    setSocket(_socket);


    return () => {
      _socket.disconnect();
    };
  }, []);

  /* This creates an WebRTC Peer Connection, which will be used to set local/remote descriptions and offers. */

  useEffect(() => {

    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    });

    startStream();

    socket?.on('incoming_call', handleIncomingCall);
    socket?.on("call_accepted", handleCallAccepted);
    socket?.on('ice_candidate', handleIceCandidate);

    return () => {
      peerConnection.current?.close();
      socket?.off('incoming_call', handleIncomingCall);
      socket?.off('ice_candidate', handleIceCandidate);
      socket?.off("call_accepted", handleCallAccepted);
    };
  }, [socket]);

  const startStream = async () => {
    try {
      const _stream = await mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });

      setLocalStream(_stream);

      _stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, _stream);
      });
    } catch (error) {
      console.error('Error starting local stream:', error);
    }
  };

  if (peerConnection && peerConnection.current) {
    // @ts-ignore
    peerConnection.current.ontrack = (event: any) => {
      const [remoteStream] = event.streams;
      console.log("Received Remote Stream:", remoteStream);
      if (remoteStream) {
        setRemoteStream(remoteStream);
      }
    };
  }

  const processCall = async () => {
    if (!peerConnection.current) {
      console.log('PeerConnection not initialized');
      return; // Avoid making a call if peerConnection is not initialized
    }

    try {
      const sessionDescription = await peerConnection.current?.createOffer({});
      await peerConnection.current?.setLocalDescription(sessionDescription);


      socket?.emit("call", {
        calleeId: targetUserId,
        rtcMessage: sessionDescription,
      });
    } catch (error) {
      console.log('Error in process call', error);
    }
  };



  const handleIncomingCall = async ({ callerId, rtcMessage }: { callerId: string, rtcMessage: any }) => {
    console.log('a call is coming ', callerId)
    setIncomingCall({ callerId, rtcMessage })
  };


  const processAccept = async () => {
    if (!peerConnection.current) {
      console.log('PeerConnection not initialized');
      return;
    }

    const description = new RTCSessionDescription(incomingCall.rtcMessage);
    await peerConnection.current.setRemoteDescription(description);

    const sessionDescription = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(sessionDescription);
    answer_call({
      callerId: incomingCall.callerId,
      rtcMessage: sessionDescription,
    });
  };

  const answer_call = (data: any) => {
    socket?.emit('answer_call', data)
  }

  const handleCallAccepted = async ({ calleeId, rtcMessage }: { calleeId: any, rtcMessage: any }) => {
    console.log('call accepted by', calleeId)
    console.log('call accepted by', calleeId)
    console.log('call accepted by', calleeId)
    console.log('call accepted by', calleeId)
    console.log('call accepted by', calleeId)
    if (!peerConnection.current || !incomingCall) return;

    console.log("Call accepted by:", calleeId);
    const remoteDesc = new RTCSessionDescription(rtcMessage);
    await peerConnection.current.setRemoteDescription(remoteDesc);
  };

  if (peerConnection && peerConnection.current) {
    // @ts-ignore
    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        socket?.emit('ice_candidate', {
          targetId: incomingCall.callerId,
          rtcMessage: event.candidate,
        });
      }
    };
  }

  const handleIceCandidate = async ({ rtcMessage }: { rtcMessage: any }) => {
    const candidate = new RTCIceCandidate(rtcMessage);
    await peerConnection.current?.addIceCandidate(candidate);
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close(); // Close the peer connection
    }
    setLocalStream(null);
    setRemoteStream(null);
    socket?.emit('call_ended', { targetId: targetUserId });
  };


  console.log('Local Stream:', localStream);
  console.log('Remote Stream:', remoteStream);


  return (
    <SafeAreaView style={{flex: 1,backgroundColor : "black"}}>
  
       {localStream && remoteStream ? (
          <VideoStreamView remoteStream={remoteStream} stream={localStream}/>
       ) : (
        <View style={{ justifyContent: 'flex-end', padding: 10, marginTop: height * .1 }}>
          <Text style={{ color: 'white' }}>your Id {currentUserId.toString()}</Text>
          <TextInput value={targetUserId} onChangeText={setTargetUserId} style={{ color: "white", borderWidth: 1, borderColor: 'white', borderRadius: 8 }} placeholder='enterTargeId' placeholderTextColor={"white"} />
          <Button title="Call" onPress={processCall} />
          {incomingCall.callerId && (
            <View style={{ marginTop: 20, padding: 10, backgroundColor: 'lightgrey' }}>
              <Text>Incoming Call from {incomingCall.callerId}</Text>
              <Button title="Accept Call" onPress={processAccept} />
              <Button title="Reject Call" onPress={endCall} color="red" />
            </View>
          )}
        </View>
       )}
    </SafeAreaView>
  )
}
