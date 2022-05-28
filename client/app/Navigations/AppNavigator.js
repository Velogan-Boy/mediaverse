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


import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import DiscussionNavigator from './DiscussionNavigator';


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
      options={({ navigation }) => ({
        tabBarButton: () => (
          <CustomButton
            size={28}
            type="users"
            style={{height:70,width:70}}
            onPress={() => navigation.navigate("Discussion")}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-search"
            color={color}
            size={size}
          />
        ),
      })}
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