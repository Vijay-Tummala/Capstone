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
      const email = $('#inputEmail').val();
      const password = $('#inputPassword').val();
      console.log(email, password);

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
           // window.alert("Signed in");
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        window.alert(error);
        // ...
      });

      firebase.auth().onAuthStateChanged(function(user) {
        //window.alert("su Auth State Changed");
        if(user) {
           // window.alert("su Signed in");
            user.sendEmailVerification().then(function() {
                // Email sent.
                  window.alert("A verification email has been sent your registered email account. Please verify your email account.");
                  window.location = 'index.html'
              }).catch(function(error) {
                // An error happened.
              });
            //window.location = 'index.html'
        } else {
            //window.alert("su User has Signed out");
            //window.location = 'index.html'
           // window.location = 'signin.html'
        }
    });

});

});