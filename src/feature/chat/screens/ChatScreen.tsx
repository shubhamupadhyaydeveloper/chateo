import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { screenWidth } from '../../../utils/responsive';
import { formatChatDate } from '../../../utils/dates';
import { navigate } from '../../../utils/navigationutils';
import { bouncyTransition } from '../../../utils/sharedTransition';

const { height, width } = Dimensions.get('window')

const ChatScreen = () => {
  const props = useRoute<RouteProp<stackNavigationType, 'ChatScreen'>>();
  const { name, userId, targetUserId, image } = props.params;
  const navigation = useNavigation()

  const [socketstate, setSocketState] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState<any>(null);

  const currentDate = formatChatDate(new Date())


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
    
    // if (socketstate) {
    //   console.log('this is trim messag', message)
    //   socketstate.emit('privateMessage', { room, message, senderId: userId });
    //   setMessages(prevMessages => [
    //     ...prevMessages,
    //     { message: message.trim(), senderId: userId },
    //   ]);

    //   setMessage('');
    // }
  }, []);

  const RenderChat = React.memo(({ item, index }: { item: any, index: number }) => {
    const isFirstMessage = index === 0;
    return (
      <View
        style={{
          alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
          marginVertical: 2,
        }}>
        <View className='flex flex-row gap-[5px] items-end justify-end' style={[
          styles.message,
          {
            backgroundColor:
              item.senderId === userId ? '#004E35' : '#152033',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderTopLeftRadius: item.senderId === userId ? 12 : 0,
            borderTopRightRadius: item.senderId === userId && isFirstMessage ? 0 : 12,
            padding: 8,
          },
        ]}>

          <Text
            className='text-white text-[15px]'
          >
            {item.message}
          </Text>
          <Text className='text-[10px] text-[#b9bfc4]  '>{currentDate.toString()}</Text>
        </View>
      </View>
    )
  })

  const handleProfile = useCallback(() => {
    navigate('ProfileDetail', {
      name,
      profileImage: image
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <View className="bg-[black] pb-[10px] px-[5px]  pt-5 flex flex-row justify-between items-center">
        <View className='flex flex-row items-center'>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcon
              name="arrow-back"
              color="white"
              size={25}
              className="mr-2"
            />
          </TouchableOpacity>

          <View className='flex flex-row items-center gap-[10px]'>
            <View>
              <Animated.Image sharedTransitionTag="sharedImagechat" sharedTransitionStyle={bouncyTransition} source={{ uri: image }} style={{ width: 40, height: 40 }} />
            </View>
            <TouchableOpacity activeOpacity={.85} onPress={handleProfile}>
              <View>
                <Text className='text-white text-[15px] font-medium'>{name}</Text>
                <Text className='text-[#82888C] text-[11px] font-medium'>10:12 AM</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex flex-row px-3 gap-[10px]'>
          <MaterialCommunityIcon name='phone-outline' color={"white"} size={25} />
          <MaterialCommunityIcon name='video-outline' color={"white"} size={25} />
        </View>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        inverted={true}
        data={messages}
        estimatedItemSize={100}
        ListHeaderComponent={() => <View style={{ height: height * 0.02 }} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <RenderChat index={index} item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
      />
      {/* </ImageBackground>  */}

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
