import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from "react-native-vector-icons/Entypo"

const {width,height} = Dimensions.get('window')
const CustomHeader = ({ title, onModalOpen }: { title?: string, onModalOpen?:() => void}) => {
  return (
      <View
          style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            //   paddingHorizontal: 15,
              alignItems: 'center',
              paddingTop: height * 0.025,
              backgroundColor: 'black',
              paddingBottom: height * .015
          }}>
          <Text
              style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: title ? "500" : '900',
              }}>
              {title ? title : "Chateo"}
          </Text>
          <View className='flex flex-row gap-[10px] items-center'>
              <TouchableOpacity activeOpacity={0.75}>
                  <AntDesignIcon name="camera-outline" color={'white'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.75} onPress={onModalOpen}>
                  <EntypoIcon name="dots-three-vertical" color={'white'} size={18} />
              </TouchableOpacity>
          </View>
      </View>

  )
}

export default CustomHeader;