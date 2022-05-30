import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image,StatusBar} from 'react-native';
// import { Avatar } from 'react-native-elements';
import { auth, db,db1} from '../Config/firebase';
// import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';




const PrivateChatScreen = ({ navigation,route }) => {

    const receiverEmail = route.params.email;
    const senderEmail = auth.currentUser.email;

    const unique = [senderEmail,receiverEmail].sort().join('');
    console.log(unique);

    // console.log(senderEmail);
    // console.log(receiverEmail);
  
    const [messages, setMessages] = useState([]);

 
    useLayoutEffect(() => {

        
        const unsubscribe = db1.collection(`${unique}`).orderBy('createdAt', 'desc').onSnapshot(
            (snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            ))
        )
        

        return unsubscribe;

    }, [navigation]);


        const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages,messages));
        const { _id, createdAt, text, user,} = messages[0]
        
        db1.collection(`${unique}`).add({ _id, createdAt,  text, user });
    }, []);


    return (
        <View style={styles.container}>
         {/* <Image source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={styles.avatarImg}/> */}
         <View style={styles.header}>

    <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
    <Text style={styles.headerContent}>Chats with {route.params.name}</Text>

  
    </View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
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

export default PrivateChatScreen;

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


