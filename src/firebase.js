
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCL26ZL5KLRgsEsHCvGokA2GPY50rIZNZI",
  authDomain: "netflix-clone-58363.firebaseapp.com",
  projectId: "netflix-clone-58363",
  storageBucket: "netflix-clone-58363.firebasestorage.app",
  messagingSenderId: "805962365333",
  appId: "1:805962365333:web:51276ceb40068aa4f61e9c"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db= getFirestore(app);


const signup=async(name,email,password)=>{

    try{
      const res=await createUserWithEmailAndPassword(auth,email,password);
      const user=res.user;

      await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    }catch (error){
      console.log(error);
      toast.error(error.code);
    }
}

const login= async(email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch (error){
    console.log(error);
    toast.error(error.code);
  }
}

const logout=()=>{
  signOut(auth);
}

export {auth,db,login,signup,logout};