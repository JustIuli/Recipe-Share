import {Button, Modal, MultiSelect, Stack, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {cuisineTypes, dietTypes, mealTypes} from "../constants/recipeFilters.ts";
import {Dispatch} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../libs/firebase/firebase.ts";
import {Recipe} from "../types/recipe.ts";
import toast from "react-hot-toast";
const RecipeFilters = ({setRecipes , setUsingFilter ,
                           selectedMealTypes , selectedDietTypes ,
                           selectedCuisineTypes , setSelectedMealTypes , setSelectedDietTypes,
                           setSelectedCuisineTypes , resetFilters , usingFilter}:{
                            setRecipes:Dispatch<Recipe[]>,setUsingFilter:Dispatch<boolean>
                            selectedMealTypes:string[] , selectedDietTypes:string[],
                            selectedCuisineTypes:string[], setSelectedMealTypes:Dispatch<string[]> , setSelectedDietTypes:Dispatch<string[]>
                            setSelectedCuisineTypes:Dispatch<string[]> , resetFilters:() => void , usingFilter:boolean}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const applyFilters = async () => {
        try {
            let recipesQuery = collection(db, 'recipes');
            setUsingFilter(true)
            const filters = [
                { filterKey: 'mealType', selectedValues: selectedMealTypes },
                { filterKey: 'dietType', selectedValues: selectedDietTypes },
                { filterKey: 'cuisineType', selectedValues: selectedCuisineTypes }
            ];
            filters.forEach(filter => {
                if (filter.selectedValues.length > 0) {
                    // @ts-expect-error: can't typehint
                    recipesQuery = query(recipesQuery, where(filter.filterKey, 'in', filter.selectedValues));
                }
            });

            const querySnapshot = await getDocs(recipesQuery);
            const recipesData = querySnapshot.docs.map(doc => doc.data());
            setRecipes(recipesData as Recipe[]);
            close();
            toast.success("Filters applied!");
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <>
            <Modal opened={opened} centered onClose={close} title="Filters">
                <Stack>
                    <Text c='dimmed'>Narrow down your search by selecting from the filters below</Text>
                    <MultiSelect
                        label="Meal Type"
                        placeholder="Select desired meal type"
                        data={mealTypes}
                        value={selectedMealTypes}
                        onChange={setSelectedMealTypes}
                        searchable
                        comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false } }}
                        nothingFoundMessage="No meal type found..."
                    />
                    <MultiSelect
                        label="Diet Type"
                        placeholder="Pick a diet"
                        data={dietTypes}
                        value={selectedDietTypes}
                        onChange={setSelectedDietTypes}
                        searchable
                        nothingFoundMessage="No diet type found"
                    />
                    <MultiSelect
                        label="Cuisine Type"
                        placeholder="Pick a cuisine"
                        data={cuisineTypes}
                        value={selectedCuisineTypes}
                        onChange={setSelectedCuisineTypes}
                        searchable
                        nothingFoundMessage="No cuisine type found..."
                    />
                    <Button onClick={applyFilters} color='yellow'>Apply</Button>
                </Stack>
            </Modal>
            {usingFilter ? <Button variant='filled' color='yellow' onClick={resetFilters}>Reset</Button> :
            <Button variant='filled' color='yellow' onClick={open}>Filters</Button>}
        </>
);
};

export default RecipeFilters;