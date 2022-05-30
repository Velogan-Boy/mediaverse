import { View, Text ,Button,Alert, SafeAreaView,Image,StyleSheet,Dimensions,ScrollView} from 'react-native'
import React, { useEffect } from 'react';
import {db,auth} from '../Config/firebase';
import AppBar from '../Components/AppBar';
import CustomButton from '../Components/CustomButton';
import Post from '../Components/Post';

import OfflineStatus from '../Components/OfflineStatus';


const {width,height} = Dimensions.get('window');


export default function HomeScreen({navigation,route}) {

  // const data = route.params;

  const userId = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  const name = auth.currentUser?.displayName;



  return (
    <View>
      <OfflineStatus/>
      <SafeAreaView>
      <AppBar
       onPress1={() => navigation.navigate("Chat")} 
       onPress2={() => {navigation.navigate("Map")}}
      />

      {/* <TopNavigator/> */}

      {/* <View style={styles.btnGrp}>
      
      <FormBtn title="Add Post" onPress={() => navigation.navigate("AddPost")}/>
      </View> */}
      
      
      
    <ScrollView style={{marginBottom:150}}>
      
    <Post  navigation={navigation}/>
    <Post navigation={navigation}/>
    <Post navigation={navigation}/>

   
    </ScrollView>

    
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    btnGrp:{
     display:"flex",
     flexDirection:"row"
   }

})