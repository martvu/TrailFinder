import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {enableIndexedDbPersistence, getFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCBS3OPQ6gF9srE-BMqKHM6pGwnXY9qU1Y",
    authDomain: "gruppe64-hiking-app.firebaseapp.com",
    projectId: "gruppe64-hiking-app",
    storageBucket: "gruppe64-hiking-app.appspot.com",
    messagingSenderId: "634169489038",
    appId: "1:634169489038:web:517af91f803f32ed147bdf",
    databaseURL: "https://gruppe64-hiking-app-default-rtdb.europe-west1.firebasedatabase.app",
    measurementId: "G-FC9DJ8KTZ4"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore();
enableIndexedDbPersistence(firestore)