
const firebaseConfig = {

    apiKey: "AIzaSyB2OkyEL8IwEJVm39guJ2uKDRnFbGrSuNs",    
    authDomain: "organizer-c70eb.firebaseapp.com",
    projectId: "organizer-c70eb",
    storageBucket: "organizer-c70eb.appspot.com",
    messagingSenderId: "764919847604",
    appId: "1:764919847604:web:eddcaa9646e911f0b115e1",
    measurementId: "G-5SJ2BWTERC"
};
// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


var user = firebase.auth().currentUser;
document.body.style.display = 'none';

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;

        document.body.style.display = ''; // Exibe o conteúdo da página após a autenticação

    } else {
        console.error('Usuário não autenticado.');

        // Redirecionar para a página de login
        window.location.href = 'https://tgszwdv.github.io/organize';
    }
});



document.addEventListener("DOMContentLoaded", function () {
  // Get the logout button
  var logoutButton = document.getElementById("logoutButton");

  // Add a click event listener to the logout button
  logoutButton.addEventListener("click", function () {
    console.log("Button clicked");

    // Sign out the current user
    firebase.auth().signOut().then(function () {
      console.log("User signed out");
      // Example: Redirect to the login page
      window.location.href = "https://tgszwdv.github.io/organize";
    }).catch(function (error) {
      console.error("Error signing out: ", error);
    });
  });
});
