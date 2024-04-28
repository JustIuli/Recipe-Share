import { Recipe } from "../types/recipe.ts";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase/firebase.ts";

export async function searchByKeyword(keyword: string): Promise<Recipe[]> {
    const recipes: Recipe[] = [];
    try {
        const recipesQuery = query(collection(db, "recipes"));
        const querySnapshot = await getDocs(recipesQuery);

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Recipe;
            if (data.title.toLowerCase().includes(keyword.toLowerCase()) || data.description.toLowerCase().includes(keyword.toLowerCase())) {
                recipes.push(data);
            }
        });
    } catch (error) {
        console.error("Error searching recipes:", error);
    }
    return recipes;
}
