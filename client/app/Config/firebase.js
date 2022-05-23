import * as firebase from "firebase";

//keys
// import {firebase_api_key,firebase_authDomain,firebase_databaseURL,firebase_projectId,firebase_storageBucket,firebase_messagingSenderId,firebase_appId} from "@env";


const firebaseConfig = {
  apiKey: "AIzaSyBgzQoRNE57rqcuc9KrSesv8G6yRvWRIXI",
  authDomain: "socialmediaapp-2a31e.firebaseapp.com",
  projectId: "socialmediaapp-2a31e",
  storageBucket: "socialmediaapp-2a31e.appspot.com",
  messagingSenderId: "283979015590",
  appId: "1:283979015590:web:3291a6159f52b96ebfdb67"
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

const auth = firebase.auth();
const db = firebase.database();

export {auth,db};
