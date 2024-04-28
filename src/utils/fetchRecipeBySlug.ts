import {Dispatch} from "react";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import toast from "react-hot-toast";

export default async function fetchRecipeBySlug(
    setRecipeData:Dispatch<RecipeType>,
    setFetchingDone:Dispatch<boolean>,
    navigate:(path:string) => void,
    slug:string|undefined,
    ):Promise<void> {
    if(!slug){
        return navigate('/recipe-not-found')
    }
    try {
        const q = query(collection(db, "recipes"), where("slug", "==", slug));
        const doc = await getDocs(q);
        if(doc.docs.length < 1){
            return navigate('/recipe-not-found')
        }
        const data = doc.docs[0].data();
        setRecipeData(data as RecipeType);
    } catch (err) {
        toast.error("An error occurred while fetching recipe data");
    }
    finally{
        setFetchingDone(true);
    }
}