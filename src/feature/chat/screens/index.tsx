import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import io from 'socket.io-client';
import { stackNavigationType } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderChats from '../components/RenderChats';
import ChatUserInfo from '../components/ChatUserInfo';

const { height, width } = Dimensions.get('window')

const ChatScreen = () => {
  const props = useRoute<RouteProp<stackNavigationType, 'ChatScreen'>>();
  const { name: userName, userId, targetUserId, image } = props.params;
  const navigation = useNavigation()

  const [socketstate, setSocketState] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    const socket = io('http://192.168.1.110:4000', {
      query: {
        userId,
      },
    });
    setSocketState(socket);
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    const roomName = [userId, targetUserId].sort().join('_');
    setRoom(roomName);
    socket.emit('joinRoom', { userId, targetUserId });

    // Listen for private messages
    socket.on('privateMessage', ({ message, senderId }) => {
      const trimMessage = message.trim()
      setMessages(prevMessages => [...prevMessages, { trimMessage, senderId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback(() => {

    setMessages(prevMessages => [
      ...prevMessages,
      { message: message.trim(), senderId: userId },
    ]);

    setMessage('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />

      <ChatUserInfo image={image} name={userName} />
      <RenderChats messages={messages} userId={userId} />

      <View style={{ marginTop: height * 0.01, marginBottom: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingHorizontal: 8,
            borderRadius: 8,
            width: width * 0.99,
            alignSelf: 'center',
            borderColor: 'black'
          }}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            autoCorrect
            collapsable
            removeClippedSubviews={false}
            // numberOfLines={6}
            multiline
            className='bg-[#1D272A] flex-1 color-white rounded-[20px] px-[15px]'
            placeholder="Message"
            placeholderTextColor="#ADB5BD"
            keyboardType="default"
            keyboardAppearance="dark"
          />
          <TouchableOpacity activeOpacity={0.85} onPress={sendMessage}>
            <View
              className='bg-[#00C357] py-[11px] px-[11px] rounded-full ml-2'
            >
              <Ionicons name={message.length >= 1 ? "send" : "mic"} color="black" size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
  },
  message: {
    padding: 7,
    // marginVertical: 5,
    borderRadius: 5,
    color: 'white'
  },
});

export default ChatScreen;
