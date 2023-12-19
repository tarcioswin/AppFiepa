
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



const firebaseConfig = {
  apiKey: "AIzaSyBytGjkDMc0N9hW3b9XAK3lf9-kZrhaq9I",
  authDomain: "appfiepa.firebaseapp.com",
  projectId: "appfiepa",
  storageBucket: "appfiepa.appspot.com",
  messagingSenderId: "82438976710",
  appId: "1:82438976710:web:71256e574da2c2211c53c7",
  measurementId: "G-Z5806NT1HK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const auth=initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db }; // Export the app instance

