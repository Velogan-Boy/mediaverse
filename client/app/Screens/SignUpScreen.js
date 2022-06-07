//default apis
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet,Alert, ScrollView,Image, Dimensions, TextInput} from 'react-native';

//firebase apis
import {auth,db} from '../Config/firebase';

//form components
import {FormInput, FormBtn, SocialBtn} from '../Components/forms';

//color palette
import colors from '../Config/colors';

//google authentication
import signInWithGoogleAsync from '../Auth/GoogleAuth';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import host from '../Config/ip';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../Config/firebase';
import PasswordInput from '../Components/forms/PasswordInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActivityIndicator from '../Components/ActivityIndicator';

const {width,height} = Dimensions.get("window");


const SignUpScreen = ({navigation}) => {
  console.log(host);

  const [location, setLocation] = useState(null);

  const [image, setImage] = useState(null);
  const [furl,setFurl] = useState(null);


  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token,setToken]=useState(null);

  const [isLoading,setIsLoading] =useState(false);

  const saveToken = (token,userId) => {
    db.ref('tokens/'+ userId ).set({
      token,
  }).then((data)=>{
    console.log('data ' , data)
  }).catch((error)=>{
    console.log('error ' , error)
  })
}

const registerForPushNotificationsAsync = async (uid,email,name,username) => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    addUserToDatabase(uid,email,name,username,token);
    // setToken(token);
    saveToken(token,uid);
    // console.log("here is token dude",token);
    // addUserToDatabase(token);
  } else {
    let dummytoken=null;
    addUserToDatabase(uid,email,name,username,dummytoken);
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

  const addUserToDatabase = async (uid,email,name,username,token) => {
    
    
    
    db.ref('users/'+ uid).set({
      email:email,
      name:name,
      userId:uid,
      username:username,
      location:location,
      token:token,
      profileUrl:furl,
    })
    
    var fname = name.split(" ")[0];
    var lname = name.split(" ")[1];

    const response = await axios.post(`${host}/users/signup`,{
      authid:uid,
      username:username,
      fname:fname,
      lname:lname,
      email:email,
      profileImg:furl,
    })
    console.log(response);
  }

  

  // const auth = getAuth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  },[])

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

  const uploadImage = async(uri) => {

    setIsLoading(true);

    const date = Date.now();

    console.log('starting UPLOAD ========');
    const blob = await fetch(uri).then((r) => r.blob());
    const path = `/socialApp/${date}`;
    await storage.ref(path).put(blob)

    const setURL = await storage.ref(path).getDownloadURL()
    console.log(`====> setURL is ${setURL} <=======`);
    setFurl(setURL);

    setIsLoading(false);

  }

  const handleSignup = () => {
    console.log("here is ",location);
    if(email === ""|| password === ""|| confirmPassword === "" || name === "" || username === "" || furl===null){
        alert("Please fill all the fields");
    }else if(password !== confirmPassword){
      alert("Passwords do not match");
    }else{
      try{
        auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
          const user = userCredentials.user;
          console.log(user.email);
          console.log("successfully registered with ",user.email);
          console.log("here is the id",user.uid);
          registerForPushNotificationsAsync(user.uid,user.email,name,username);
          
        })
        .catch(error => Alert.alert(error.message));
      }catch(e){
        console.log(e);
      }
    }
    
    
  }


  return (
 
    <ScrollView style={styles.container}>
      <OfflineStatus/>
      <ActivityIndicator visible={isLoading}/>
      <Text style={styles.text}>Sign Up</Text>

      {image &&

    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Image source={{ uri: image }} style={styles.image} />
    </View>

    }

    {image==null?
    <View style={{marginBottom:10}}>
    <FormBtn title="Choose Profile Image" onPress={pickImage}/>
    </View>:
    <View style={{marginBottom:10}}>
    <FormBtn title="Change Profile Image" onPress={pickImage}/>
    </View>
    }

      <FormInput
        labelValue={name}
        onChangeText={(e) => setName(e)}
        placeholderText="Name"
        iconType="user"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={username}
        onChangeText={(e) => setUsername(e)}
        placeholderText="Username"
        iconType="user"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <PasswordInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <PasswordInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      
      <FormBtn
        title="Sign Up"
        onPress={handleSignup}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity >
          <Text style={[styles.color_textPrivate, {color: colors.danger}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity>
        <Text style={[styles.color_textPrivate, {color: colors.danger}]}>
          Privacy Policy
        </Text>
        </TouchableOpacity>

      </View>

      {Platform.OS === 'android' ? (
        <View>
           <SocialBtn
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {signInWithGoogleAsync()}}
          />
          {/* <SocialBtn
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          /> */}
         
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.nav1}>Already have an account? <Text style={styles.navButtonText}>Sign In</Text></Text>
      </TouchableOpacity>
      
    </ScrollView>
  
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:colors.dark,
    
  },
  text: {
    fontSize: 35,
    marginBottom: 10,
    marginTop:20,
    color: colors.white,
    textAlign:"center"
  },
  navButton: {
    marginTop: 15,
    paddingBottom:50
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.danger,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  nav1:{
    fontSize: 18,
    fontWeight: '500',
    color:"gray",
    textAlign:"center"
  },
  image:{
    width:100,
    height:100,
    margin:20,
    borderRadius:50,  
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: height / 15,
    borderColor: colors.danger,
    borderWidth:5,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius:30
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'stretch'
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});