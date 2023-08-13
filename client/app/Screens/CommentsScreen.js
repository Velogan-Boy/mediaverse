import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image,StatusBar,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Avatar } from 'react-native-elements';
import { auth, db,db1} from '../Config/firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import host from '../Config/ip';
import axios from 'axios';




const Chat = ({ navigation,route }) => {

  const cmail = "logesh@gmail.com";

  const id = route.params.id;
  console.log(id);

  const [comment, setComment] = useState([]);

  useEffect(() => {
   getComments();
  },[]);

  const getComments = async() => {
    
    const response = await axios.get(`${host}/comments/${id}`,{
      headers:{
        Authorization:auth.currentUser.uid,
      }
  })

    setComment(
      response.data.data.map(comment => {
        return {
          _id: comment._id,
          text: comment.comment,
          createdAt: comment.createdAt,
          user: {
            _id: comment.postedUser._id,
            name: comment.postedUser.username,
            avatar: comment.postedUser.profileImg
          }
        }
      })
    )
    


}
  
    const [messages, setMessages] = useState([]);


        const onSend = useCallback((messages = []) => {

        setComment(previousMessages => GiftedChat.append(previousMessages,messages));
        console.log(messages[0].text);

        postComment(messages[0].text);



    }, []);

    const postComment = async(comment) => {
      const response = await axios.post(`${host}/comments/post/${id}`,
      {
        comment:comment,
      }
      ,{
        headers:{
          Authorization:auth.currentUser.uid,
        }
      });
    }

    const handleDelete = (message) => {
      // console.log(message);

      message.user._id == cmail ? 
      Alert.alert(
        "Alert ! ",
        "Are you sure you want to remove this Comment ?",
        [
       
          {
            text: "Yes",
            onPress: () => {
              console.log("here is post id ",message._id);
              // db.collection('chats').doc(message._id).delete();
            },
          },
         
          {
            text: "No",
          },
        ]
      )
      :null
 
    }

   


    return (
        <SafeAreaView style={styles.container}>
         {/* <Image source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={styles.avatarImg}/> */}
         <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Comments</Text>

  
    </View>

     

        <GiftedChat
            
            messages={comment}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            placeholder="Type a Comment"
            
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                // avatar: auth?.currentUser?.photoURL
                avatar:'https://placeimg.com/140/140/any'
            }}

            onLongPress={(context, message) => {
              handleDelete(message);
            }}
         
        />
        </SafeAreaView>
    );
}

export default Chat;

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
})


// import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { Avatar } from 'react-native-elements';
// import { auth, db } from '../Config/firebase';
// import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { GiftedChat } from 'react-native-gifted-chat';

// const Chat = ({ navigation }) => {
//     const [messages, setMessages] = useState([]);
//     console.log(collection,addDoc,getDocs,query,orderBy,onSnapshot);
 
//     useLayoutEffect(() => {

//         navigation.setOptions({
//             headerLeft: () => (
//                 <View style={{ marginLeft: 20 }}>
                  
//                 </View>
//             ),
//             headerRight: () => (
//                 <TouchableOpacity style={{
//                     marginRight: 10
//                 }}
                   
//                 >
//                     <Text>logout</Text>
//                 </TouchableOpacity>
//             )
//         })

//         const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
//         const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
//             snapshot.docs.map(doc => ({
//                 _id: doc.data()._id,
//                 createdAt: doc.data().createdAt.toDate(),
//                 text: doc.data().text,
//                 user: doc.data().user,
//             }))
//         ));

//         return () => {
//           unsubscribe();
//         };

//     }, [navigation]);

//     const onSend = useCallback((messages = []) => {
//         const { _id, createdAt, text, user,} = messages[0]

//         addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
//     }, []);

//     return (
//         <GiftedChat
//             messages={messages}
//             showAvatarForEveryMessage={true}
//             onSend={messages => onSend(messages)}
//             user={{
//                 _id: auth?.currentUser?.email,
//                 name: auth?.currentUser?.displayName,
//                 avatar: auth?.currentUser?.photoURL
//             }}
//         />
//     );
// }

// export default Chat;

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2022, 6, 24);
//     }
//   }
// }