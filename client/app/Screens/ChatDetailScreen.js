import { View, Text,useState,StyleSheet,StatusBar,Dimensions} from 'react-native';
import React from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MsgInput from '../Components/MsgInput';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const {height,width} = Dimensions.get("window");
var mainArray = ["One"] ;

export default function ChatDetailScreen() {

    const [msg, setMsg] = React.useState("");
    mainArray.push(msg.toString());

  return (

    <KeyboardAwareScrollView
    style={{ backgroundColor: '#fff' }}
    resetScrollToCoords={{ x: 0, y: 0 }}
    // contentContainerStyle={styles.container}
    scrollEnabled={false}
  >
    

     <View style={styles.container}>
     <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Chats With Praneeth</Text>
  
    </View>

    
     <View style={styles.mymsg}>
         {mainArray.map((data) => {
                <Text style={{fontSize:30}}>{data}</Text>
         })}
           
     </View>
    

   <View style={styles.chatInp}>

   <MsgInput
    // labelValue={""}
    onChangeText={(data) => setMsg(data)}
    placeholderText="Enter Message"
    iconType="user"
    keyboardType="twitter"
    autoCapitalize="none"
    autoCorrect={false}
    onSubmitEditing={ () => console.log(msg)}
   />

   

   </View>
   </View>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
    
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
      
      },
      header : {
        backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
        display:"flex",flexDirection:"row",justifyContent:"center"
    
      },
      headerContent : {
        color:"white",
        fontSize:25,
        textAlign:"center",
      },
      chatInp:{
          marginTop:height/1.4,
          margin:10
      }
})