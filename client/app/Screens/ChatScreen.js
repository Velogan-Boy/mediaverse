import { View, Text,StyleSheet,SafeAreaView,StatusBar,Image,Dimensions,RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {db,auth} from '../Config/firebase';
import axios from 'axios';

const {height,width} = Dimensions.get("window");

export default function ChatScreen({navigation}) {

  const [users,setUsers] =useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const currUser = auth.currentUser.uid;
  console.log(currUser);

  
  var today = new Date(),

  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  useEffect(() => {
    
    getUsers();
  },[])
  const truncate = (input) =>
      input?.length > 10 ? `${input.substring(0, 19)}...` : input;

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

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  

  return (
   <View style={styles.container}>
     <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>My Chats</Text>

  
    </View>
    

    {/* base view */}
    <ScrollView 
     refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >


  
             <TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate("ChatDetail")}>
      
             <View style={styles.grp}>
             <Image source={{uri:"https://play-lh.googleusercontent.com/VLsWbQCoemSzmPc_v-pVecsrRSMyqOFOqZ9JV7VDHz-uszVhjNyKakea10RsSJjqqS0s"}} style={styles.avatarImg}/>
             <View style={styles.info}>
               <Text style={styles.username}>Global Chat</Text>
               <Text  numberOfLines={1} style={styles.lastMsg}>{truncate("Go Global")}</Text>
             </View>
             </View>
             
            
             <View style={styles.date}>
               <Text>9.00</Text>
             </View>
         
             </TouchableOpacity>


              
             {users.map((user)=>

<TouchableOpacity style={styles.chatView} onPress={() => navigation.navigate("PrivateChat",user)}>
      
<View style={styles.grp}>
<Image source={{uri:user.profileUrl}} style={styles.avatarImg}/>
<View style={styles.info}>
  <Text style={styles.username}>{user.name}</Text>
  <Text  numberOfLines={1} style={styles.lastMsg}>{truncate(`${user.email}`)}</Text>
</View>
</View>

<View style={styles.date}>
  <Text>{time}</Text>
</View>

</TouchableOpacity>

             )}
   
                    
         
</ScrollView>


    
 

    
    
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
  chatView:{
    marginTop:15,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    margin:15
  },
  grp:{
    display:"flex",
    flexDirection:"row"
  },
  info:{
    margin:10,
    marginLeft:20
  },
  avatarImg:{
    height:70,
    width:70,
    borderRadius:35,
  },
  username:{
    fontSize:18,
    fontWeight:'800'
  },
  date:{
    margin:12,
    marginLeft:80
  }
})