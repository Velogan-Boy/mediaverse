import { View, Text,StyleSheet,Dimensions,Image } from 'react-native'
import React from 'react'

//components
import CustomButton from './CustomButton';

const {width,height} = Dimensions.get('window');

export default function Post() {
  return (
         <View style={styles.post}>

           <View style={styles.account}>
            <View>
            <Image source={require('../../assets/images/logo-small.png')} style={styles.profile}/>
            </View>

            <View style={styles.accInfo}>
                
            <Text>Account name</Text>
            <Text>Location</Text>
            
            </View>
            

        </View>

        <Image source={require("../../assets/images/logo-small.png")} style={styles.postImg}/>
   
        <View style={styles.icons}>

            <CustomButton type="heart-o" onPress={()=>{console.log("like")}} style={styles.icon} size={20}/>
            <CustomButton type="comments-o" onPress={()=>{console.log("comment")}} style={styles.icon} size={20}/>
            <CustomButton type="send" onPress={()=>{console.log("share")}} style={styles.icon} size={20}/>
  
        </View>

</View>
  )
}

const styles = StyleSheet.create({
    account:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    
        },
    accInfo:{
        marginLeft:10,
        marginBottom:10,        
    },
    profile:{
        height:45,
        width:45,
        borderRadius:22,
        marginLeft:10,
        marginBottom:10,
    },
    post:{
        height:height/4,
        marginTop:20,
        marginBottom:height/2,
      },
      postImg:{
        height:height/2,
        width:width-10,
        marginLeft:5
      },
      icons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:40
      },
      icon:{
        height:50,
        width:50,
        marginLeft:10
      }
})