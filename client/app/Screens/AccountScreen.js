import { View, Text,Alert, StyleSheet, Image, FlatList,RefreshControl, TouchableHighlight,StatusBar,Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect,useState,useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../Config/firebase";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../Config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import host from '../Config/ip';
import axios from 'axios';
import LottieView from 'lottie-react-native';

// import colors from '../Config/colors';

//components
import { FormBtn } from '../Components/forms';

export default function AccountScreen({ navigation }) {

  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [postcount, setPostcount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  const [out, setOut] = useState(false);

  console.log("here is ",post);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      getUser();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
 

  const getUser = async() => {
    const response = await axios.get(`${host}/users/signin`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    });
    const response2 = await axios.get(`${host}/posts`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    });

    setUser(response.data.data);
    console.log("user",response.data.data);
    setPost(response2.data.data);
    setPostcount(response2.data.results);
    console.log("followers",response.data.data.followers.length);
    console.log("following",response.data.data.following.length);
    setFollowingCount(response.data.data.following.length);
    setFollowerCount(response.data.data.followers.length);
    
  }

  const handleLogout = () => {
    
    Alert.alert(
      "Alert ! ",
      "Are you sure you want to Logout ?",
      [
        {
          text: "Yes",
          onPress: () => {
            auth.signOut().then(() => {
              setOut(true);
              setTimeout(() =>  navigation.navigate("Login"), 500)
              // navigation.replace("Login");
            }).catch(error => Alert.alert(error.message));
          },
        }
        ,
        {
          text: "No",
        },
      ]
    )


  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const handleDeletePost = (id) => {

    Alert.alert(
      "Alert ! ",
      "Are you sure you want to remove this Post ?",
      [
     
        {
          text: "Yes",
          onPress: () => {
            deletePost(id);
            
          },
        },
       
        {
          text: "No",
        },
      ]
    )
  }

  const deletePost = async(id) => {
    const response = await axios.delete(`${host}/posts/post/${id}`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    });

    console.log("here is response",response.message);
    setTimeout(() =>  getUser(), 500)
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <View style={styles.container} >

{/* {out &&
      <LottieView
             autoPlay
             loop={false}             
             source={require("../animation/logout.json")}
             style={{backgroundColor:colors.white,zIndex:2}}
      />
      } */}

     <View style={styles.header}>

 <MaterialCommunityIcons name="account" size={38} color={colors.light} style={{margin:8}}/>
 <Text style={styles.headerContent}>My Account</Text>


 </View>

     <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, marginLeft: 20 }}>


        <Image source={{ uri: `${user.profileImg}` }} style={styles.img} />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            {postcount}
          </Text>

          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Posts
          </Text>
        </View>


        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Followers",{id:user.authid})}>
          <Text 
          // onPress={() => { navigation.navigate('Followers') }} 
          style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            {followerCount}
          </Text>
          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Followers
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Following",{id:user.authid})}>
          <Text 
          // onPress={() => { navigation.navigate('Following') }} 
          style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            {followingCount}
          </Text>
          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Following
          </Text>
        </TouchableOpacity>


      </View>
      

      <View style={{margin:10}}>

      <Text style={{
        fontSize: 18,
        color: 'black',
        paddingHorizontal: 10,
        marginTop: 10,
        fontWeight: '450',
      }}>
        {user.username}  {'  '}
        <FontAwesome5 onPress={() => { navigation.navigate('EditProfile') }} style={{ padding: 10 }} name="user-edit" size={20} color="black" />
      </Text>
      </View>
      
  
      <Text style={{ fontSize: 25, color: 'black', paddingHorizontal: 10, marginTop: 10, fontWeight: 'bold', marginBottom: 20 }}> Gallery </Text>
      <View
        style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'black' }}
      />
      <View style={{margin:15}}>

      <FlatList
        data={post}
        numColumns={3}
        horizontal={false}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            onLongPress={() => handleDeletePost(item._id)}            
            onPress={() => navigation.navigate("TrendingPostDetails",{postid:item._id})}>
              <Image source={{ uri: item.imageURL }} style={styles.headerImage} />
            </TouchableOpacity>
          )
        }}
      />
      </View>

      


      <View style={styles.logout}>
        <FormBtn title="Logout" onPress={handleLogout} />
      </View>

      </ScrollView>

    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  logout: {
    margin: 40,
    marginBottom:60
  },
  img: {
    height: 80,
    width: 80,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginRight: 20
  },
  headerImage: {
    width: 120,
    height: 120,
  }
})
