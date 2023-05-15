import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlWic_WapFvoTFY-09_XA7NPBSxX1ABeQ",
    authDomain: "mmr-app-c675d.firebaseapp.com",
    databaseURL: "https://mmr-app-c675d-default-rtdb.firebaseio.com/",
    projectId: "mmr-app-c675d",
    storageBucket: "mmr-app-c675d.appspot.com",
    messagingSenderId: "580032468687",
    appId: "1:580032468687:web:7648efeba6094a4d65c9ba"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const appAuth = getAuth();
export const db = getDatabase(app);