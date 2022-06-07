import { View, Text,StyleSheet,Dimensions,Image, TouchableOpacity,Pressable, TouchableWithoutFeedback } from 'react-native'
import React,{useEffect, useState,useRef} from 'react'

//components
import CustomButton from './CustomButton';
import colors from '../Config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import host from '../Config/ip';
import axios from 'axios';
import { auth } from '../Config/firebase';
import LottieView from "lottie-react-native";
import {CardTwo} from 'react-native-card-ui';

const {width,height} = Dimensions.get('window');

export default function Post({navigation,data}) {
  /*like*/
  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);

  const {imageURL,caption,hashtags,location,userid,type,upvotes,_id,isUpvoted} = data;
  const authid = auth.currentUser.uid;
  console.log(_id);
  console.log(userid);
 
  const [upvote,setUpvote] = useState(upvotes);
  const [liked, setLiked] = useState(isUpvoted);

  const [isLiked,setIsLiked] = useState(isUpvoted);
  

  // console.log(userid);

  // console.log(upvotes);
  // console.log(hashtags);
  useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (isLiked) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [isLiked]);

  const handleLike = async () => {
    console.log("user id is ",authid);
    setIsLiked((isLiked) => !isLiked);

    const response = await axios.patch(`${host}/posts/${_id}/upvote`,{},{
      headers:{
        Authorization:authid,
      }
    });
      setUpvote(response.data.data.upvotes);
      // console.log(response.data.data.upvotes);
      setLiked((isLiked) => !isLiked);
    
   
  }


  
  return (
         <View style={imageURL?styles.post:{
           marginTop:20
         }}>

           {/* <View style={styles.account}>
            <TouchableWithoutFeedback>
            <Image source={{uri:`${userid.profileImg}`}} style={styles.profile}/>
            </TouchableWithoutFeedback>


            <View style={styles.accInfo}>
                
            <Text style={{fontSize:16,letterSpacing:1}}>{userid.username}</Text>
            <Text style={{fontSize:12}}>{location}</Text>
            
            
            </View>

        </View> */}

          {imageURL?

          <View>
          <View>
              {/* <Image source={{uri:imageURL}} style={styles.postImg}/> */}
              <CardTwo
            title={userid.username}
            subTitle={location}
            profile={{
              uri: `${userid.profileImg}`
            }}
            image={{
              uri:imageURL
            }}

            // icon={"apple"}
            // iconColor={"red"}
          />
          </View>
      
        
      
   
        <View style={styles.icons}>

      {/* <Pressable onPress={handleLike} style={styles.icon}>

       
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />
      
      <Text style={{marginLeft:10}}>{upvote}</Text>
      </Pressable> */}
      

      <TouchableOpacity onPress={handleLike}>
      <LottieView
                ref={animation}
                style={styles.heartLottie}
                source={require("../animation/like.json")}
                autoPlay={false}
                loop={false}
      />
      <Text style={{marginLeft:25,marginTop:-30,fontSize:16}}>{upvote}</Text>
      </TouchableOpacity>

      
      <Pressable onPress={() => navigation.navigate("Comments",{"id":_id})} style={styles.icon}>
      <MaterialCommunityIcons
        name={"comment-outline"}
        size={32}
        color={"black"}
      />
      </Pressable>
              
  
        </View>

            
        <View style={styles.caption}>
      
          {/* <Text style={styles.capText} numberOfLines={2} >
            {caption}
          </Text> */}
          
            {/* {hashtags.map((hashtag) => 
               <Text style={styles.capText} numberOfLines={1}>{`#${hashtag.name}`}</Text>
            )} */}
          
        
        </View>

        </View>

        :

        <View>
      
      <View style={styles.caption}>
      
      <Text style={{marginTop:20,fontSize:18,...styles.capText}} numberOfLines={2}>
        {caption}
      </Text>
    
    </View>

        <View style={styles.icons}>
         
        <Pressable onPress={handleLike} style={styles.icon}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />

  
      <Text style={{marginLeft:10}}>{upvote}</Text>

      </Pressable>
      
      <Pressable onPress={() => navigation.navigate("Comments",{"id":_id})} style={styles.icon}>
      <MaterialCommunityIcons
        name={"comment-outline"}
        size={32}
        color={"black"}
      />
      </Pressable>
           
            
  
        </View>
            
      
        </View>


        
          }
        
     

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
        height:height/6,
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
        marginTop:8
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
      },
      heartLottie: {
        width: 80,
        height: 80,
        marginLeft: -5,
        marginTop:-12,
      },


})