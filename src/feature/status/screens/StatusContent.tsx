import { View, Text, TouchableOpacity, Image, ImageBackground, InteractionManager, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ProgressLine from '../component/ProgressLine';
import { stackNavigationType } from '../../../types/navigation';
import { statusData } from '../../../mock/mock';
import { screenHeight, screenWidth } from '../../../utils/responsive';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import CustomLiked from '../../../../storybook/stories/CustomLiked/CustomLiked';

const StatusContent = () => {
  const route = useRoute<RouteProp<stackNavigationType, 'StatusContent'>>();
  const { index } = route.params;
  const navigation = useNavigation();
  const [currentImageIndex, SetCurrentImageIndex] = useState(0);
  const currentContent = statusData[index];
  const [topVisible, SetTopVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [input, SetInput] = useState('');
  const textInputRef = useRef<TextInput | null>(null);

  const handleReplyInput = () => {
    setModalVisible(true);
    InteractionManager.runAfterInteractions(() => {
      if (textInputRef.current) {
        textInputRef.current.focus(); // Focus the input after interactions
      }
    });

  };

  const closeReplyModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    //  InteractionManager.addListener('')
    if (textInputRef.current) {
      textInputRef.current.focus(); // Focus the input after interactions
      console.log('modal open');
    }

  }, [modalVisible]);

  // Tap gesture
  const TapGesture = Gesture.Tap().onEnd((e) => {
    const { x, y } = e;

    if (x < Math.floor(screenWidth / 2)) {
      SetCurrentImageIndex(prev => Math.max(prev - 1, 0));
    } else {
      SetCurrentImageIndex(prev => Math.min(prev + 1, currentContent.statusContent.length - 1));
    }
  })
    .runOnJS(true);

  const LongPressGesture = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      SetTopVisible(false);
    })
    .onEnd(() => {
      SetTopVisible(true);
    })
    .runOnJS(true);

  const combinedGesture = Gesture.Exclusive(TapGesture, LongPressGesture);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={combinedGesture} >
        <SafeAreaView style={{ height: screenHeight * .9 }}>

          {topVisible && (
            <View>
              {/* progress line */}
              <View
                className="items-center justify-center self-center z-[10]"
                style={{ marginBottom: 10, marginTop: 5 }}
              >
                <ProgressLine
                  // SetCurrentIndex={SetCurrentImageIndex}
                  length={currentContent.statusContent.length}
                />
              </View>

              {/* Top Navigation */}
              <View className="z-[10]" style={{ position: 'absolute', top: 0, width: '100%', marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.86}>
                  <View className="px-[10px] mt-[5px] flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center">
                      <AntDesignIcon
                        name="arrowleft"
                        color={'white'}
                        size={25}
                        style={{ width: 30 }}
                      />

                      <Image
                        source={{ uri: currentContent.profileImage }}
                        style={{
                          width: 40,
                          height: 40,
                          marginLeft: 5,
                          marginRight: 15,
                          borderColor: 'white',
                          borderWidth: 1.2,
                          borderRadius: 20,
                        }}
                      />
                      <View>
                        <Text className="text-white text-[15px] font-bold">
                          {currentContent.user}
                        </Text>
                        <Text className="text-customwhite text-[10px]">
                          Yesterday 3:34 PM
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.75}>
                      <EntypoIcon name="dots-three-vertical" color={'white'} size={18} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>

              {/* reply input */}

              <View
                className="flex flex-row justify-between items-center w-full  "
                style={{
                  zIndex: 10,
                  top: screenHeight * .89,
                  left: 0,
                  right: 0,
                  padding: 10,
                  backgroundColor: 'black',
                }}
              >
                <TouchableWithoutFeedback onPress={handleReplyInput}>
                  <View className='h-[45px] bg-[#1D272A] rounded-full justify-center px-[13px]' style={{ width: screenWidth * .8 }}>
                    <Text className='text-white text-[15px] '>
                      Reply
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                <View className="w-[45px] h-[45px] rounded-full bg-[#1D272A] flex items-center justify-center">
                  <CustomLiked />
                </View>

              </View>

              <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeReplyModal}
              >
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                  activeOpacity={1}
                  onPress={closeReplyModal}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{
                      position: 'absolute',
                      top: screenHeight * .5,
                      left: 0,
                      right: 0,

                      padding: 10,
                    }}
                  >
                    <TextInput
                      ref={textInputRef}
                      autoFocus
                      placeholder="Type your reply..."
                      placeholderTextColor="white"
                      value={input}
                      onChangeText={SetInput}
                      style={{
                        backgroundColor: '#2F3E42',
                        color: 'white',
                        padding: 8,
                        borderRadius: 25,
                        paddingHorizontal: 15,
                      }}
                    />
                  </KeyboardAvoidingView>
                </TouchableOpacity>
              </Modal>
            </View>

          )}

          {/* Image Content */}
          <View
            style={{
              width: screenWidth,
              height: screenHeight * .9,
              top: screenHeight * .055,
            }}
            className="absolute items-center justify-center"
          >
            <Image
              source={{ uri: currentContent.statusContent[currentImageIndex] }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default StatusContent;
