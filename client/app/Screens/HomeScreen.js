import { View, Text ,Button,Alert} from 'react-native'
import React from 'react';
import {db,auth} from '../Config/firebase';


export default function HomeScreen({navigation}) {
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => Alert.alert(error.message));
 }
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="log out" onPress={handleLogout}/>
    </View>
  )
}