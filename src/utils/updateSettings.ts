import {collection, getDocs, query, setDoc, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {uploadImageToStorage} from "./uploadImageToStorage.ts";
import toast from "react-hot-toast";

export default async function updateSettings(values: ReturnType<(values: { profilePic: undefined|File; description: string }) => {
    profilePic: undefined | File;
    description: string;
}> , uid:string) {
    try{
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(usersCollectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            const userData = querySnapshot.docs[0].data();

            if(!values.profilePic){
                await setDoc(userDocRef, { description:values.description , profilePhoto:userData.profilePhoto}, { merge: true });
            }else{
                console.log(values)
                const newProfilePic = await uploadImageToStorage(values.profilePic);
                await setDoc(userDocRef, { description:values.description , profilePhoto:newProfilePic}, { merge: true });
            }
        }
        else{
            throw Error('Something bad happened! Try again later')
        }
    }catch(e) {
        toast.error("An error occurred while updating your profile");
        console.error((e as unknown as Error).message);
    }
}