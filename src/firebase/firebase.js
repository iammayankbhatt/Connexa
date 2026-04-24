import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyCUxwvGh34kreBrPeyQJRb-Dh_XODPlYqk",
authDomain: "connexa-app-78037.firebaseapp.com",
projectId: "connexa-app-78037",
messagingSenderId: "887308651555",
appId: "1:887308651555:web:6bfe2483dc0a93307df596"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);