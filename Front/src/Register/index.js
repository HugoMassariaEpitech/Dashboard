import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcYKq1S_3ICRarZJoqvYaS08r18vV7W7k",
  authDomain: "dashboard-81b3f.firebaseapp.com",
  projectId: "dashboard-81b3f",
  storageBucket: "dashboard-81b3f.appspot.com",
  messagingSenderId: "179278508951",
  appId: "1:179278508951:web:74a2e76d5a1bf0bec48ad2",
  measurementId: "G-QEGPVWXVY1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Check connexion

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = "../Dashboard/"; // Not Connected -> Connexion Page
    }
});

// SignIn with Google

$("#Google").click(function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

// SignIn with Facebook

$("#Facebook").click(function() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});