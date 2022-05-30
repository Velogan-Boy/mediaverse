import { View, Text,StyleSheet,StatusBar, ScrollView } from 'react-native'
import React from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Corousel from '../Components/Corousel';
import PostCard from '../Components/PostCard';

export default function DiscussionScreen() {
  
  return (
    <View style={styles.container}>
       <View style={styles.header}>

<MaterialCommunityIcons name="rocket-launch" size={38} color={colors.light} style={{margin:8}}/>
<Text style={styles.headerContent}>Trending</Text>


</View>

        
        <View style={styles.titleButtonGrp}>
        <Text style={styles.title}>Trending</Text>        
        </View>

        <ScrollView horizontal>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        </ScrollView>

        <View style={{marginTop:-100,...styles.titleButtonGrp}}>
        <Text style={styles.title}>Popular Posts</Text>        
        </View>

        <ScrollView horizontal>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        </ScrollView>

        


        

    </View>
  )
}

const styles = StyleSheet.create({
  // avatarImg:{
  //     height:70,
  //     width:70,
  //     borderRadius:35,
  //   },
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
    title: {
        fontSize: 28,
        marginLeft:20,
        marginTop:10
      },
      titleButtonGrp:{
        display:"flex",flexDirection:"row",justifyContent:"space-between"
      },
})