import { io } from 'socket.io-client';

const URL = 'http://192.168.1.110:4000';

export const socket = io(URL,{
    autoConnect : false
})