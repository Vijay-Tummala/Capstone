$(function (){
    
    // Initialize Firebase
const config = {
  apiKey: "AIzaSyA9ComyfXt0BK7EKFCHSKGmdMgfKPFrc2s",
  authDomain: "planitwell3.firebaseapp.com",
  databaseURL: "https://planitwell3.firebaseio.com",
  projectId: "planitwell3",
  storageBucket: "planitwell3.appspot.com",
  messagingSenderId: "686088376668"
};
firebase.initializeApp(config);

$('#signout_link').on('click', event => {
      event.preventDefault();

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error);
        window.alert(error);
        //window.location = "#";
      });

      firebase.auth().onAuthStateChanged(function(user) {
        //window.alert("so Auth State Changed");
        if(user) {
            //window.alert("so Signed in");
            window.location = 'index.html'
        } else {
           // window.alert("so User has Signed out");
            window.location = 'index.html'
           // window.location = 'signin.html'
        }
    });

});

});