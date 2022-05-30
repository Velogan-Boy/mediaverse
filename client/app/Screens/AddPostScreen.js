import { View, Text,StyleSheet,StatusBar, Dimensions,Platform,Image,Alert } from 'react-native'
import React, { useState } from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Config/firebase';

import { FormBtn,FormInput } from '../Components/forms';

const {width,height} = Dimensions.get("window");

export default function AddPostScreen() {

    const [image, setImage] = useState(null);

    const [furl,setFurl] = useState(null);

    const [caption,setCaption] = useState(null);
    const [hashtag,setHashtag] = useState(null);

    const uploadImage = async(uri) => {

        const date = Date.now();
    
        console.log('starting UPLOAD ========');
        const blob = await fetch(uri).then((r) => r.blob());
        const path = `/socialApp/${date}`;
        await storage.ref(path).put(blob)
    
        const setURL = await storage.ref(path).getDownloadURL()
        console.log(`====> setURL is ${setURL} <=======`);
        setFurl(setURL);

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

      const check = () => {
        console.log(caption);
        console.log(hashtag);
        console.log(furl);
        const likes =0;
        const comment=0;

        if(furl!=null){
            console.log("ready");
        }
        if(furl==null && caption == null && hashtag==null){
          Alert.alert("Atleast One Field Should be filled");
        }
        else{
          Alert.alert("ready to fire into database !",caption);
        }
     
      }
      const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior="padding"
    >
        <View style={styles.header}>

<MaterialCommunityIcons name="post" size={38} color={colors.light} style={{margin:8}}/>
<Text style={styles.headerContent}>Add Posts</Text>


</View>

    <View style={{margin:20}}>

    {image && 
    <Image source={{ uri: image }} style={styles.image} />
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
      </View>
      
      <View style={{margin:30}}>
      <FormBtn title="Post" onPress={check}/>
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
      image:{
          width:width/2,
          height:height/3.5,
          margin:20
      }
})