//default apis
import * as firebase from 'firebase';
import * as Google from 'expo-google-sign-in';

//keys
import {androidClientId} from '@env';


const signInWithGoogleAsync = async() => {
    console.log("h");
    
    function isUserEqual(googleUser, firebaseUser) {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            return true;
          }
        }
      }
      return false;
    }

    function onSignIn(googleUser) {
      console.log('Google Auth Response', googleUser);
      var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
          );
    
          firebase.auth().signInWithCredential(credential).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
    }
    

    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '283979015590-blmr31e18djo77hj1u2q7b3rjdpinnqi.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  export default signInWithGoogleAsync;