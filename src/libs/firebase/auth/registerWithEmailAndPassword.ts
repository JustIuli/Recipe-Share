import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth, db} from "../firebase.ts";
import {
    collection,
    addDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import {uploadImageToStorage} from "../../../utils/uploadImageToStorage.ts";
const registerWithEmailAndPassword = async (name:string, email:string, password:string , profilePic:string|undefined):Promise<void> => {

    if(!profilePic){
        toast.error('Please provide a valid profile picture');
        return;
    }

    try {
        const imageURL:string =  await uploadImageToStorage(profilePic as unknown as File);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            profilePhoto:imageURL,
            likedRecipes:[],
            dislikedRecipes:[],
            recipes:[],
            followers:[],
            following:[],
            description:'',
            savedRecipes:[],
            name,
            authProvider: "local",
            email,
        });

        console.log(user)
    } catch (err) { // @ts-expect-error: you can't typehint a try catch
        console.error(err); if(err.message.includes("Firebase: Error (auth/invalid-credential).")) {toast.error('One or more fields are invalid!')} else{toast.error('Something went wrong, please try again')}
    }
};

export default registerWithEmailAndPassword;