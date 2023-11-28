function showCreateAccount() {
  document.getElementById("login-type").style.display = "none";
  document.getElementById("create-account-box").style.display = "block";
  document.getElementById("login-email").style.display = "none";
}

function showLoginType() {
  document.getElementById("create-account-box").style.display = "none";
  document.getElementById("login-type").style.display = "block";
  document.getElementById("login-email").style.display = "none";
}

function showLoginWithEmail() {
  document.getElementById("create-account-box").style.display = "none";
  document.getElementById("login-type").style.display = "none";
  document.getElementById("login-email").style.display = "block";
}



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

// id user
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Logado:', user);
    window.location.href = 'organize/menu';
  } else {
    console.log('Usuario não Logado.');

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
      const uid = user.uid;
      window.location.href = '/menu/';
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
      window.location.href = '/menu/';
    })
    .catch((error) => {
      console.error('Erro ao autenticar usuário com e-mail e senha:', error.message);
    });
}


function createAccountWithEmail() {
  const name = document.getElementById('createNome').value;
  const email = document.getElementById('createEmail').value;
  const password = document.getElementById('createPassword').value;

  // Verifica se todos os campos foram preenchidos
  if (name && email && password) {
    // Cria a conta no Firebase
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Usuário criado com sucesso
        const user = userCredential.user;

        // Chama a função para atualizar o nome do perfil
        updateProfileName(user, name);

        // Redireciona para a página '/menu'
        window.location.href = '/menu/';
      })
      .catch((error) => {
        console.error('Erro ao criar conta com e-mail e senha:', error.message);
      });
  } else {
    console.error('Por favor, preencha todos os campos.');
  }
}

// Função para atualizar o nome do perfil
function updateProfileName(user, name) {
  // Atualiza o perfil do usuário com o nome fornecido
  user.updateProfile({
    displayName: name
  })
  .then(() => {
    // Nome do usuário atualizado com sucesso
    console.log('Nome do perfil atualizado:', user.displayName);
  })
  .catch((updateError) => {
    console.error('Erro ao atualizar o nome do perfil:', updateError.message);
  });
}


