import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {auth, db} from "../firebase.ts";
import toast from "react-hot-toast";

export const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async ():Promise<void> => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                profilePhoto:user.photoURL,
                likedRecipes:[],
                dislikedRecipes:[],
                recipes:[],
                savedRecipes:[],
                followers:[],
                following:[],
                description:'',
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) { // @ts-expect-error: you can't typehint a try catch
        console.error(err); if(err.message.includes("Firebase: Error (auth/invalid-credential).")) {toast.error('We could not log you in!')} else{toast.error('Something went wrong, please try again')}
    }
};

export default signInWithGoogle;