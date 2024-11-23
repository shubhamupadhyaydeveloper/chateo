import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userData } from '../../mock/users';
import { navigate } from '../../utils/navigationutils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { stackNavigationType } from '../../types/navigation';
import AntDesignIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import UserRenderHomepage from './component/User';
import { screenHeight, screenWidth } from '../../utils/responsive';
import CustomHeader from '../../shared/CustomHeader';
import Animated, { SlideInDown, SlideInUp, SlideOutDown } from 'react-native-reanimated';

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

  return (

    <SafeAreaView style={{ backgroundColor: 'black', height, width }}>
      <StatusBar backgroundColor={"#1a1e26"} barStyle={"light-content"} />
      <CustomHeader />
      <View
        style={{
          width: '100%',
          display: 'flex',
          gap: 15,
          paddingHorizontal: 15,
          marginTop: height * 0.06,
        }}>
        <FlatList
          data={userData}
          ItemSeparatorComponent={() => <View style={{ height: screenHeight * .02 }} />}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={10}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <UserRenderHomepage item={item} handleProfileClick={handleProfileClick} randomIndex={randomIndex} />
          )}
        />
      </View>

      <View style={{ alignSelf: 'center', width: width * .6, marginTop: screenHeight * .2 }}>
        <TouchableWithoutFeedback onPress={() => navigate('VideoCallScreen')}>
          <View style={{ padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Text style={{ color: 'black' }}>test stream</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>


      <View className='absolute' style={{  right: screenWidth * .1, width: 53, height: 53, backgroundColor: "#09af1e" , bottom : screenHeight * .15,borderRadius : 15 }}>
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
