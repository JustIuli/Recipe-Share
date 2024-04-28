import {Button, Stack, Text, Title} from "@mantine/core";
import fetchAllRecipes from "../utils/fetchAllRecipes.ts";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {Dispatch} from "react";

export const NoFilteredRecipes = ({setFetchedRecipes,
                                      setTopRatedRecipe,
                                      setFetchingDone , setSelectedMealTypes , setSelectedDietTypes , setSelectedCuisineTypes}:{setFetchedRecipes:Dispatch<RecipeType[]>,
                                      setTopRatedRecipe:Dispatch<RecipeType>,
                                      setFetchingDone:Dispatch<boolean> , setSelectedMealTypes:Dispatch<string[]> , setSelectedDietTypes:Dispatch<string[]>
    setSelectedCuisineTypes:Dispatch<string[]>}) => {
    async function handleFilterReset() {
            setSelectedDietTypes([])
            setSelectedMealTypes([])
            setSelectedCuisineTypes([])
            const { allRecipes, mostRatedRecipe } = await fetchAllRecipes(setFetchingDone);
            setFetchedRecipes(allRecipes as RecipeType[]);
            setTopRatedRecipe(mostRatedRecipe as RecipeType);
    }
    return (
        <div style={{
            height: "80vh",
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Stack>
                <Title style={{textAlign: 'center'}}>Oops! No recipes found</Title>
                <Text fw={600} size='lg' style={{textAlign: 'center'}}>Why not be the first to create one?</Text>
                <Button onClick={() => handleFilterReset()} variant='filled' color='yellow'>Reset Filters</Button>
            </Stack>
        </div>
    );
};