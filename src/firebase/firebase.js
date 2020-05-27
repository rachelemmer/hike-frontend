import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC1sVDSLt_0jkmPDPh2Ih3q9oD6utVa9dQ",
    authDomain: "gohike14.firebaseapp.com",
    databaseURL: "https://gohike14.firebaseio.com",
    projectId: "gohike14",
    storageBucket: "gohike14.appspot.com",
    messagingSenderId: "916508190297",
    appId: "1:916508190297:web:7abd53c7232f062f8e7348",
    measurementId: "G-XPD9XL1VL6"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

firebase.analytics();


export { storage, firebase as default }