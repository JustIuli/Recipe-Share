import RecipesLayout from "../layouts/RecipesLayout.tsx";
import styles from "../assets/css/recipes.module.css"
import TopRatedRecipe from "../components/TopRatedRecipe.tsx";
import Recipe from "../components/Recipe.tsx";
import RecipeWrapper from "../components/RecipeWrapper.tsx";
import {Button, Group, Title} from "@mantine/core";
import RecipeFilters from "../components/RecipeFilters.tsx";
import {useEffect, useState} from "react";
import fetchAllRecipes from "../utils/fetchAllRecipes.ts";
import Loading from "./Loading.tsx";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {NoRecipes} from "../components/NoRecipes.tsx";
import {NoFilteredRecipes} from "../components/NoFilteredRecipes.tsx";
const Recipes = () => {
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    const [fetchedRecipes, setFetchedRecipes] = useState<RecipeType[]>([]);
    const [topRatedRecipe, setTopRatedRecipe] = useState<RecipeType>();
    const [usingFilter, setUsingFilter] = useState<boolean>(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
    const [selectedDietTypes, setSelectedDietTypes] = useState<string[]>([]);
    const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string[]>([]);
    const [usingSearch, setUsingSearch] = useState<boolean>(false);

    async function resetFilters() {
        const {allRecipes, mostRatedRecipe} = await fetchAllRecipes(setFetchingDone);
        setFetchedRecipes(allRecipes as RecipeType[]);
        setTopRatedRecipe(mostRatedRecipe as RecipeType);
        setUsingFilter(false)
    }

    useEffect(() => {
        async function fetchData() {
            const { allRecipes, mostRatedRecipe } = await fetchAllRecipes(setFetchingDone);
            setFetchedRecipes(allRecipes as RecipeType[]);
            setTopRatedRecipe(mostRatedRecipe as RecipeType);
        }
        fetchData();
    }, []);

    async function resetSearch() {
        setUsingSearch(false);
        const {allRecipes, mostRatedRecipe} = await fetchAllRecipes(setFetchingDone);
        setFetchedRecipes(allRecipes as RecipeType[]);
        setTopRatedRecipe(mostRatedRecipe as RecipeType);
    }

    return (
        <RecipesLayout setRecipes={setFetchedRecipes} setUsingSearch={setUsingSearch}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {!fetchingDone ? <Loading /> : (

                            <div>
                                <div className={styles.content}>
                                    {!usingFilter && !usingSearch && topRatedRecipe && fetchedRecipes.length > 0 && (
                                        <TopRatedRecipe
                                            authorName={topRatedRecipe.author.name}
                                            authorPhoto={topRatedRecipe.author.photo}
                                            description={topRatedRecipe.description}
                                            numberOfIngredients={topRatedRecipe.ingredients.length}
                                            recipeSlug={topRatedRecipe.slug}
                                            thumbnailPhoto={topRatedRecipe.thumbnailPhoto}
                                            timeToPrepare={topRatedRecipe.prepTime.minutes + topRatedRecipe.cookTime.minutes}
                                            title={topRatedRecipe.title}
                                        />
                                    )}

                                    <Group justify="space-between">
                                        {usingSearch ? <Title my="sm">Search Results</Title>
                                            : <Title my="sm">{usingFilter ? 'Filtered Recipes' : 'All Recipes'}</Title>}

                                        {usingSearch ? (
                                            <Button variant='filled' color='yellow' onClick={() => resetSearch()}>Reset Search</Button>
                                            ) : (
                                            <RecipeFilters setUsingFilter={setUsingFilter} setRecipes={setFetchedRecipes}
                                                           selectedCuisineTypes={selectedCuisineTypes} selectedDietTypes={selectedDietTypes}
                                                           selectedMealTypes={selectedMealTypes} setSelectedCuisineTypes={setSelectedCuisineTypes}
                                                           setSelectedDietTypes={setSelectedDietTypes} setSelectedMealTypes={setSelectedMealTypes}
                                                           resetFilters={resetFilters} usingFilter={usingFilter}/>
                                        )}
                                    </Group>

                                    {fetchedRecipes.length > 0 ? (
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
                                    </RecipeWrapper>
                                    ): usingFilter ? <NoFilteredRecipes setFetchedRecipes={setFetchedRecipes}
                                                                        setFetchingDone={setFetchingDone}
                                                                        setTopRatedRecipe={setTopRatedRecipe}
                                                                        setSelectedCuisineTypes={setSelectedCuisineTypes}
                                                                        setSelectedDietTypes={setSelectedDietTypes}
                                                                        setSelectedMealTypes={setSelectedMealTypes}
                                    /> : <NoRecipes />}
                                </div>

                            </div>
                    )}
                </div>
            </div>
        </RecipesLayout>
    );
};

export default Recipes;