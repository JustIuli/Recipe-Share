import {Link, useNavigate, useParams} from "react-router-dom";
import RecipesLayout from "../layouts/RecipesLayout.tsx";
import styles from "../assets/css/recipes.module.css";
import recipeIngredientsStyles from "../assets/css/recipeIngredients.module.css";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {useEffect, useState} from "react";
import Loading from "./Loading.tsx";
import RecipeHeader from "../components/RecipeHeader.tsx";
import fetchRecipeBySlug from "../utils/fetchRecipeBySlug.ts";
import {Box, Button, Card, Group, Text, Title} from "@mantine/core";
import {auth, db} from "../libs/firebase/firebase.ts";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, getDocs, query, where} from "firebase/firestore";
import {User as UserType} from "../types/user.ts";
import toast from "react-hot-toast";
import {saveRecipe} from "../utils/saveRecipe.ts";
import {Heart, Tag, ThumbsDown} from "lucide-react";
import {addReactionToRecipe} from "../utils/addReactionToRecipe.ts";
import AddComment from "../components/AddComment.tsx";


const Recipe = () => {
    const [recipeData, setRecipeData] = useState<RecipeType | undefined>(undefined);
    const [user, loading] = useAuthState(auth);
    const [fetchingDoneRecipe, setFetchingDoneRecipe] = useState<boolean>(false);
    const [fetchingDoneUserData, setFetchingDoneUserData] = useState<boolean>(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isRecipeSaved, setIsRecipeSaved] = useState(false);
    const [isRecipeLiked, setIsRecipeLiked] = useState(false);
    const [isRecipeDisliked, setIsRecipeDisliked] = useState(false);
    const [proccessing, setProccessing] = useState({
        save:false,
        like:false,
        dislike:false
    });
    const [userData, setUserData] = useState<UserType | undefined>();
    useEffect(() => {
        fetchRecipeBySlug(setRecipeData, setFetchingDoneRecipe, navigate, slug);
        if (!fetchingDoneRecipe) {
            return;
        }
    }, [fetchingDoneRecipe]);

    useEffect(() => {
        if (loading || fetchingDoneUserData) return;
        if(user) fetchUserData();
    }, [user, loading]);

    useEffect(() => {
        if(recipeData && userData){
            setIsRecipeSaved(userData.savedRecipes.some(savedRecipe => savedRecipe.slug === recipeData.slug))
            setIsRecipeLiked(userData.likedRecipes.some(likedRecipe => likedRecipe.slug === recipeData.slug))
            setIsRecipeDisliked(userData.dislikedRecipes.some(dislikedRecipe => dislikedRecipe.slug === recipeData.slug))
        }
    }, [recipeData, userData])

    const fetchUserData = async ():Promise<void> => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserData(data as UserType);
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while fetching user data");
        }
        finally{
            setFetchingDoneUserData(true);
        }
    };

    function handleSaveRecipe() {
        if(!recipeData || !user || !userData) return;
        saveRecipe(recipeData , userData.email , setProccessing).then(() => {
            if(isRecipeSaved){
                setIsRecipeSaved(false);
            }else {
                setIsRecipeSaved(true);
            }
        })
    }

    function handleAddReactToRecipe(typeOfReaction:'like'|'dislike') {
        if(!recipeData || !user || !userData) return;

        if(typeOfReaction == 'like'){
            addReactionToRecipe(recipeData , userData.email , setProccessing , 'like').then(() => {
                if(isRecipeLiked){
                    setIsRecipeLiked(false);
                }else {
                    setIsRecipeLiked(true);
                }
            })
        }else{
            addReactionToRecipe(recipeData , userData.email , setProccessing , 'dislike').then(() => {
                if(isRecipeDisliked){
                    setIsRecipeDisliked(false);
                }else {
                    setIsRecipeDisliked(true);
                }
            })
        }
    }

    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDoneRecipe || loading ? <Loading /> : (
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div>
                            <div>
                                { /* @ts-expect-error:It is not undefined after loading */}
                                <RecipeHeader user={userData} setRecipeData={setRecipeData} recipeData={recipeData}/>
                                <Title my='sm'>Ingredients</Title>
                                <div className={recipeIngredientsStyles.ingredientGrid}>
                                    { /* @ts-expect-error:It is not undefined after loading */}
                                    {recipeData.ingredients.map((ingredientUsed, index) => (
                                        <div className={recipeIngredientsStyles.ingredientItem} key={index}>
                                            <img className={recipeIngredientsStyles.ingredientImage} src={ingredientUsed.imageUrl}
                                                 alt={ingredientUsed.name}/>
                                            <div className={recipeIngredientsStyles.ingredientDetails}>
                                                {ingredientUsed.quantity !== 'not specified' && <span
                                                    className={recipeIngredientsStyles.ingredientQuantity}>{ingredientUsed.quantity}</span>}
                                                <p className={recipeIngredientsStyles.ingredientName}>{ingredientUsed.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {user ? <Title my='sm'>Reactions</Title> : <Box mt='md'>
                                    <Text fw={600}>{recipeData && recipeData.ratings.upvotes} people liked this recipe</Text>
                                    <Group gap={'5px'}>
                                        <Link to={'/auth/sign-in'} style={{textDecoration:"none",color:'orange',fontWeight:600}}>Sign in</Link>
                                        <Text fw={400}>to save or react to the recipe</Text>
                                    </Group>
                                </Box>}
                                {user && <Group>
                                    <Button variant='transparent'
                                            c={isRecipeSaved ? 'yellow' : 'dimmed'}
                                            leftSection={<Tag />}
                                            loading={proccessing.save}
                                            onClick={handleSaveRecipe}>{
                                        isRecipeSaved ? 'Saved' : 'Save'
                                    }</Button>
                                    <Button variant='transparent'
                                            c={isRecipeLiked ? 'red' : 'dimmed'}
                                            leftSection={<Heart />}
                                            loading={proccessing.like}
                                            onClick={() => handleAddReactToRecipe('like')}>{
                                            isRecipeLiked ? 'Liked' : 'Like'
                                        }
                                    </Button>
                                    <Button variant='transparent'
                                            c={isRecipeDisliked ? 'red' : 'dimmed'}
                                            leftSection={<ThumbsDown />}
                                            loading={proccessing.dislike}
                                            onClick={() => handleAddReactToRecipe('dislike')}>{
                                            isRecipeDisliked ? 'Disliked' : 'Dislike'
                                        }
                                    </Button>
                                </Group>}
                                <Title my='sm'>Instructions</Title>
                                { /* @ts-expect-error:It is not undefined after loading */}
                                {recipeData.steps.map((step, index) => (
                                 <Card mb='sm' shadow="sm" px="sm" radius="md" withBorder key={index}>
                                            <Text size='xl' fw={900}>Step {step.step}</Text>
                                            <Text className={recipeIngredientsStyles.text}>{step.content}</Text>
                                    </Card>
                                ))}
                                <Title my='sm'>Comments({recipeData?.comments.length})</Title>
                                <AddComment user={userData} setRecipeData={setRecipeData} recipeData={recipeData}/>
                                {recipeData?.comments.map((comment, index) => (
                                    <Card mb='sm' shadow="sm" px="sm" radius="md" withBorder key={index}>
                                        <Group mb='sm' gap='sm'>
                                            <img src={comment.author.photo} style={{borderRadius:'30%'}} width={32} height={32} alt={`${comment.author.name} profile pic`}/>
                                            <Text size='xl' fw={900}>{comment.author.name}</Text>
                                        </Group>
                                        <Text>{comment.content}</Text>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </RecipesLayout>
    );
};

export default Recipe;