import { View, Text,StyleSheet,StatusBar } from 'react-native'
import React from 'react'

import colors from '../Config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function TrendingPostScreen() {
  return (
    <View style={styles.container}>

     <View style={styles.header}>

    <MaterialCommunityIcons name="map" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Around You</Text>

    </View>

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
})