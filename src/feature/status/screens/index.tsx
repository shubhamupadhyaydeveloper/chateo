import { View, Text, TouchableOpacity, ImageBackground, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenHeight, screenWidth } from '../../../utils/responsive';
import { navigate } from '../../../utils/navigationutils';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import CustomHeader from '../../../../storybook/stories/CustomHeader/CustomHeader';
import { statusData } from '../../../mock/mock';
import { FlashList } from '@shopify/flash-list';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Svg, { Circle, Rect, Polygon, Line, Path } from 'react-native-svg';
import StatusCircle from '../component/StatusCircle';

const StatusScreen = () => {
  const sharedCreateBottom = useSharedValue(screenHeight * 0.2);
  const isFocused = useIsFocused();

  const createAnimationStyle = useAnimatedStyle(() => {
    return {
      bottom: sharedCreateBottom.value,
    };
  });

  useEffect(() => {
    if (isFocused) {
      sharedCreateBottom.value = withTiming(screenHeight * 0.25, { duration: 200 });
    } else {
      sharedCreateBottom.value = withTiming(screenHeight * .2, { duration: 50 });
    }
  }, [isFocused]);

  const handleNavigate = useCallback((index:number) => {
    navigate('StatusContent', { index: index })
  }, [])

  const RenderStatusItem = React.memo(({ item,index }: { item: any , index:number}) => (
    <TouchableWithoutFeedback onPress={() => handleNavigate(index)}>
      <View style={{ height: screenHeight * .23, width: 100 }} className='overflow-hidden rounded-[12px]' >
        <ImageBackground source={{ uri: item.statusContent[0] as string }} className='h-full w-full ' >
          <View className='p-2 h-full justify-between flex'>
            <View style={{ width: 40, height: 40 }} >
              <StatusCircle length={item.length} profileImage={item.profileImage} />
            </View>
            <Text className='text-white text-[11px] font-bold '>{item.user}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  ))

  const RenderHeader = React.memo(() => (
    <View style={{ height: screenHeight * .23, width: 100, marginRight: 6 }} className='overflow-hidden rounded-[10px]' >
      <View className='h-full w-full bg-[#3C474F]' >
        <View className='p-2 h-full justify-between flex'>
          <View style={{ width: 50, height: 50 }}>
            <Image source={{ uri: `https://avatar.iran.liara.run/public/boy?username=kishore` }} style={{ width: 35, height: 35 }} />
            <View className='w-[20px] h-[20px] border-black border-[1px] bg-primarygreen items-center justify-center rounded-full absolute bottom-[10px] right-[10px]'>
              <AntDesignIcon name='plus' color={"black"} size={15} style={{ textAlign: "center" }} />
            </View>
          </View>
          <Text className='text-white text-[11px] font-bold '>Add Status</Text>
        </View>
      </View>
    </View>
  ))

  const RenderGap = useCallback(() => (
    <View style={{ width: 6 }} />
  ), [])




  return (
    <SafeAreaView className="h-full bg-black">
      <View className='px-[15px]'>
        <CustomHeader title='Updates' />
      </View>

      <View className='px-[15px]'>
        <View style={{ marginTop: screenHeight * .02, marginBottom: screenHeight * .02 }}>
          <Text className='text-white font-medium text-[17px] px-[15px ]'>Status</Text>
        </View>
        <FlashList
          data={statusData}
          ItemSeparatorComponent={RenderGap}
          ListHeaderComponent={RenderHeader}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          estimatedItemSize={100}
          renderItem={(({ item,index }) => (
            <RenderStatusItem item={item} index={index} />
          ))}
        />
      </View>

      <Animated.View
        className='bg-[#363b3c]'
        style={[
          {
            position: 'absolute',
            right: screenWidth * 0.095,
            width: 36,
            height: 36,
            borderRadius: 8
          },
          createAnimationStyle,
        ]}
      >
        <TouchableOpacity activeOpacity={0.85}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <MaterialIcon name="edit" color="white" size={24} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          right: screenWidth * 0.07,
          width: 53,
          height: 53,
          backgroundColor: '#09af1e',
          bottom: screenHeight * 0.145,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
        // onPress={() => navigate('AddContact')}
        >
          <MaterialIcon name="photo-camera" color="black" size={28} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StatusScreen;
