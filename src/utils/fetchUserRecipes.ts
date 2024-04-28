import {Dispatch} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import toast from "react-hot-toast";

export const fetchUserRecipes = async (setFetchingDone: Dispatch<boolean>, username: string | null | undefined) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, "recipes"), where("author.name", "==", username))
        );
        setFetchingDone(true);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        setFetchingDone(true);
        toast.error("An error occurred while fetching recipe data");
        return [];
    }
}