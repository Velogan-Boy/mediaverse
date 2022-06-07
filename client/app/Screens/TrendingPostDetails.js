import { View, Text,StyleSheet,StatusBar,Dimensions,Image, ScrollView } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyPost from '../Components/MyPost';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import host from '../Config/ip';
import axios from 'axios';
import { auth, db,db1} from '../Config/firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;


export default function PostDetailsScreen({navigation,route}) {

  const id = useState(route.params.postid);


//   const [post,setPost] = useState(route.params.post);
  const [currentPost,setCurrentPost] = useState([]);



  useEffect(() => {
    getPost();
   },[]);

   const getPost = async() => {
     const response = await axios.get( `${host}/posts/post/${route.params.postid}`);
     console.log("here man",response.data.data);
     setCurrentPost(response.data.data);
   }


  return (
    <View style={styles.container}>

        <View style={styles.header}>

        <MaterialCommunityIcons name="post" size={38} color={colors.light} style={{margin:8}}/>
        <Text style={styles.headerContent}>Post Details</Text>

        </View>
         
         {currentPost.userid?
         <View style={{marginTop:15}}>
        <MyPost navigation={navigation} data={currentPost}/>
        </View>
        :null}

        

        <View
          style={{
            backgroundColor: "#fff",
            margin: scale(10),
            flexDirection: "row",
            width: screenWidth - scale(20),
            shadowColor: "#777",
            borderRadius: 12,
            elevation: 2,
            shadowOpacity: 0.16,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0
            },
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            maxHeight:200
          }}
        >
         
  
          <View
            style={{
              flex: 3,
              height: scale(150),
              padding: scale(5),
              marginTop: 0
            }}
          >
            <View
              style={{
                flexDirection: "row",
  
                flex: 1
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 3,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#000", margin: scale(3), fontSize: scale(20),textAlign:"center" }}
                >
                  {currentPost.caption}
                </Text>

              
 
                {
                  currentPost.hashtags&&
                
                currentPost.hashtags.map((hashtag) => 
                <Text
                  style={{
                    color: "#888",
                    textAlign: "center",
                    margin: scale(3),
                    fontSize: scale(14),
                  }}
                >
                  #{hashtag.name}
                    
                </Text>
                )
                }
                
                

                <View
                  style={{
                    flexDirection: "row",
                    zIndex: scale(4),
                    flex: 1,
                    marginTop: -0,
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  
                </View>
              </View>
            </View>
          </View>
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