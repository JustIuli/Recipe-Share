import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../libs/firebase/firebase.ts";
import toast from "react-hot-toast";
import { Dispatch } from "react";

export default async function fetchAllRecipes(setFetchingDone: Dispatch<boolean>) {
    try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        setFetchingDone(true);
        const allRecipes = querySnapshot.docs.map(doc => doc.data());

        const mostRatedSnapshot = await getDocs(query(collection(db, "recipes"), orderBy("ratings", "desc"), limit(1)));
        const mostRatedRecipe = mostRatedSnapshot.docs.map(doc => doc.data())[0];

        return { allRecipes, mostRatedRecipe };
    } catch (error) {
        setFetchingDone(true);
        toast.error("An error occurred while fetching recipe data");
        return { allRecipes: [], mostRatedRecipe: null };
    }
}