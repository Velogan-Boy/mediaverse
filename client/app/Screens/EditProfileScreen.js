import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput,StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Config/colors';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Config/firebase';


const EditProfileScreen = () => {

  const [image,setImage] = useState(null);
  const [furl,setFurl] = useState(null);

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [filename,setFname]=useState("");
  const [lname,setLname]=useState("");

  const uploadImage = async(uri) => {

    const date = Date.now();

    console.log('starting UPLOAD ========');
    const blob = await fetch(uri).then((r) => r.blob());
    const path = `/socialApp/${date}`;
    await storage.ref(path).put(blob)

    const setURL = await storage.ref(path).getDownloadURL()
    console.log(`====> setURL is ${setURL} <=======`);
    setFurl(setURL);

  }
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      uploadImage(result.uri);
      setImage(result.uri);
    }
  };
  

  return (

    <KeyboardAwareScrollView
      style={styles.container}
      behavior="padding"
    >

<View style={styles.header1}>

<MaterialCommunityIcons name="account-edit" size={38} color={colors.light} style={{margin:8}}/>
<Text style={styles.headerContent}>Edit Profile</Text>


</View>

      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={pickImage}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
                source={{
                  uri: image?image:'https://picsum.photos/200/300',
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <MaterialCommunityIcons name="camera"
                    size={35}
                    color="#fff"
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>Praneeth</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome style={{ padding: 10 }} name="user-o" size={15} />
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor="#666666"
          >
          </TextInput>

        </View>


        <View style={styles.action}>
          <FontAwesome style={{ padding: 10 }} name="user-o" size={15} />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor="#666666"
          >
          </TextInput>

        </View>


        <View style={styles.action}>
          <FontAwesome style={{ padding: 10 }} name="envelope-o" size={15} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#666666"
          >
          </TextInput>

        </View>


        <View style={styles.action}>
          <FontAwesome style={{ padding: 10 }} name="globe" size={15} />
          <TextInput
            style={styles.textInput}
            placeholder="Location"
            placeholderTextColor="#666666"
          >
          </TextInput>
        </View>


        <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )

};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container:{
    
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex:1,
  
  },
  header1 : {
    backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
    display:"flex",flexDirection:"row",justifyContent:"center"

  },
  headerContent : {
    color:"white",
    fontSize:25,
    textAlign:"center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.danger,
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#333333',
  },
});