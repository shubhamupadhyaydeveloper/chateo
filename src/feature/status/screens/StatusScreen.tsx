import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const StatusScreen = () => {
  return (
    <SafeAreaView className='h-full bg-black'>
      <Text className='text-white text-[15px] font-bold'>StatusScreen</Text>
    </SafeAreaView>
  )
}

export default StatusScreen;