import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {User} from "../types/user.ts";
import {fetchUserRecipes} from "./fetchUserRecipes.ts";
import {Recipe as RecipeType} from "../types/recipe.ts";
import toast from "react-hot-toast";
import {Dispatch} from "react";

const fetchUserDataByUID = async (setUserData:Dispatch<User>,
                                  setFetchingDone:Dispatch<boolean>,
                                  setFetchedRecipes:Dispatch<RecipeType[]>,
                                  userUID:string):Promise<void> => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userUID));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserData(data as User);
        const userRecipes = await fetchUserRecipes(setFetchingDone , data.name);
        setFetchedRecipes(userRecipes as RecipeType[]);
    } catch (err) {
        console.error(err);
        toast.error("An error occurred while fetching user data");
    }
    finally{
        setFetchingDone(true);
    }
};

export default fetchUserDataByUID;