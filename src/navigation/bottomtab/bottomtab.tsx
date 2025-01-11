import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { BottomTabNavigation } from '../../types/navigation';
import { tabNavigtionData } from '../../mock/mock';
import TabBarButton from './component/TabButton';

const BottomTabStack = () => {

  const Tab = createBottomTabNavigator<BottomTabNavigation>()
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, animation: 'none', tabBarStyle: {
        zIndex: 5,
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: 'black',
        height: 75
      },
      tabBarIconStyle: {
        marginTop: 10,
      },
    }}>
      {
        tabNavigtionData.map((item,index) => (
           <Tab.Screen name={item.route} component={item.component} key={index} 
             options={{
              tabBarShowLabel : false,
              tabBarButton : (props) => <TabBarButton {...props} item={item}/>
             }}
           />
        ))
      }
    </Tab.Navigator>
  )
}

export default BottomTabStack;