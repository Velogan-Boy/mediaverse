import { View, StyleSheet, StatusBar, FlatList ,Text, TouchableWithoutFeedback, Touchable, TouchableOpacity} from 'react-native'
import React, { useEffect,useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import GestureFlipView from 'react-native-gesture-flip-card';
import MyCard from '../Components/MyCard';

import colors from '../Config/colors';
import axios from 'axios';
import host from '../Config/ip';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';


export default function TrendingScreen({navigation}) {

  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      getTrending();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);



  const getTrending = async() => {
       try{
        const response = await axios.get(`${host}/posts/trending`);
        console.log("trending",response.data.data);
        setTrending(response.data.data);
       }
        catch(err){
          console.log(err);
        }

  }


  const renderFront = (name, uri) => {
    return (
      <View style={styles.frontStyle}>
        <ImagedCarouselCard
          width={350}
          height={200}
          shadowColor="#051934"
          source={{
            uri: uri
          }}
          text={name}
          style={styles.card}
        />
      </View>
    );
  };

  const renderBack = (data) => {
    return (
      <TouchableOpacity style={styles.backStyle} onPress={() => navigation.navigate("TrendingPostdetails",{postid:data.post[0]._id})}>

        {data.post[0] && 
        

        <MyCard
        
        imageurl={data.post[0].imageURL}
        title={data.post[0].caption}
        subtitle={data.hashtag.name}
        
        />
  }
       
        
      </TouchableOpacity>
    );
  };


  const GridView = ({ name, uri,data }) => (
    <View style={styles.gridStyle} >
      <GestureFlipView width={200} height={200} style={styles.flipStyle}>
        {renderFront(name, uri)}
        {renderBack(data)}
      </GestureFlipView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

<MaterialCommunityIcons name="rocket-launch" size={38} color={colors.light} style={{margin:8}}/>
<Text style={styles.headerContent}>Trending</Text>


</View>

      <SafeAreaView style={styles.MainContainer}>

        <FlatList
          data={trending}
          renderItem={({ item }) => <GridView name={item.hashtag.name} uri={item.hashtag.cover} data={item}/>}
          keyExtractor={item => item._id}
          numColumns={1}
          key={item => item.id}
        />

      </SafeAreaView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {

    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,

  },

  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  gridStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  flipStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  frontStyle: {

  },
  backStyle: {
  

  },
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
  title: {
      fontSize: 28,
      marginLeft:20,
      marginTop:10
    },
    titleButtonGrp:{
      display:"flex",flexDirection:"row",justifyContent:"space-between"
    },

})

// import { View, Text,StyleSheet,StatusBar, ScrollView } from 'react-native'
// import React from 'react';
// import colors from '../Config/colors';
// import {MaterialCommunityIcons} from '@expo/vector-icons';

// import Corousel from '../Components/Corousel';
// import PostCard from '../Components/PostCard';

// export default function DiscussionScreen() {
  
//   return (
//     <View style={styles.container}>
//        <View style={styles.header}>

// <MaterialCommunityIcons name="rocket-launch" size={38} color={colors.light} style={{margin:8}}/>
// <Text style={styles.headerContent}>Trending</Text>


// </View>

        
//         <View style={styles.titleButtonGrp}>
//         <Text style={styles.title}>Trending</Text>        
//         </View>

//         <ScrollView horizontal>
//         <PostCard/>
//         <PostCard/>
//         <PostCard/>
//         <PostCard/>
//         </ScrollView>

//         <View style={{marginTop:-100,...styles.titleButtonGrp}}>
//         <Text style={styles.title}>Popular Posts</Text>        
//         </View>

//         <ScrollView horizontal>
//         <PostCard/>
//         <PostCard/>
//         <PostCard/>
//         <PostCard/>
//         </ScrollView>

        


        

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   // avatarImg:{
//   //     height:70,
//   //     width:70,
//   //     borderRadius:35,
//   //   },
//     container:{
  
//       paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//       flex:1,
    
//     },
//     header : {
//       backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
//       display:"flex",flexDirection:"row",justifyContent:"center"
  
//     },
//     headerContent : {
//       color:"white",
//       fontSize:25,
//       textAlign:"center",
//     },
//     title: {
//         fontSize: 28,
//         marginLeft:20,
//         marginTop:10
//       },
//       titleButtonGrp:{
//         display:"flex",flexDirection:"row",justifyContent:"space-between"
//       },
// })