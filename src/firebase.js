import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBRTOmLwitsKXG3YRRtb3DLknvVsgYGYy8",
  authDomain: "netflix-clone-f34ce.firebaseapp.com",
  projectId: "netflix-clone-f34ce",
  storageBucket: "netflix-clone-f34ce.firebasestorage.app",
  messagingSenderId: "357893379966",
  appId: "1:357893379966:web:9b66879289792099a7852f",
  measurementId: "G-3CX9SF8QDM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

const signUp = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout};