
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
const auth = firebase.auth();
var database = firebase.database();


auth.onAuthStateChanged((user) => {
  const loginForm = document.getElementById('loginForm');
  if (user) {
    // User is signed in
    console.log('User is already signed in:', user);
    showMenu();
    // Hide the login form
    loginForm.style.display = 'none';
  } else {
    // No user is signed in
    console.log('No user is signed in.');
    // Show the login form
    loginForm.style.display = 'flex';
  }
});

// Função para autenticar com o Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log('Usuário autenticado com Google:', user);
      showMenu();
      const uid = user.uid;
    })
    .catch((error) => {
      console.error('Erro ao autenticar usuário com Google:', error.message);
    });
}

// Função para entrar com e-mail e senha
function signInWithEmail() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log('Usuário autenticado com e-mail e senha:', user);
      showMenu();
    })
    .catch((error) => {
      console.error('Erro ao autenticar usuário com e-mail e senha:', error.message);
    });
}

// Função para criar uma conta
function createAccount() {
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuário criado com sucesso
            const user = userCredential.user;
            console.log('Usuário criado com e-mail e senha:', user);
            showMenu();
            hideCreateAccountForm();
        })
        .catch((error) => {
            console.error('Erro ao criar usuário com e-mail e senha:', error.message);
        });
}

function showCreateAccountForm() {
    document.getElementById('createAccountContainer').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function hideCreateAccountForm() {
    document.getElementById('createAccountContainer').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';  // or set it to 'block' if you want to show the login form again
}

// Função para mostrar o menu após o login
function showMenu() {
  document.getElementById('loginForm').style.display = 'none';
  window.location.href = 'https://tgszwdv.github.io/organize/menu';
}
