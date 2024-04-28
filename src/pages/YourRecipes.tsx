import RecipesLayout from "../layouts/RecipesLayout.tsx";
import Loading from "./Loading.tsx";
import styles from "../assets/css/recipes.module.css";
import {useEffect, useState} from "react";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {Title} from "@mantine/core";
import RecipeWrapper from "../components/RecipeWrapper.tsx";
import Recipe from "../components/Recipe.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {fetchUserRecipes} from "../utils/fetchUserRecipes.ts";
import {useNavigate} from "react-router-dom";
import NoCreatedRecipes from "../components/NoCreatedRecipes.tsx";


const YourRecipes = () => {
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    const [fetchedRecipes, setFetchedRecipes] = useState<RecipeType[]>([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(loading){
            return;
        }
        if (!user) return navigate("/auth/sign-in");
        async function fetchData() {
            const userRecipes = await fetchUserRecipes(setFetchingDone , user?.displayName);
            setFetchedRecipes(userRecipes as RecipeType[]);
        }
        fetchData();
    }, []);
    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDone ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div>

                            <div className={styles.content}>

                                <Title my="sm">Your Recipes</Title>

                                {fetchedRecipes.length > 0 ?
                                <RecipeWrapper>
                                    {fetchedRecipes.map((recipe, index) => (
                                        <Recipe
                                            key={index}
                                            recipeSlug={recipe.slug}
                                            numberOfIngredients={recipe.ingredients.length}
                                            thumbnailPhoto={recipe.thumbnailPhoto}
                                            timeToPrepare={recipe.prepTime.minutes + recipe.cookTime.minutes}
                                            title={recipe.title}
                                        />
                                    ))}
                                </RecipeWrapper> : <NoCreatedRecipes />}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </RecipesLayout>
    );
};

export default YourRecipes;