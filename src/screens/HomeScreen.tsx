import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userData } from '../mock/users';
import { navigate } from '../utils/navigationutils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { stackNavigationType } from '../types/navigation';
import AntDesignIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
      <StatusBar backgroundColor={"#152033"} barStyle={"light-content"} />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
          paddingTop: height * 0.025,
          backgroundColor: '#152033',
          paddingBottom: height * .015
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
          }}>
          Chateo
        </Text>
        <View>
          <TouchableOpacity activeOpacity={0.75}>
            <AntDesignIcon name="search" color={'white'} size={23} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
        <View
          style={{
            backgroundColor: '#152033',
            flexDirection: 'row',
            alignItems: 'center', 
            paddingHorizontal: 8, 
            borderRadius: 8, 
          }}>
          <AntDesignIcon
            name="search1"
            color={'#ADB5BD'}
            size={23}
            style={{marginRight: 8}}
          />
          <TextInput
            style={{
              flex: 1, 
              paddingVertical: 8, 
              color: '#ADB5BD', 
            }}
            placeholder="Search"
            placeholderTextColor="#ADB5BD"
            keyboardType='default'
            keyboardAppearance='dark'
          />
        </View>
      </View> */}

      <View
        style={{
          width: '100%',
          display: 'flex',
          gap: 15,
          paddingHorizontal: 15,
          marginTop: height * 0.06,
        }}>
        {userData.map(item => {
          const isSame = item.userId !== userData[randomIndex].userId;
          return (
            isSame && (
              <TouchableOpacity
                key={item.userId}
                onPress={() =>
                  handleProfileClick(
                    item.userId,
                    item.name,
                    userData[randomIndex].userId,
                    `https://avatar.iran.liara.run/public/boy?username=${item.name}`
                  )
                }
                activeOpacity={0.75}>
                <View
                  key={item.userId}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',

                    gap: 20,
                  }}>
                  <View style={{ position: 'relative' }}>
                    <Image
                      style={{ width: width * 0.15, height: height * 0.075, }}
                      source={{
                        uri: `https://avatar.iran.liara.run/public/boy?username=${item.name}`,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        width: 15,
                        height: 15,
                        backgroundColor: '#2CC069',
                        borderRadius: 20
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: '#ADB5BD',
                        fontSize: 12,
                        fontWeight: '600',
                        marginTop: 3
                      }}>
                      online
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          );
        })}
      </View>


      <View
        style={{
          backgroundColor: '#2CC069',
          width: 50,
          height: 50,
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 0,
          position: 'absolute',
          bottom: height * .05,
          right: width * .05,
        }}>
        <TouchableOpacity activeOpacity={.85} onPress={() => navigate('AddContact')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', height: '100%' }}>
            <MaterialIcon name='person-add-alt-1' color={"white"} size={25} style={{ marginLeft: width * .01 }} />
          </View>
        </TouchableOpacity>

      </View>

      <TouchableWithoutFeedback onPress={() => navigate('Testing')}>
         <View style={{padding : 15 , borderRadius : 8,alignItems : 'center',justifyContent : 'center' ,backgroundColor : 'white'}}>
            <Text style={{color : 'black'}}>test stream</Text>
         </View>
      </TouchableWithoutFeedback>

    </SafeAreaView>
  );
};

export default HomeScreen;
