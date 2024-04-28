import {useEffect, useState} from 'react';
import Loading from "./Loading.tsx";
import styles from "../assets/css/recipes.module.css";
import {Stack, Text, Title} from "@mantine/core";
import RecipeWrapper from "../components/RecipeWrapper.tsx";
import Recipe from "../components/Recipe.tsx";
import RecipesLayout from "../layouts/RecipesLayout.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../libs/firebase/firebase.ts";
import {User as UserType} from "../types/user.ts";
import {collection, getDocs, query, where} from "firebase/firestore";
import toast from "react-hot-toast";

const LikedRecipes = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState<UserType | undefined>();
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
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
            setFetchingDone(true);
        }
    };
    useEffect(() => {
        if (loading || fetchingDone) return;
        if(user) fetchUserData();
    }, [user, loading]);
    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDone ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div>

                            <div className={styles.content}>

                                <Title my="sm">Liked Recipes</Title>

                                {userData && userData.likedRecipes.length > 0 ?
                                    <RecipeWrapper>
                                        {userData.likedRecipes.map((recipe, index) => (
                                            <Recipe
                                                key={index}
                                                recipeSlug={recipe.slug}
                                                numberOfIngredients={recipe.ingredients.length}
                                                thumbnailPhoto={recipe.thumbnailPhoto}
                                                timeToPrepare={recipe.prepTime.minutes + recipe.cookTime.minutes}
                                                title={recipe.title}
                                            />
                                        ))}
                                    </RecipeWrapper> : <div style={{
                                        height: "30vh",
                                        width: "100%",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Stack>
                                            <Title style={{textAlign: 'center'}}>No liked recipes</Title>
                                            <Text c='dimmed' fw={600} size='lg' style={{textAlign: 'center'}}>
                                                You haven't liked any recipes yet
                                            </Text>
                                        </Stack>
                                    </div>}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </RecipesLayout>
    );
};

export default LikedRecipes;