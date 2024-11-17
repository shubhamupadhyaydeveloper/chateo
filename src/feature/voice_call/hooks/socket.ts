import { useEffect, useState } from "react"
import { Socket ,io } from "socket.io-client"

type prop = {
  handleNewCall: (data: any) => void;
  handleAnswerCall: (data: any) => void;
  handleIceCandidate : (data:any) => void;
};

export const useSocketConnection = ({handleNewCall,handleAnswerCall,handleIceCandidate}:prop) => {
    const [socket,setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const _socket = io('http://192.168.1.110:4000');
        setSocket(_socket)

        return () => {
            _socket.disconnect()
        }
    },[])

    useEffect(() => {
        if(socket) {
            socket?.on('user_joined', handleNewCall);
            socket?.on('answer_call', handleAnswerCall);
            socket?.on('ice_candidate', handleIceCandidate);
        }

        return () => {
             socket?.off('user_joined');
             socket?.off('answer_call');
             socket?.off('ice_candidate');
        }
    },[])
}