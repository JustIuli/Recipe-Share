import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase.ts";
import toast from "react-hot-toast";

const logInWithEmailAndPassword = async (email:string, password:string):Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) { // @ts-expect-error: you can't typehint a try catch
        console.error(err); if(err.message.includes("Firebase: Error (auth/invalid-credential).")) {toast.error('One or more fields are incorrect!')} else{toast.error('Something went wrong, please try again')}}
};

export default logInWithEmailAndPassword;