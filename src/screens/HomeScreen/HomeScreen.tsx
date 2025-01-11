import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userData } from '../../mock/users';
import { navigate } from '../../utils/navigationutils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { stackNavigationType } from '../../types/navigation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import UserRenderHomepage from './component/User';
import { screenHeight, screenWidth } from '../../utils/responsive';
import { FlashList } from '@shopify/flash-list';
import HomepageHeader, { HompageSearchComponent } from './component/HomepageHeader';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<stackNavigationType>>();
  const randomIndex = Math.floor(Math.random() * 3);

  const handleProfileClick = (
    userId: number,
    name: string,
    targetUserId: number,
    image: string
  ) => {
    navigation.navigate('ChatScreen', { userId, name, targetUserId, image });
  };

  const RenderFooterComponent = useCallback(() => {
    return (
      <View style={{ height: screenHeight * .28 }} >
         <View className='flex flex-row items-center justify-center'>

        <AntDesignIcon name='lock' color={"white"} size={22} style={{width : 40}}/>
        <View style={{width : screenWidth * .67}}>

        <Text className='text-white text-[11px]'>Your personal Messages are <Text className='text-primarygreen'>end-to-end encrypted</Text></Text>
        </View>
         </View>
      </View>
    )
  },[])

  return (

    <SafeAreaView style={{ backgroundColor: 'black', height, width }}>
      <HomepageHeader />
      <FlashList
        ListFooterComponent={RenderFooterComponent}
        ListHeaderComponent={HompageSearchComponent}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        showsVerticalScrollIndicator={false}
        data={userData}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        estimatedItemSize={80}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
            <UserRenderHomepage index={index} contentLength={userData.length} item={item} handleProfileClick={handleProfileClick} randomIndex={randomIndex} />
        )}
      />
      <View className='absolute' style={{ right: screenWidth * .07, width: 53, height: 53, backgroundColor: "#00AA82", bottom: screenHeight * .15, borderRadius: 15 }}>
        <TouchableOpacity activeOpacity={.85} onPress={() => navigate('AddContact')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', height: '100%' }}>
            <MaterialIcon name='person-add-alt-1' color={"black"} size={28} style={{ marginLeft: width * .01 }} />
          </View>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

export default HomeScreen;
