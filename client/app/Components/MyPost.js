import {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Pressable,
    Touchable,
    TouchableWithoutFeedback,
    LogBox
  } from "react-native";
import React,{useState,useEffect,useCallback} from 'react'
import {auth} from '../Config/firebase'
import LottieView from "lottie-react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import axios from "axios";
import host from '../Config/ip';

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

const {height,width} = Dimensions.get('window');

const MyPost = ({navigation,data,route,showLike}) => {
    const animation = React.useRef(null);
    const isFirstRun = React.useRef(true);

    console.log(showLike);
  
    const {imageURL,caption,hashtags,location,userid,type,upvotes,_id,isUpvoted} = data;
    const authid = auth.currentUser.uid;

    // console.log(_id);
    // console.log(userid);
   
    const [upvote,setUpvote] = useState(upvotes);
    const [liked, setLiked] = useState(isUpvoted);
  
    const [isLiked,setIsLiked] = useState(isUpvoted);
    const [currentPost,setCurrentPost] = useState([]);

    
  
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

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener('focus', () => {
    //     // The screen is focused
    //     // Call any action and update data
    //     getPost();
    //   });
  
    //   // Return the function to unsubscribe from the event so it gets removed on unmount
    //   return unsubscribe;
    // }, [navigation]);

    // const getPost = async() => {
    //   const response = await axios.get( `${host}/posts/post/${data._id}`);
    //   console.log("here man see",response.data.data);
    //   setCurrentPost(response.data.data);
    // }

  
    const handleLike = async () => {
      console.log("user id is ",authid);
      setIsLiked((isLiked) => !isLiked);
  
      const response = await axios.patch(`${host}/posts/upvote/${_id}`,{},{
        headers:{
          Authorization:authid,
        }
      });
        setUpvote(response.data.data.upvotes);
        // console.log(response.data.data.upvotes);
        setLiked((isLiked) => !isLiked);
     
    }

    return (
        <View
          style={{
            backgroundColor: "transparent",
            alignSelf: "center",
            margin: 10,
            flexDirection: "column",
            width: screenWidth - 20,
            borderWidth: 0,
            borderRadius: 12,
            elevation: 2,
            shadowColor: "#777",
            shadowOpacity: 0.16,
            shadowRadius: 3,
            shadowOffset: {
              height: 1,
              width: 0
            }
          }}
        >
          <View
            style={{
              borderTopLeftRadius: scale(12),
              borderTopRightRadius: scale(12),
              backgroundColor: "transparent",
              height: verticalScale(200)
            }}
          >
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PostDetails',{post:data})}>


            <Image
              borderRadius={12}
              source={{uri:imageURL}}
              style={{
                width: screenWidth - 20,
                height: verticalScale(200),
                resizeMode: "cover"
              }}
            />
            </TouchableWithoutFeedback>


          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: verticalScale(75),
              marginTop: scale(-12),
              borderBottomLeftRadius: scale(12),
              borderBottomRightRadius: scale(12)
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
                  flex: 1,
                  borderBottomLeftRadius: scale(12),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >

                {userid && 
                <Image
                  source={{uri:userid.profileImg}}
                  style={{
                    width: scale(50),
                    height: scale(50)
                  }}
                  borderRadius={25}
                />
                }
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 3,
                  justifyContent: "center"
                }}
              >
                {userid &&
                <Text
                  style={{ color: "#000", fontSize: scale(13), margin: scale(3) }}
                >

                  {userid.username}
                </Text>
                  }   
                <Text
                  style={{ color: "#000", fontSize: scale(11), margin: scale(3) }}
                >
                  {location}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  flex: 1,
                  borderBottomRightRadius: scale(12),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                
                
                <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginRight:60}}>


                <TouchableOpacity onPress={handleLike}>
                <LottieView
                ref={animation}
                style={styles.heartLottie}
                source={require("../animation/like.json")}
                autoPlay={false}
                loop={false}
                
                />

                {/* {showLike && 

      <Text style={{marginLeft:28,marginTop:-30,fontSize:16}}>{upvote}</Text>
                } */}
                
      </TouchableOpacity>

      
      <Pressable onPress={() => navigation.navigate("Comments",{"id":_id})} style={styles.icon}>
      <MaterialCommunityIcons
        name={"comment-outline"}
        size={33}
        color={"black"}
      />
      </Pressable>

      </View>


              </View>
            </View>
          </View>
        </View>
      );
    }

    export default MyPost;
  
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
            marginLeft:10,
            marginTop:19
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
            width: 85,
            height: 85,
            marginLeft: -5,
            // marginTop:-6,
          },
    
    
    })