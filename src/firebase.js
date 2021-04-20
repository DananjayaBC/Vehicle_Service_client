import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCDz7JGHW-3PjBDesPdEEUAsepUVyUrT08",
    authDomain: "vehicle-service-6ad36.firebaseapp.com",
    databaseURL: "https://vehicle-service-6ad36-default-rtdb.firebaseio.com",
    projectId: "vehicle-service-6ad36",
    storageBucket: "vehicle-service-6ad36.appspot.com",
    messagingSenderId: "1084791005527",
    appId: "1:1084791005527:web:83d3435ec5ab49ffe19e12",
    measurementId: "G-HFMCYLBB77"
})

export const auth = app.auth()
export default app