import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../Config/colors'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { auth } from '../Config/firebase';
import host from '../Config/ip';

const FollowersScreen = ({navigation,route}) => {

  const [followers, setFollowers] = useState([]);
  console.log(route.params.id);

  useEffect(() => {
    getFollowers();
  },[])

  const getFollowers = async() => {
        const response = await axios.get(`${host}/users/followers`,{
          headers:{
            Authorization:route.params.id,
          }
        });
        // console.log("following",response.data.data);
        setFollowers(response.data.data);
  }

  const handlePress = async(id) => {
    console.log(id);
     
      const response = await axios.delete(`${host}/users/follower/${id}`,{
        headers:{
          Authorization:auth.currentUser.uid,
        }
      });
      if(response.data.status == "success"){
        getFollowers();
      }

     
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Ionicons name="people" size={38} color={colors.light} style={{ margin: 8 }} />
        <Text style={styles.headerContent}>Followers</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
            followers.map((data) => (
              <TouchableOpacity style={styles.userInfo} 
              // onPress={() => navigation.navigate("OtherAccount")}
              >

                <Image source={{ uri: data.profileImg }} style={styles.img} />
                <Text style={styles.untext}>{data.fname}{"\n"}
                  <Text style={styles.ntext}>{data.username}
                  </Text>
                </Text>

                {route.params.id == auth.currentUser.uid ? 

                <TouchableOpacity onPress={() => handlePress(data._id)}>
                  <View style={styles.unfollow}>

                 
                    <Text style={styles.unfollowText}>Remove</Text>
                  </View>
                </TouchableOpacity>

                :null}

              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FollowersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  unfollow: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.primary
  },
  unfollowText: {
    color: 'white',
    fontFamily: 'Roboto'
  },
  userInfo: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',
  },
  untext: {
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
  },
  ntext: {
    flex: 1,
    fontFamily: 'Roboto',
    padding: 2
  },
  img: {
    height: 50,
    width: 50,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginRight: 20
  },
  header: {
    backgroundColor: colors.primary, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 60, justifyContent: "center", alignItems: "center",
    display: "flex", flexDirection: "row", justifyContent: "center",
    marginTop: 27
  },
  headerContent: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
})