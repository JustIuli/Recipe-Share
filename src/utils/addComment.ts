import {collection, getDocs, query, where , updateDoc , doc} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {Recipe} from "../types/recipe.ts";
export const addComment = async (slug: string , updatedRecipe:Recipe) => {
    const q = query(collection(db, 'recipes'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {

        const recipeDoc = querySnapshot.docs[0];

        // @ts-expect-error:This happens because it contains nested updated fields
        await updateDoc(doc(db, 'recipes', recipeDoc.id), updatedRecipe);
    } else {
        console.log('Recipe with slug', slug, 'not found.');
    }
}
