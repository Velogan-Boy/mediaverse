//default apis
import { View, Text,StyleSheet,StatusBar,Platform, ScrollView } from 'react-native'
import React ,{useState} from 'react'

//color palette
import colors from '../Config/colors';

//form components
import { FormBtn,FormInput } from '../Components/forms';

//firebase apis
import { db,auth } from '../Config/firebase';

//other components
import {MaterialCommunityIcons} from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import OfflineStatus from '../Components/OfflineStatus';
import axios from 'axios';  
import host from '../Config/ip';

const ProfileEditScreen = ({navigation}) => {
 
    
    const [question,setQuestion] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");

    const [isdone, setIsdone] = useState(false);

    const userId = auth.currentUser?.uid;
    
    
    const handleSubmit = async () => {
        console.log(userId);
        if(question ==="" || description ==="" || category ===""){
            alert("Please Fill All Fields");
        }else{
            // addUserInfo();
            console.log(question);
            console.log(description);
            console.log(category);

            const response = await axios.post(`${host}/discussions/questions`,{
                question:question,
                description:description,
                topic:category,
            },{
              headers:{
                Authorization:userId,
              }
            },);
            console.log(response);
            if(response.data.status=="success"){
              setIsdone(true);
              setTimeout(() =>  navigation.navigate("Discussion"), 2500)
            } 

            
        }
    }


  return (
    <View style={styles.container}>
      <OfflineStatus/>
    <View style={styles.header}>

          <MaterialCommunityIcons name="account-edit" size={38} color={colors.light} style={{margin:8}}/>
          <Text style={styles.headerContent}>Ask Question !</Text>

     </View>

     {isdone? 
      <LottieView
             autoPlay
             loop={false}             
             source={require("../animation/done.json")}
             style={{backgroundColor:colors.white,zIndex:2}}
      />:null
      }
    
    <ScrollView style={styles.body}>

     <Text style={styles.title}>Question</Text>
     <FormInput
        labelValue={question}
        onChangeText={(e) => setQuestion(e)}
        placeholderText="Question"
        iconType="questioncircleo"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

     <Text style={styles.title}>Description</Text>

     <FormInput
        labelValue={description}
        onChangeText={(e) => setDescription(e)}
        placeholderText="Description"
        iconType="form"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

<Text style={styles.title}>Category</Text>

<FormInput
   labelValue={category}
   onChangeText={(e) => setCategory(e)}
   placeholderText="Category"
   iconType="form"
   // keyboardType="email-address"
   autoCapitalize="none"
   autoCorrect={false}
 />

  
      <View style={styles.submitBtn}>
          <FormBtn title="Submit" onPress={() => handleSubmit()}/>
      </View>
      </ScrollView>
    </View>

  )
}

export default ProfileEditScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
      body:{
          marginTop:20,margin:20
      },
      title:{
        fontSize:25,margin:7
      },
      submitBtn:{
        margin:30
      }
})