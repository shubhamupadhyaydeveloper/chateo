import io, { Socket } from 'socket.io-client';

import {
  mediaDevices,
  RTCPeerConnection,
  MediaStream,
} from 'react-native-webrtc';
import {useEffect, useRef, useState} from 'react';

export default function useWebRTC(socket:Socket | null) {
  // Stream of local user
  const [localStream, setlocalStream] = useState<MediaStream | null>(null);

  // When a call is connected, the video stream from the receiver is appended to this state in the stream
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  /* This creates an WebRTC Peer Connection, which will be used to set local/remote descriptions and offers. */
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }),
  );

  useEffect(() => {
       const startStream = async () => {
         const _stream = await mediaDevices.getUserMedia({
            video : {facingMode : 'user'},
            audio : true
         })

         setlocalStream(_stream)
         _stream.getTracks().forEach(track => peerConnection.current.addTrack(track,_stream))
       }

       socket?.on('join_room', () => startStream());
  },[socket])

  // peerConnection.current.ontrack = event => {
  //   const [remoteStream] = event.streams;

  //   if (remoteStream) {
  //     setRemoteStream(remoteStream);
  //   }
  // };

  return {localStream,peerConnection,remoteStream,setRemoteStream}
}
