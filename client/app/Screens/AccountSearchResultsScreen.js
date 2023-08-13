//default apis
import { View, Text ,StyleSheet,StatusBar,Platform,ScrollView, TouchableNativeFeedback, Image,Dimensions} from 'react-native';
import React, { useEffect,useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

//components

import ActivityIndicator from '../Components/ActivityIndicator';
import LottieView from "lottie-react-native";

//api calls
import axios from 'axios';
import host from '../Config/ip';

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons';

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';
import { auth } from '../Config/firebase';



const {height,width} = Dimensions.get('window');

const AccountSearchResults = ({route,navigation}) => {
    const [loading,setLoading] = useState(false);
    const [empty,setEmpty] = useState(false);

    const [accounts,setAccounts] = useState([]);

    useEffect(() => {
        getSearchResults();
    },[])

    const query = route.params.query;
    console.log(query);

    const isDark = true;

    

    const getSearchResults = async() => {

      const response = await axios.get(`${host}/users/search?searchString=${route.params.query}`);
      console.log("search results ",response.data.data);
      setAccounts(response.data.data.filter((data) => data.authid!=auth.currentUser.uid));
      if(response.data.data.length==0){
        setEmpty(true);
      }
      
    }
    

  return (
    <SafeAreaView style={{backgroundColor:isDark?colors.dark:colors.white,...styles.container}}>
       <ActivityIndicator visible={loading}/>
       <OfflineStatus/>
       {empty===true? <View style={styles.overlay}>
         
           <LottieView
        autoPlay
        loop
        source={require("../animation/noresults.json")}
      />
        </View>:null}
        
      <View style={styles.header}>
      <Text style={styles.headerContent}>Results <MaterialCommunityIcons name="account" size={30}/></Text>
      </View>
      {/* base view */}
      <View style={{margin:10,maxHeight:height/1.139}}>
        
      <ScrollView
      style={{
        marginBottom:27
      }}
      >

      {accounts.map(data => 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("OtherAccount",{"id":data._id})}>
              <View>
               <Image source={{uri:data.profileImg}} style={styles.image}/>
              <View style={styles.outline}>
                  <View style={styles.textContainer}>
                  {/* <Text style={styles.movieTitle}>{movie.gender?movie.name:null}</Text>   */}
                  <Text style={styles.movieTitle}>{data.fname}</Text>
                  <Text style={styles.info}>
                    
                    {
                      data.email.length>20?data.email.substring(0,20)+"...":data.email
                    }
                  
                  </Text>     
   
              </View>
              </View>
              </View>
               </TouchableNativeFeedback>

      )}

          
      </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AccountSearchResults;

const styles = StyleSheet.create({
  container : {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: "100%",
    backgroundColor:colors.white,
    maxHeight: "100%",
  },
  header : {
    backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
  },
  headerContent : {
    color:"white",
    fontSize:19,
    fontWeight:"bold",
    fontStyle:"italic",
    textTransform:"capitalize",
    textAlign:"center",
  },
  image : {
    height:200,width:140,borderRadius:15,marginTop:18,margin:15,marginLeft:30
  },
  outline : {
    height:190,width:"95%",backgroundColor:colors.final,marginTop:-190,zIndex:-2,marginHorizontal:10,
    borderRadius:15,
  },
  textContainer : {
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
    //   alignSelf:"flex-end",
    //   alignItems:"center",
    //   margin:20,
      marginLeft:180,
      marginTop:20,    
  },
  movieTitle: {
    fontSize:18,
    fontWeight:"bold",
    textTransform:"capitalize",
    color:colors.white,
    marginRight:10,
},
  info : {
      marginRight:15,
      marginTop:3,
      fontSize:14,
      color:colors.white,
  },
  rating : {
      marginTop:-5,
      marginRight:38,
  },
  overlay: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: "100%",
    opacity: 0.8,
    marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%",
    zIndex: 1,
  },
})
