import { useState,useEffect } from 'react';
import { View, Text,StyleSheet,StatusBar,Dimensions } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react'
import colors from '../Config/colors';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {auth,db} from '../Config/firebase';

import OfflineStatus from '../Components/OfflineStatus';

import * as Location from 'expo-location';

export default function MapScreen() {

  const currUser = auth.currentUser.uid;

  const [users,setUsers] = useState([]);

  const [location, setLocation] = useState({
    "coords":{
      "accuracy": 20,
      "altitude": -81.79999542236328,
      "altitudeAccuracy": 1.0784446001052856,
      "heading": 0,
      "latitude": 13.0139268,
      "longitude": 80.2347876,
      "speed": 0,
    },
    "mocked": false,
    "timestamp": 1653560030748,
  });

  useEffect(()=> {
    getUsers();
  },[])


  const [errorMsg, setErrorMsg] = useState(null);

  const getUsers = () => {
    db.ref('users').on('value',(snapshot)=>{
      const users = [];
      snapshot.forEach((child)=>{
        users.push(child.val());
      })
      setUsers(users.filter(user => user.userId !== currUser));
      console.log(users);
    })
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []);


  return (
   <SafeAreaView style={styles.container}>

     <View style={styles.header}>

    <MaterialCommunityIcons name="map" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Around You</Text>

    </View>

    <OfflineStatus/>


    <MapView 
    style={styles.map}
    
    initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }}

    >
      {/* current user location */}
      <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} >
      <Callout>
						<Text>Iam Here!</Text>
					</Callout>
      </Marker>
      
       
       {/* other users */}

      {users.map((user) => 
      <Marker coordinate={{ 

         latitude: user.location.coords.latitude!=null?user.location.coords.latitude:0,
         longitude: user.location.coords.longitude!=null?user.location.coords.longitude:0,

         }} 
      pinColor="green"
      >
      <Callout>
						<Text>{user.name}</Text>
					</Callout>
      </Marker>
      )}

      

     


      {/* <Marker
					coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
					pinColor="red"
					draggable={true}
			
				>
					<Callout>
						<Text>Iam Here!</Text>
					</Callout>
				</Marker> */}



				<Circle center={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }} radius={100} />

      </MapView>

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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})




