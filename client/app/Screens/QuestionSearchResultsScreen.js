//default apis
import { View, Text ,StyleSheet,StatusBar,Platform,ScrollView, TouchableNativeFeedback, Image,Dimensions} from 'react-native';
import React, { useEffect,useState } from 'react';

//components

import ActivityIndicator from '../Components/ActivityIndicator';
import LottieView from "lottie-react-native";

//api calls
import axios from 'axios';

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons';

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';
import host from '../Config/ip';



const {height,width} = Dimensions.get('window');

const AccountSearchResults = ({route,navigation}) => {

    const [searchResults,setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [empty,setEmpty] = useState(false);

    useEffect(() => {
         getSearchResults();
    },[])

   



    const getSearchResults = async() => {
      // setLoading(true);
      const response =  await axios.get(`${host}/discussions/topic/search?keyword=${route.params.query}`);
      if(response.data.data.length === 0){
        setEmpty(true);
      }
      setSearchResults(response.data.data);
      console.log("here are search results ",response.data.data);
      // setLoading(false);
    }
    

  return (
    <View style={styles.container}>
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
        
      <ScrollView>

      {searchResults.map((result) =>

     
        <TouchableNativeFeedback onPress={()=> navigation.navigate('Forum',{"topic":result})}>
              <View>
               <Image source={{uri:result.cover}} style={styles.image}/>
              <View style={styles.outline}>
                  <View style={styles.textContainer}>
                  {/* <Text style={styles.movieTitle}>{movie.gender?movie.name:null}</Text>   */}
                  <Text style={styles.movieTitle}>{result.name}</Text>
                  <Text style={styles.info}>Number of Questions {result.count}</Text>     
   
              </View>
              </View>
              </View>
               </TouchableNativeFeedback>

      )}
          
      </ScrollView>
      </View>
    </View>
  )
}

export default AccountSearchResults;

const styles = StyleSheet.create({
  container : {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: "100%",
    backgroundColor:colors.white,
    maxHeight: "100%",
  },
  header : {
    backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
  },
  headerContent : {
    color:"white",
    fontSize:35,
    textAlign:"center",
  },
  image : {
    height:200,width:140,borderRadius:15,marginTop:18,margin:15,marginLeft:30
  },
  outline : {
    height:190,width:"95%",backgroundColor:colors.primary,marginTop:-190,zIndex:-2,marginHorizontal:10,
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
      fontSize:23,
      color:colors.white,
  },
  info : {
      marginRight:30,
      marginTop:3,
      fontSize:15,
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
