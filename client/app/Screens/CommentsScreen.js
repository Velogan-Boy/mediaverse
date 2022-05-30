import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image,StatusBar} from 'react-native';
// import { Avatar } from 'react-native-elements';
import { auth, db,db1} from '../Config/firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';




const Chat = ({ navigation }) => {
  
    const [messages, setMessages] = useState([]);

        const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages,messages));
        console.log(messages[0].text);
    }, []);


    return (
        <View style={styles.container}>
         {/* <Image source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={styles.avatarImg}/> */}
         <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Comments</Text>

  
    </View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            placeholder="Type a Comment"
            
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                // avatar: auth?.currentUser?.photoURL
                avatar:'https://placeimg.com/140/140/any'
            }}
         
        />
        </View>
    );
}

export default Chat;

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
      }
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