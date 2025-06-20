import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
})
signInButton.addEventListener('click', function () {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
})


function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
      messageDiv.style.opacity = 0;
    },5000);
  }
  const signup = document.getElementById('submitSignUp');
  signup.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const name = document.getElementById('fName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        name: name,
      };
      showMessage('Conta criada com sucesso', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
      .then(() => {
        window.location.href = 'login.html';
        
      })
      .catch((error) => {
        console.error("Erro ao escrever o documento", error);
        
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') 
        showMessage('O endereço de email existe está tudo certo!!!', 'signUpMessage');

      showMessage('Não é possivel criar usuario', 'signUpMessage');

    })
  });

  const singIn = document.getElementById('submitSignIn');
  singIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('login feito com sucesso', 'signInMessage');7
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = '../html/templetes.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') 
         showMessage('Email ou senha incorreta', 'signInMessage');
      
      showMessage('Conta não existe', 'signInMessage');
    })
  })


