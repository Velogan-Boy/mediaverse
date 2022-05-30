import { View, Text,StyleSheet,Dimensions,Image, TouchableOpacity,Pressable, TouchableWithoutFeedback } from 'react-native'
import React,{useState} from 'react'

//components
import CustomButton from './CustomButton';
import colors from '../Config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width,height} = Dimensions.get('window');

export default function Post({onPress,navigation}) {

  const [liked, setLiked] = useState(false)
  
  return (
         <View style={styles.post}>

           <View style={styles.account}>
            <TouchableWithoutFeedback>
            <Image source={{uri:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WeCenA8rmJ2QSqmNDXSLeMb7lZJ4pKF0wg&usqp=CAU`}} style={styles.profile}/>
            </TouchableWithoutFeedback>


            <View style={styles.accInfo}>
                
            <Text style={{fontSize:16,letterSpacing:1}}>Batman</Text>
            <Text style={{fontSize:12}}>Gotham</Text>
            
            
            </View>

        </View>

        <TouchableWithoutFeedback 
        // onPress={onPress}
        >
        <Image source={{uri:`https://cdn.mos.cms.futurecdn.net/uqXiBtqw7YnQrRJTGq8DDB-1200-80.jpg`}} style={styles.postImg}/>
        
        </TouchableWithoutFeedback>

      
   
        <View style={styles.icons}>

          

        <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={styles.icon}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />
      </Pressable>
      
      <Pressable onPress={() => navigation.navigate("Comments")} style={styles.icon}>
      <MaterialCommunityIcons
        name={"comment-outline"}
        size={32}
        color={"black"}
      />
      </Pressable>
           
            {/* <CustomButton type="send" onPress={()=>{console.log("share")}} style={styles.icon} size={20}/> */}
            
  
        </View>
            
        <View style={styles.caption}>
      
          <Text style={styles.capText} numberOfLines={2}>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
          lorem ipsum jsadhjndsakjksdajjasdnksand asmdn,asdm,
          </Text>
        
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
        marginBottom:height/3.1,
      },
      postImg:{
        width:width-10,height:height/3,borderRadius:30,
        // height:height/2,
        // width:width-10,
        marginLeft:5,
        // borderRadius:30,
        
        
      },
      icons:{
        display:"flex",
        flexDirection:"row",
        // justifyContent:"space-around",
        margin:10,
        marginTop:20
      },
      icon:{
        height:50,
        width:50,
        marginLeft:10
      },
      caption:{
        marginTop:-10,
        margin:20,
        // backgroundColor:colors.danger,
        borderRadius:15

      },
      capText:{
        // color:colors.white,
        letterSpacing:2,
        fontSize:14,
        // textAlign:"center",
      }


})