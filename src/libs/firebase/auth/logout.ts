import {
    signOut
} from 'firebase/auth'
import {auth} from "../firebase.ts";

const logout = ():void => {
    signOut(auth);
};

export default logout;