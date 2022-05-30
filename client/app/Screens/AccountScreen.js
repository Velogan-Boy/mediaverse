import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight,StatusBar,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import { auth } from "../Config/firebase";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../Config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons';
// import colors from '../Config/colors';

//components
import { FormBtn } from '../Components/forms';

export default function AccountScreen({ navigation }) {

  const data = [
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
    { postImage: 'https://picsum.photos/200' },
  ]
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => Alert.alert(error.message));
  }


  return (
    <View style={styles.container}>
     <View style={styles.header}>

 <MaterialCommunityIcons name="account" size={38} color={colors.light} style={{margin:8}}/>
 <Text style={styles.headerContent}>My Account</Text>


 </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, marginLeft: 20 }}>
        <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.img} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            3
          </Text>
          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Posts
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text 
          // onPress={() => { navigation.navigate('Followers') }} 
          style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            20
          </Text>
          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Followers
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text 
          // onPress={() => { navigation.navigate('Following') }} 
          style={{ fontWeight: '400', fontSize: 18, color: colors.danger, paddingHorizontal: 10, marginLeft: 10 }}>
            30
          </Text>
          <Text style={{ fontSize: 18, color: 'grey', paddingHorizontal: 10 }}>
            Following
          </Text>
        </View>
      </View>
      

      <View style={{margin:10}}>
      <Text style={{
        fontSize: 18,
        color: 'black',
        paddingHorizontal: 10,
        marginTop: 10,
        fontWeight: '450',
      }}>
        {auth.currentUser.email}  {'  '}
        <FontAwesome5 onPress={() => { navigation.navigate('EditProfile') }} style={{ padding: 10 }} name="user-edit" size={20} color="black" />
      </Text>
      </View>
      
  
      <Text style={{ fontSize: 25, color: 'black', paddingHorizontal: 10, marginTop: 10, fontWeight: '450', marginBottom: 20 }}> Gallery </Text>
      <View
        style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'black' }}
      />
      <View style={{margin:15}}>
      <FlatList
        data={data}
        numColumns={3}
        horizontal={false}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => console.log(item.postImage)}>
              <Image source={{ uri: item.postImage }} style={styles.headerImage} />
            </TouchableOpacity>
          )
        }}
      />
      </View>

      


      <View style={styles.logout}>
        <FormBtn title="Logout" onPress={handleLogout} />
      </View>


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
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   height: '100%',
  // },
  logout: {
    margin: 20
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




// import { View, Text,SafeAreaView,Button ,StyleSheet,StatusBar} from 'react-native'
// import React from 'react';
// import {auth} from "../Config/firebase";

// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import colors from '../Config/colors';

// //components
// import { FormBtn } from '../Components/forms';

// export default function AccountScreen({navigation}) {

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       navigation.replace("Login");
//     }).catch(error => Alert.alert(error.message));
//  }


//   return (
//       <View style={styles.container}>
//        <View style={styles.header}>

// <MaterialCommunityIcons name="chat" size={38} color={colors.light} style={{margin:8}}/>
// <Text style={styles.headerContent}>My Account</Text>


// </View>


//       <View style={styles.logout}>
//       <FormBtn title="Log Out" onPress={handleLogout}/>
//       </View>

//       </View>
    
//   )
// }

// const styles = StyleSheet.create({
//   logout: {
//     margin:20
//   },
//   container:{
    
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     flex:1,
  
//   },
//   header : {
//     backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
//     display:"flex",flexDirection:"row",justifyContent:"center"

//   },
//   headerContent : {
//     color:"white",
//     fontSize:25,
//     textAlign:"center",
//   }
// })