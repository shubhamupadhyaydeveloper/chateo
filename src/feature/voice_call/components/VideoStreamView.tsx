import React from 'react';
import { MediaStream, RTCView } from 'react-native-webrtc';

interface VideoStreamViewProps {
    stream: MediaStream | null;
    remoteStream: MediaStream | null;
}

const VideoStreamView: React.FC<VideoStreamViewProps> = ({
    stream,
    remoteStream,
}) => {
    return (
        <>
            {!remoteStream && stream && (
                <RTCView
                    style={{ flex: 1 }}
                    streamURL={stream?.toURL()}
                    objectFit={'cover'}
                    mirror={true}
                />
            )}
            {remoteStream && (
                <>
                    <RTCView
                        streamURL={remoteStream?.toURL()}
                        style={{ flex: 1 }}
                        objectFit={'cover'}
                        mirror={true}
                    />
                    {stream && (
                        <RTCView
                            streamURL={stream?.toURL()}
                            style={{
                                height: 150,
                                width: 100,
                                position: 'absolute',
                                top: 20,
                                right: 20,
                            }}
                            objectFit="cover"
                            mirror={true}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default VideoStreamView;