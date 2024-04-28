import {collection, getDocs, query, setDoc, updateDoc, where , arrayRemove} from "firebase/firestore";
import {Recipe} from "../types/recipe.ts";
import {db} from "../libs/firebase/firebase.ts";
import {Dispatch} from "react";


export const saveRecipe = async (recipe: Recipe, email: string, setProccessing:Dispatch<{ save:boolean , like:boolean , dislike:boolean }>): Promise<void> => {
    try {
        setProccessing({
            save:true,
            like:false,
            dislike:false
        })
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(usersCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            const userData = querySnapshot.docs[0].data();

            const recipeIndex = userData.savedRecipes.findIndex((savedRecipe: Recipe) => savedRecipe.id === recipe.id);

            if (recipeIndex !== -1) {
                await updateDoc(userDocRef, {
                    savedRecipes: arrayRemove(userData.savedRecipes[recipeIndex])
                });
            } else {
                await setDoc(userDocRef, { savedRecipes: [...userData.savedRecipes, recipe] }, { merge: true });
            }
        } else {
            throw Error('No user with that email was found.');
        }
    } catch (e) {
        throw Error('There was a problem saving recipe');
    }
    finally {
        setProccessing({
            save:false,
            like:false,
            dislike:false
        })
    }
};
