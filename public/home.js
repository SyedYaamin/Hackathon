import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { doc, addDoc, query, orderBy, getDocs, Timestamp, collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const logoutBtn = document.querySelector("#logout-btn");

// Checking State that User is Login or Not
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html';
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

const blogPost = document.querySelector("#blog-post");
const blogTitle = document.querySelector("#blog-title");
const blogDescription = document.querySelector("#blog-description");
const render = document.querySelector("#render-blog");
let blogArr = [];


const getDataFromFirestore = async () => {
    blogArr = [];
    const q = query(collection(db, "BlogPosts"), orderBy("Date", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        blogArr.push(doc.data());
    });
    renderBlogs();
};

// Fetch the blog data when the page loads
getDataFromFirestore();

const renderBlogs = async () => {
    render.innerHTML = '';

    if (blogArr.length === 0) {
        render.innerHTML = `
            <div class="card-body items-center text-center">
                <h2 class="card-title">No Data Found</h2>
            </div>`;
        return;
    }

    blogArr.map((item) => {
        render.innerHTML += `
            <div class="mb-5 card-body items-center text-center">
                <h2 class="card-title">${item.Title}</h2>
                <p>${item.Description}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
    });
};

    // Adding Blog Post in Firebase
    blogPost.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const docRef = await addDoc(collection(db, "BlogPosts"), {
            Title: blogTitle.value,
            Description: blogDescription.value,
            Date: Timestamp.fromDate(new Date())
        });
    
        blogArr.push({
            Title: blogTitle.value,
            Description: blogDescription.value,
            id: docRef.id
        });
    
        console.log("Document written with ID: ", docRef.id);
        renderBlogs();
    });