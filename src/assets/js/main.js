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

$('.validate-form').on('submit', event => {
      event.preventDefault();
      const email = $('#email_field').val();
      const password = $('#password_field').val();
      console.log(email, password);

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {

      })
      .catch(error => {
          console.log(error);
          //window.alert(error);
      });

      firebase.auth().onAuthStateChanged(function(user) {
       // window.alert("main Auth State Changed");

        if(user) {
           // window.alert("main Signed in");
            window.location = 'index.html'
        } else {
            //window.alert("main User has Signed out");
            //only when intention is to sign out, put a window location else it will obstruct the flow.
            //window.location = 'index.html'
           // window.location = 'signin.html'
        }
    });

});

$('#forgotPassword').on('click', event => {
    //window.alert("reset triggered");
    event.preventDefault();
    const email = $('#email_field').val();

    firebase.auth().sendPasswordResetEmail(email).then(function() {
        window.alert("A password reset email is sent at: " + email);
    }).catch(function(error) {
      // An error happened.
      console.log(error);
      window.alert(error);
    });

});

});