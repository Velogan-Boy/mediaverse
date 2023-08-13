import { View, Text,StyleSheet,StatusBar, Dimensions,Platform,Image,Alert, ScrollView } from 'react-native'
import React, { useState } from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Config/firebase';
import { auth } from '../Config/firebase';

import { FormBtn,FormInput } from '../Components/forms';
import host from '../Config/ip';
import axios from 'axios';
import ActivityIndicator from '../Components/ActivityIndicator';
import LottieView from 'lottie-react-native';


const {width,height} = Dimensions.get("window");

export default function AddPostScreen({navigation}) {

    const [image, setImage] = useState(null);

    const [furl,setFurl] = useState(null);

    const [caption,setCaption] = useState(null);
    const [hashtag,setHashtag] = useState(null);
    const [location,setLocation] = useState(null);

    const [isLoading,setIsLoading] = useState(false);

    const [isdone, setIsdone] = useState(false);

    const uploadImage = async(uri) => {

        setIsLoading(true);

        const date = Date.now();
    
        console.log('starting UPLOAD ========');
        const blob = await fetch(uri).then((r) => r.blob());
        const path = `/socialApp/${date}`;
        await storage.ref(path).put(blob)
    
        const setURL = await storage.ref(path).getDownloadURL()
        console.log(`====> setURL is ${setURL} <=======`);
        setFurl(setURL);

        setIsLoading(false);

      }

     

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.cancelled) {
          uploadImage(result.uri);
          setImage(result.uri);
        }
      };

      const check = async () => {
        
        if(caption === null && hashtag === null && furl === null){
            Alert.alert('Please fill atleast one field');
            return;
        }
        
        console.log(caption);
        console.log(hashtag);
        console.log(furl);
        console.log(location);
        
        let hashtagArray = hashtag.split(' ');
        // console.log(hashtags);
        let hashtags = new Array();


        
        for(let hashtag of hashtagArray){
          if(hashtag.charAt(0) !== '#'){
            // console.log('hashtag is not valid');
                 hashtag = '#' + hashtag;
                }
                hashtags.push(hashtag);
              }
          console.log(hashtags);
        
          let type;

        // if(furl!=null){
        //     console.log("ready");
        // }

        type = furl!=null ? 'image' : 'text';

        const authid = auth.currentUser.uid;



        const response = await axios.post(`${host}/posts`,{
          type:type,
          caption:caption,
          hashtags:hashtags,
          location:location,
          imageURL:furl,
        },{
          headers:{
            Authorization:authid,
          }
        })
        console.log(response.data.status);
        if(response.data.status=="success"){
         console.log("success");

         setIsdone(true);
         setTimeout(() =>  navigation.navigate("Home"), 2500)
          
          // navigation.navigate("Home");

        }
        else{
          Alert.alert("failed");
        }
     
      }

      const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
      

  return (
    <SafeAreaView
      style={styles.container}
      behavior="padding"
    >
       <ActivityIndicator visible={isLoading}/>
       {isdone? 
      <LottieView
             autoPlay
             loop={false}             
             source={require("../animation/done.json")}
             style={{backgroundColor:colors.white,zIndex:2}}
      />:null
      }

        <View style={styles.header}>

        <MaterialCommunityIcons name="post" size={38} color={colors.light} style={{margin:8}}/>
        <Text style={styles.headerContent}>Add Posts</Text>


        </View>
        
    <ScrollView>

    <View style={{margin:20}}>

    {image && 
    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Image source={{ uri: image }} style={styles.image} />
    </View>
    }

    {image==null?
    <FormBtn title="Choose Photo" onPress={pickImage}/>:
    <FormBtn title="Change Photo" onPress={pickImage}/>
    }
    

    

   
   
      </View>
      <View style={{margin:20}}>

      <FormInput
        // labelValue={""}
        onChangeText={(e) => setCaption(e)}
        placeholderText="Caption"
        iconType="wechat"
       
      />
       <FormInput
        // labelValue={""}
        onChangeText={(e) => setHashtag(e)}
        placeholderText="Hashtag"
        iconType="slack"
        
      />

      <FormInput
        // labelValue={""}
        onChangeText={(e) => setLocation(e)}
        placeholderText="Location"
        iconType="find"
        
      />
      </View>
      
      <View style={{margin:30,marginBottom:60,marginTop:-2}}>
      <FormBtn title="Post" onPress={check}/>
      </View>

      </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
    
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
      
      },
      header : {
        backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
        display:"flex",flexDirection:"row",justifyContent:"center"
    
      },
      headerContent : {
        color:"white",
        fontSize:19,
        fontWeight:"bold",
        fontStyle:"italic",
        textTransform:"capitalize",
        textAlign:"center",
      },
      image:{
          width:"85%",
          height:height/4,
          margin:20,
          borderRadius:15
      }
})