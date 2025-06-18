import { getAuth, createUserWhithEmailAndPassword, singInWithEmailAndPassword } from "../node_modules/@firebase/auth";
import { getFirestore, setDoc, doc } from "../node_modules/@firebase/firestore";

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

    createUserWhithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        name: name,
      };
      showMessage('Conta criada com sucesso', 'singUpMessage');
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
        showMessage('O endereço de email existe está tudo certo!!!', 'singUpMessage');

      showMessage('Não é possivel criar usuario', 'singUpMessage');

    })
  });

  const singIn = document.getElementById('submitSingIn');
  singIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    singInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('login feito com sucesso', 'singInMessage');7
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = '../html/templetes.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') 
         showMessage('Email ou senha incorreta', 'singInMessage');
      
      showMessage('Conta não existe', 'singInMessage');
    })
  })


