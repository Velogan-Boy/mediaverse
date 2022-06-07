import { View, Text, StyleSheet, Image, FlatList,RefreshControl,TouchableHighlight,StatusBar,Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect,useState,useCallback } from 'react';
import { auth } from "../Config/firebase";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../Config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import host from '../Config/ip';
import axios from 'axios';
// import colors from '../Config/colors';

//components
import { FormBtn } from '../Components/forms';
import { getCurrentUser } from 'expo-google-sign-in';

export default function AccountScreen({ navigation,route }) {

 

  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [postcount, setPostcount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [followers, setFollowers] = useState([]);

  const [isfollowing,setIsFollowing] = useState(false);

  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  // console.log(route.params.id);

  // console.log("here is post",post);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      getUser();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);



  useEffect(() => {
        getFollowers();
        getUser();
        getCurrentUser();

  },[])

  const getCurrentUser = async() => {
    const response = await axios.get(`${host}/users/signin`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    });

    if(response.data.data.following.includes(route.params.id)) {
        setIsFollowing(true);
    }

  }



  const getUser = async() => {
    const response = await axios.get(`${host}/users/user/${route.params.id}`);
    // console.log(response.data.data);

    const response2 = await axios.get(`${host}/posts/user/${route.params.id}`);
    // console.log(response2.data.data);

    setUser(response.data.data);
    console.log("friend user ",user.authid);
    setPost(response2.data.data);
    setPostcount(response2.data.results);
    setFollowingCount(response.data.data.following.length);
    setFollowerCount(response.data.data.followers.length);

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getFollowers = async () => {
    const response = await axios.get(`${host}/users/following`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    });
    console.log(response.data.data);
    setFollowers(response.data.data);
    
    // setFollowerCount(response.data.data.length);
  }

  const HandleFollowOrUnfollow = async(id) => {
    console.log(id);
     
      const response = await axios.get(`${host}/users/follow/${id}`,{
        headers:{
          Authorization:auth.currentUser.uid,
        }
      });

      console.log(response.data.status);

      if(response.data.status=="success"){

        setTimeout(() => {
          getFollowers();
          getUser();
          getCurrentUser();
        } ,1000);
        setIsFollowing(id == !id);
      }

     

     
  }

  return (
    <ScrollView style={styles.container} >



     <View style={styles.header}>

 <MaterialCommunityIcons name="account" size={38} color={colors.light} style={{margin:8}}/>
 <Text style={styles.headerContent}>{user.username} Account</Text>


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
       
      </Text>

      <View style={{margin:20}}>
        <FormBtn title={isfollowing?"Unfollow":"Follow"}
        onPress={() => HandleFollowOrUnfollow(route.params.id)}
        />
      </View>

      </View>
      
  
      <Text style={{ fontSize: 25, color: 'black', paddingHorizontal: 10, marginTop: 10, fontWeight: '450', marginBottom: 20 }}> Gallery </Text>
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
            <TouchableOpacity >
              <Image source={{ uri: item.imageURL }} style={styles.headerImage} />
            </TouchableOpacity>
          )
        }}
      />
      </View>

      </ScrollView>

    </ScrollView>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   height: '100%',
  // },
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