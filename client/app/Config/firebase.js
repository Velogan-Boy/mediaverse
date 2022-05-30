import * as firebase from "firebase";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//keys
// import {firebase_api_key,firebase_authDomain,firebase_databaseURL,firebase_projectId,firebase_storageBucket,firebase_messagingSenderId,firebase_appId} from "@env";


const firebaseConfig = {
  apiKey: "AIzaSyCikQwEzwZs3msUF_MDdjhkBh-Uv1-wBtU",
  authDomain: "socialapp-5e56c.firebaseapp.com",
  databaseURL: "https://socialapp-5e56c-default-rtdb.firebaseio.com",
  projectId: "socialapp-5e56c",
  storageBucket: "socialapp-5e56c.appspot.com",
  messagingSenderId: "712665142853",
  appId: "1:712665142853:web:80cc18c947ecee3515b52c"
};

// const firebaseConfig = {
//   apiKey: firebase_api_key,
//   authDomain: firebase_authDomain,
//   databaseURL: firebase_databaseURL,
//   projectId: firebase_projectId,
//   storageBucket: firebase_storageBucket,
//   messagingSenderId: firebase_messagingSenderId,
//   appId: firebase_appId
// };

// Initialize Firebase
let app;
if(firebase.apps.length===0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const storage = app.storage();
const db1 = app.firestore();
const auth = firebase.auth();
const db = firebase.database();

export {auth,db,db1,storage};
