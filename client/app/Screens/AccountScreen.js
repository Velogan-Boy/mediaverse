import { View, Text,SafeAreaView,Button ,StyleSheet} from 'react-native'
import React from 'react';
import {auth} from "../Config/firebase";

//components
import { FormBtn } from '../Components/forms';

export default function AccountScreen({navigation}) {

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => Alert.alert(error.message));
 }


  return (
    <View>
      <SafeAreaView>
      <Text style={{marginTop:50}}>Account Screen</Text>

      <View style={styles.logout}>
      <FormBtn title="Log Out" onPress={handleLogout}/>
      </View>
    
      

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  logout: {
    margin:20
  }
})