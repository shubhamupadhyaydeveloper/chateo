import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/Ionicons';

const {width,height} = Dimensions.get('window')
const CustomHeader = () => {
  return (
      <View
          style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              alignItems: 'center',
              paddingTop: height * 0.025,
              backgroundColor: '#1a1e26',
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

  )
}

export default CustomHeader;