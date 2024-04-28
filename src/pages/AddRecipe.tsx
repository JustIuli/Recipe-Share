import styles from "../assets/css/recipes.module.css";
import {
    Button,
    FileInput,
    Flex,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
    Title
} from "@mantine/core";
import {cuisineTypes, dietTypes, mealTypes} from "../constants/recipeFilters.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import {addIngredient} from "../utils/addIngredient.ts";
import RecipesLayout from "../layouts/RecipesLayout.tsx";
import IngredientsInput from "../components/IngredientsInput.tsx";
import {addStep} from "../utils/addStep.ts";
import {InstructionsInput} from "../components/InstructionInput.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../libs/firebase/firebase.ts"
import { collection, addDoc} from "firebase/firestore";
import Loading from "./Loading.tsx";
import {Ingredients, NewRecipe, RecipeFormValues, RecipeStep} from "../types/recipe.ts";
import {User} from "../types/user.ts";
import {capitalizeWords} from "../utils/capitalizeWords.ts";
import {uploadImageToStorage} from "../utils/uploadImageToStorage.ts";
import fetchUserData from "../utils/fetchUserData.ts";
const AddRecipe = () => {
    const [inputTextInstruction, setInputTextInstruction] = useState<string>('');
    const [steps, setSteps] = useState<RecipeStep[]>([]);
    const [proccesingRecipe, setProccesingRecipe] = useState<boolean>(false);
    const [stepsLength, setStepsLength] = useState<number>(0);
    const [ingredients, setIngredients] = useState<Ingredients[]>([]);
    const [inputTextIngredient, setInputTextIngredient] = useState<string>('');
    const form = useForm({
        initialValues: {
            title:'',
            description:'',
            servings:2,
            cuisineType:undefined,
            mealType:undefined,
            dietType:undefined,
            prepTimeHours:0,
            prepTimeMinutes:0,
            cookTimeHours:0,
            cookTimeMinutes:0,
            recipeThumbnail:undefined,
        },
        validate: {}
    });

    const [userData, setUserData] = useState<User | undefined>();
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/auth/sign-in");
        fetchUserData(setUserData , user.uid , setFetchingDone);
    }, [user, loading]);

    function handleIngredientDelete(ingredientToRemove:string){
        setIngredients(() => {
            return ingredients.filter(ingredient => ingredient.name.toLowerCase() !== ingredientToRemove.toLowerCase())
        })
    }

    const handleInputChangeIngredient = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTextIngredient(e.target.value);
    };

    function handleAddIngredient() {
        addIngredient(setIngredients,setInputTextIngredient,ingredients,inputTextIngredient)
    }

    const handleAddStep = () => {
        addStep(inputTextInstruction,setSteps,steps,stepsLength,setInputTextInstruction,setStepsLength)
    };
    function handleStepDelete(content: string) {
        setSteps(() => {
            return steps.filter(step => step.content !== content)
        })
        setStepsLength(stepsLength => stepsLength - 1)
    }
    const handleInputChangeInstruction = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTextInstruction(e.target.value);
    };

    const addRecipe = async (values: RecipeFormValues) => {
        const fields = {
            title: values.title,
            description: values.description,
            servings: values.servings,
            cuisineType: values.cuisineType,
            mealType: values.mealType,
            dietType: values.dietType,
            recipeThumbnail: values.recipeThumbnail,
        };

        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (!fieldValue) {
                toast.error(`${capitalizeWords(fieldName)} is required`);
                return;
            }
        }

        if(!userData){
            return;
        }

       const imageURL:string =  await uploadImageToStorage(values.recipeThumbnail);

        const uuid = uuidv4();
        const generatedSlug = uuid.replace(/-/g, '').substr(0, 7);
        try {
            const newRecipe: NewRecipe = {
                author: {
                    name: userData.name,
                    photo: userData.profilePhoto,
                    uid:userData.uid,
                },
                comments: [],
                cuisineType: values.cuisineType,
                description: values.description,
                dietType: values.dietType,
                ingredients: ingredients,
                mealType: values.mealType,
                prepTime: {
                    hours: values.prepTimeHours,
                    minutes: values.prepTimeMinutes,
                },
                cookTime: {
                    hours: values.cookTimeHours,
                    minutes: values.cookTimeMinutes,
                },
                ratings: {
                    downvotes: 0,
                    upvotes: 0
                },
                slug: generatedSlug,
                steps: steps,
                thumbnailPhoto: imageURL,
                title: values.title
            };
            setProccesingRecipe(true);
            await addDoc(collection(db, "recipes"), newRecipe);
            return navigate(`/recipe/${generatedSlug}`);
        } catch (error) {
            console.error(error);
            setProccesingRecipe(false)
        }
    }
    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDone ? <Loading /> : <div className={styles.container}>
                <div className={styles.wrapper}>

                    <div>

                        <div className={styles.content}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '12px',
                                justifyContent: 'space-between'
                            }}>
                                <Title>Create new recipe</Title>
                            </div>

                            { /* @ts-expect-error:It is not undefined */}
                            <form id='recipeForm' onSubmit={form.onSubmit((values) => addRecipe(values))}>
                                <Stack gap={'22px'}>
                                    <TextInput
                                        withAsterisk
                                        aria-label='Title of recipe'
                                        label="Title of the recipe"
                                        placeholder="Give your recipe a name"
                                        {...form.getInputProps('title')}
                                    />
                                    <Textarea
                                        withAsterisk
                                        resize="vertical"
                                        aria-label='Description of recipe'
                                        label="Description of the recipe"
                                        placeholder="Introduce your recipe , add notes , cooking tips , serving , suggestions , etc..."
                                        {...form.getInputProps('description')}
                                    />
                                    <IngredientsInput ingredients={ingredients}
                                                      inputTextIngredient={inputTextIngredient}
                                                      handleInputChangeIngredient={handleInputChangeIngredient}
                                                      handleAddIngredient={handleAddIngredient}
                                                      handleIngredientDelete={handleIngredientDelete}
                                    />
                                    <InstructionsInput steps={steps}
                                                       inputTextInstructions={inputTextInstruction}
                                                       handleInputChangeInstructions={handleInputChangeInstruction}
                                                       handleAddStep={handleAddStep}
                                                       handleStepDelete={handleStepDelete}
                                    />
                                    <Select
                                        label="Meal Type"
                                        placeholder="Select desired meal type"
                                        data={mealTypes}
                                        searchable
                                        comboboxProps={{position: 'bottom', middlewares: {flip: false, shift: false}}}
                                        nothingFoundMessage="No meal type found..."
                                        {...form.getInputProps('mealType')}
                                    />
                                    <Select
                                        label="Diet Type"
                                        placeholder="Pick a diet"
                                        data={dietTypes}
                                        searchable
                                        nothingFoundMessage="No diet type found"
                                        {...form.getInputProps('dietType')}
                                    />
                                    <Select
                                        label="Cuisine Type"
                                        placeholder="Pick a cuisine"
                                        data={cuisineTypes}
                                        searchable
                                        nothingFoundMessage="No cuisine type found..."
                                        {...form.getInputProps('cuisineType')}
                                    />

                                    <Flex align='center' gap='sm'>
                                        <NumberInput
                                            withAsterisk
                                            label="Cook Time"
                                            w='50%'
                                            allowNegative={false}
                                            aria-label='Cook Time in hours'
                                            placeholder="Number of hours"
                                            {...form.getInputProps('cookTimeHours')}
                                        />
                                        <NumberInput
                                            label={<span style={{opacity: '0'}}>Cook time</span>}
                                            w='50%'
                                            min={1} max={59}
                                            allowNegative={false}
                                            aria-label='Cook Time in minutes'
                                            placeholder="Number of minutes"
                                            {...form.getInputProps('cookTimeMinutes')}
                                        />
                                    </Flex>
                                    <Flex align='center' gap='sm'>
                                        <NumberInput
                                            withAsterisk
                                            label="Prep Time"
                                            w='50%'
                                            allowNegative={false}
                                            aria-label='Prep Time in hours'
                                            placeholder="Number of hours"
                                            {...form.getInputProps('prepTimeHours')}
                                        />
                                        <NumberInput
                                            label={<span style={{opacity: '0'}}>Prep time</span>}
                                            w='50%'
                                            aria-label='Prep Time in minutes'
                                            min={1} max={59}
                                            allowNegative={false}
                                            placeholder="Number of minutes"
                                            {...form.getInputProps('prepTimeMinutes')}
                                        />
                                    </Flex>
                                    <NumberInput
                                        withAsterisk
                                        label="How many portions does this recipe make?"
                                        allowNegative={false}
                                        aria-label='How many portions does this recipe make?'
                                        placeholder="Number of dishes"
                                        {...form.getInputProps('servings')}
                                    />
                                    <FileInput {...form.getInputProps('recipeThumbnail')}
                                               withAsterisk
                                               accept="image/png,image/jpeg"
                                               label="Photo of recipe"
                                               placeholder="Upload a photo that will be used as a thumbnail"
                                    />
                                </Stack>
                            </form>
                            <Button type='submit' my='sm' fullWidth form='recipeForm' loading={proccesingRecipe} variant="filled"
                                    color="yellow">Add Recipe</Button>
                        </div>

                    </div>

                </div>

            </div>}
        </RecipesLayout>
    );
};

export default AddRecipe;