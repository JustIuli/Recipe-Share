import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {User} from "../types/user.ts";
import toast from "react-hot-toast";
import {Dispatch} from "react";

export default async function fetchUserData(setUserData:Dispatch<User> , userUID:string , setFetchingDone:Dispatch<boolean>):Promise<void>{
    try {
        const q = query(collection(db, "users"), where("uid", "==", userUID));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserData(data as User);
    } catch{
        toast.error("An error occurred while fetching user data");
    }
    finally{
        setFetchingDone(true);
    }
}