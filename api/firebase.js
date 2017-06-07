var firebase = require("firebase");
// Initialize Firebase
/*var config = {
  apiKey: "AIzaSyDQNdkQRk_XN6zwfn8KtBqv7sMPUnxa-v8",
  authDomain: "coglitedb.firebaseapp.com",
  databaseURL: "https://coglitedb.firebaseio.com",
  projectId: "coglitedb",    
  storageBucket: "coglitedb.appspot.com",    
  messagingSenderId: "1024119130296"
};
firebase.initializeApp(config);
*/

  var config = {
    apiKey: "AIzaSyDZkbhtbC3oR25TV7xUaoztDdFBdOS6_HI",
    authDomain: "coglite-master.firebaseapp.com",
    databaseURL: "https://coglite-master.firebaseio.com",
    projectId: "coglite-master",
    storageBucket: "coglite-master.appspot.com",
    messagingSenderId: "118207223388"
  };
  firebase.initializeApp(config);

module.exports = firebase;