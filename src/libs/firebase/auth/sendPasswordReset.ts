import {
    sendPasswordResetEmail
} from 'firebase/auth'
import {auth} from "../firebase.ts";
import toast from "react-hot-toast";

const sendPasswordReset = async (email:string):Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        toast.success('Password reset sent successfully.');
    } catch (err) {
        console.error(err); toast.error('We could not send you an email!')
    }
};

export default sendPasswordReset;