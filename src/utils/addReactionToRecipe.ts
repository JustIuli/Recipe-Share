import {collection, getDocs, query, setDoc, updateDoc, where , arrayRemove} from "firebase/firestore";
import {Recipe} from "../types/recipe.ts";
import {db} from "../libs/firebase/firebase.ts";
import {Dispatch} from "react";


export const addReactionToRecipe = async (recipe: Recipe, email: string, setProccessing:Dispatch<{save:boolean,dislike:boolean,like:boolean}> , typeOfReaction:'like'|'dislike'): Promise<void> => {
    try {
        if(typeOfReaction == 'like'){
        setProccessing({
                save:false,
                like:true,
                dislike:false
        })
        }else{
            setProccessing({
                save:false,
                like:false,
                dislike:true
            })
        }
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(usersCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            const userData = querySnapshot.docs[0].data();

            const likedRecipeIndex = userData.likedRecipes.findIndex((likedRecipe: Recipe) => likedRecipe.id === recipe.id);
            const dislikedRecipeIndex = userData.dislikedRecipes.findIndex((dislikedRecipe: Recipe) => dislikedRecipe.id === recipe.id);

            if(typeOfReaction == 'like') {
                if (likedRecipeIndex !== -1) {
                    await updateDoc(userDocRef, {
                        likedRecipes: arrayRemove(userData.likedRecipes[likedRecipeIndex])
                    });
                } else {
                    await setDoc(userDocRef, { likedRecipes: [...userData.likedRecipes, recipe] }, { merge: true });
                }
            }else{
                if(dislikedRecipeIndex !== -1) {
                    await updateDoc(userDocRef, {
                        dislikedRecipes: arrayRemove(userData.dislikedRecipes[dislikedRecipeIndex])
                    });
                } else {
                    await setDoc(userDocRef, { dislikedRecipes: [...userData.dislikedRecipes, recipe] }, { merge: true });
                }
            }
        } else {
            throw Error('No user with that email was found.');
        }
    } catch (e) {
        throw Error('There was a problem reacting to the recipe');
    }
    finally {
        setProccessing({
            save:false,
            like:false,
            dislike:false
        })
    }
};
