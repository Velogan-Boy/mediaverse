import { View, Text,StyleSheet,SafeAreaView,StatusBar,Image,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const {height,width} = Dimensions.get("window");

export default function ChatScreen({navigation}) {

  const truncate = (input) =>
      input?.length > 10 ? `${input.substring(0, 19)}...` : input;

  return (
   <View style={styles.container}>
     <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>My Chats</Text>

  
    </View>
    

    {/* base view */}
    <TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate("ChatDetail")}>
      
    <View style={styles.grp}>
    <Image source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={styles.avatarImg}/>
    <View style={styles.info}>
      <Text style={styles.username}>Praneeth</Text>
      <Text  numberOfLines={1} style={styles.lastMsg}>{truncate("hello world iam praneeth")}</Text>
    </View>
    </View>



    

    <View style={styles.date}>
      <Text>9.00</Text>
    </View>

    </TouchableOpacity>

 


   
     


    
 

    
    
  </View>
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
  chatView:{
    marginTop:15,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    margin:15
  },
  grp:{
    display:"flex",
    flexDirection:"row"
  },
  info:{
    margin:10,
    marginLeft:20
  },
  avatarImg:{
    height:70,
    width:70,
    borderRadius:35,
  },
  username:{
    fontSize:18,
    fontWeight:'800'
  },
  date:{
    margin:12,
    marginLeft:80
  }
})