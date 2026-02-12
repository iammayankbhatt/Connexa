console.log("test...");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAc9iA1NFsofMIM-H7SSox18pQmIkabN1E",
    authDomain: "connexa-bbf81.firebaseapp.com",
    projectId: "connexa-bbf81",
    storageBucket: "connexa-bbf81.firebasestorage.app",
    messagingSenderId: "146267432169",
    appId: "1:146267432169:web:68d48bcc7ec00600987c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//submit button

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const checkPassword=document.getElementById("confirm").value;

    if(checkPassword!==password){
        alert("Password do not match");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // alert("Creating Account...")
            window.location.href="signin.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})