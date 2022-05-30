//default apis
import { View, Text,StyleSheet, Image,TouchableWithoutFeedback,Dimensions } from 'react-native'
import React from 'react'

const {width,height} = Dimensions.get("window");
//color palette
import colors from '../Config/colors'

const MovieCards = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
          <Image source={{uri:`https://cdn.mos.cms.futurecdn.net/uqXiBtqw7YnQrRJTGq8DDB-1200-80.jpg`}} style={styles.moreCard}/>
          {/* <Text style={{color:dark?colors.white:colors.black,...styles.movieName}}>{title?title:name}</Text> */}
    </View>
    </TouchableWithoutFeedback>
  )
}

export default MovieCards;

const styles = StyleSheet.create({
  container:{
     maxWidth:width/2,
  },
    recommendations:{
        marginTop:20,
      },
      recommended:{
        color:colors.white,
        fontSize:28,
      },
      moreCard : {
        height:200,width:width/2.1,borderRadius:20,marginTop:18,margin:10,resizeMode:"stretch"
      },
      movieName : {
        textAlign:"center",fontSize:15
      }
})    