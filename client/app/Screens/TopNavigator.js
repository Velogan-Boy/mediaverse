import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import HomeScreen from './HomeScreen'
import TrendingPostScreen from './TrendingPostScreen'
import HomeNavigator from '../Navigations/HomeNavigator'


export default function TopNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Trending" component={TrendingPostScreen} />
    </Tab.Navigator>
  )
}