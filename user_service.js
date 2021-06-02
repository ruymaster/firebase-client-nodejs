const firebase = require("firebase/app");
require("firebase/auth");
require('dotenv').config();

const apiKey = process.env.FIREBASE_API_KEY;
const fb = firebase.initializeApp({
  apiKey: apiKey,
});

exports.addUser = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = async (email, password) =>
  {    
    await fb.auth().signInWithEmailAndPassword(email, password);
    const user = fb.auth().currentUser;    
    const token = await user.getIdToken();    
    // console.log("----user token id", user.uid,  token)
    return {uid: user.uid, token};
  }
