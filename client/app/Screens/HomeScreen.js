import { View, Text ,Button,Alert, SafeAreaView,Image,StyleSheet,Dimensions,ScrollView} from 'react-native'
import React from 'react';
import {db,auth} from '../Config/firebase';
import AppBar from '../Components/AppBar';
import CustomButton from '../Components/CustomButton';
import Post from '../Components/Post';


const {width,height} = Dimensions.get('window');


export default function HomeScreen({navigation}) {


  return (
    <View>
      <SafeAreaView>
      <AppBar
       onPress1={() => navigation.navigate("Chat")} 
       onPress2={() => {navigation.navigate("Map")}}
      />
      
    <ScrollView style={{marginBottom:150}}>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    </ScrollView>

    
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
   

})