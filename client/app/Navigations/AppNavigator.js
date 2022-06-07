//default React apis imports
import {Text ,Alert} from 'react-native'
import React from 'react'

//for navigations
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//initialization
const Tab = createBottomTabNavigator();

//for icons
import {FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons'

//color palette
import colors from '../Config/colors';

//my button component
import CustomButton from '../Components/CustomButton';

//required navigators

import AddPostScreen from '../Screens/AddPostScreen';
import ChatScreen from '../Screens/ChatScreen';
import TrendingScreen from '../Screens/TrendingScreen';

import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import DiscussionNavigator from './DiscussionNavigator';
import Chat from '../Screens/ChatDetailScreen';
import TrendingNavigator from './TrendingNavigator';


const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
      name="Home"
      component={HomeNavigator}
      options={{
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" color={color} size={size}/>
          ),
      }} 
      />
         <Tab.Screen 
      name="Discussion"
      component={DiscussionNavigator}
      options={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="comment-multiple" color={color} size={size}/>
          ),
      }} 
      />
      <Tab.Screen 
      name="Add Post"
      component={AddPostScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <CustomButton
            size={28}
            type="plus-circle"
            style={{height:70,width:70}}
            onPress={() => navigation.navigate("AddPost")}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}

      />
      
      <Tab.Screen 
      name="Trending"
      component={TrendingNavigator}
      options={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="rocket-launch" color={color} size={size}/>
          ),
      }} 
      /> 

      <Tab.Screen 
      name="Account"
      component={AccountNavigator}
      options={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="account" color={color} size={size}/>
          ),
      }} 
      />

    </Tab.Navigator>
  )
};

export default AppNavigator;