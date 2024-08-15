import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";


const logoutBtn = document.querySelector("#logout-btn");

// Checking State that User is Login or Not
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html'
    }
});

// Signout The User

logoutBtn.addEventListener('click', () => {

    signOut(auth).then(() => {
        console.log("User Signed Out");
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });

});