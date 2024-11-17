import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import io from 'socket.io-client';
import { stackNavigationType } from '../../../types/navigation'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Animated, { SlideInLeft } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window')

const ChatScreen = () => {
  const props = useRoute<RouteProp<stackNavigationType, 'ChatScreen'>>();
  const { name, userId, targetUserId, image } = props.params;
  const [socketstate, setSocketState] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState<any>(null);
  const navigation = useNavigation()

  useEffect(() => {
    const socket = io('http://192.168.1.110:4000', {
      query: {
        userId,
        callerId: 1234
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
      setMessages(prevMessages => [...prevMessages, { message, senderId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketstate) {
      socketstate.emit('privateMessage', { room, message, senderId: userId });
      setMessages(prevMessages => [
        ...prevMessages,
        { message, senderId: userId },
      ]);

      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={"#152033"} barStyle={"light-content"}/>
      <View style={{ backgroundColor: '#152033', paddingHorizontal: 20, paddingTop : height * .02, }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="arrow-back"
              color={'white'}
              size={25}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <View style={{ marginRight: 6 }}>
            <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
          </View>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '400' }}>
            {name[0].toUpperCase()}
            {name.slice(1)}
          </Text>
        </View>
      </View>

     <ImageBackground
        source={require('../../assets/images/chatbg.jpg')}
        style={{flex : 1}}
      >

      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        ListHeaderComponent={() => <View style={{ height: height * 0.02 }} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
              marginVertical: 5,
              paddingHorizontal: 20
            }}>
            <Text
              style={[
                styles.message,
                {
                  backgroundColor:
                    item.senderId === userId ? 'green' : '#152033',
                  width: width * 0.4,
                  borderBottomLeftRadius: 13,
                  borderBottomRightRadius: 13,
                  borderTopLeftRadius: item.senderId === userId ? 13 : 0,
                  borderTopRightRadius: item.senderId !== userId ? 13 : 0,
                  padding: 8,
                },
              ]}>
              {item.message}
            </Text>
          </View>
        )}
      />
     </ImageBackground>

      <View style={{ marginTop: height * 0.01,marginBottom : 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingHorizontal: 8,
            borderRadius: 8,
            width: width * 0.95,
            alignSelf: 'center',
          }}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            style={{
              backgroundColor: '#152033',
              minHeight: 50,
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              color: '#ADB5BD',
              borderRadius: 20,
            }}
            placeholder="Type a message..."
            placeholderTextColor="#ADB5BD"
            keyboardType="default"
            keyboardAppearance="dark"
          />
          <TouchableOpacity activeOpacity={0.85} onPress={sendMessage}>
            <View
              style={{
                backgroundColor: '#2CC069',
                padding: 14,
                borderRadius: 20,
                marginLeft: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon name="send" color="white" size={20} />
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
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: 'white'
  },
});

export default ChatScreen;
