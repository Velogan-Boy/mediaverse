import { View, Text ,Button,Alert, SafeAreaView,Image,StyleSheet,Dimensions,RefreshControl,ScrollView,LogBox} from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react';
import {db,auth} from '../Config/firebase';
import AppBar from '../Components/AppBar';
import CustomButton from '../Components/CustomButton';
import SearchBar from '../Components/SearchBar';
import Post from '../Components/Post';
import axios from 'axios';
import host from '../Config/ip';
import List from '../Components/List';

import OfflineStatus from '../Components/OfflineStatus';
import * as Location from 'expo-location';
import { getLastNotificationResponseAsync } from 'expo-notifications';
import {CardTwo} from 'react-native-card-ui';
import colors from '../Config/colors';
import MyPost from '../Components/MyPost';


const {width,height} = Dimensions.get('window');


export default function HomeScreen({navigation,route}) {

  LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

  // const data = route.params;
  

  const userId = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  const name = auth.currentUser?.displayName;

  const [location, setLocation] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [data,setData] = useState([]);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const updatelocation = (location) => {
    db.ref('users/'+userId).update({
      location
    })
  }

  const allPost = async() => {
    try {
      const response = await axios.get(`${host}/posts/feed`,{
        headers:{
          Authorization:userId,
        }
      });
    
      // console.log("here are data ",response.data.data);
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('here is ', location);
      updatelocation(location);
    }
  };

  useEffect(() => {
    

    allPost();
    getLocation();

  }, []);

  
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);



  const handleSearch = async(searchPhrase) => {
    navigation.navigate("AccountSearchResults",{query:searchPhrase})
  }

  
  return (
    <View style={{backgroundColor:colors.white}}>
      <OfflineStatus/>
      <SafeAreaView>
      <AppBar
       onPress1={() => navigation.navigate("Chat")} 
       onPress2={() => {navigation.navigate("Map")}}
      />
     
      
    <ScrollView 
     refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    style={{marginBottom:175}}
    >
        <SafeAreaView 
  // style={clicked?styles.root1:styles.root}
  style={styles.root}
  >
        {!clicked}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          placeholder="Search Account"
          onFinish={() => handleSearch(searchPhrase)}
        />

        {/* {clicked && (
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
        )} */}

      </SafeAreaView>
     


    {data.map((post) => 
     <MyPost navigation={navigation} data={post} showLike={true}/>

    )}
   
   
   
    </ScrollView>

    
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    btnGrp:{
     display:"flex",
     flexDirection:"row"
   },
   root: {
     marginTop:10,
    justifyContent: "center",
    alignItems: "center",
  },
  root1:{
    marginTop:-50,
    justifyContent: "center",
    alignItems: "center",
  }

})