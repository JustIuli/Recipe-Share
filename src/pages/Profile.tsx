import {useNavigate, useParams} from "react-router-dom";
import Loading from "./Loading.tsx";
import styles from "../assets/css/recipes.module.css";
import {Button,Group, Stack, Text, Title} from "@mantine/core";
import RecipesLayout from "../layouts/RecipesLayout.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {useEffect, useState} from "react";
import {User} from "../types/user.ts";
import {Recipe as RecipeType} from "../types/recipe.ts";
import RecipeWrapper from "../components/RecipeWrapper.tsx";
import Recipe from "../components/Recipe.tsx";
import {MenuIcon, SettingsIcon} from "lucide-react";
import addFollow from "../utils/addFollow.ts";
import fetchUserDataByUID from "../utils/fetchUserDataByUID.ts";
import checkFollowing from "../utils/checkFollowing.ts";

const Profile = () => {
    const { userUID } = useParams();
    const [user, loading] = useAuthState(auth);
    const [processing, setProcessing] = useState<boolean>(false);
    const [userData, setUserData] = useState<User | undefined>();
    const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false);
    const [fetchedRecipes, setFetchedRecipes] = useState<RecipeType[]>([]);
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if(userUID){
            fetchUserDataByUID(setUserData , setFetchingDone , setFetchedRecipes , userUID)
        }else{
            return navigate('/recipes')
        }
    }, [user, loading , userUID]);

    useEffect(() => {
        if(user && userData) {
            setIsFollowingUser(checkFollowing(userData , user as unknown as User));
        }
    }, [user, userData]);

    function handleFollow() {
        if(userUID && user && user.email && userData && user.uid != userUID){
            addFollow(user.email , userData.email , setProcessing).then(() => {
                fetchUserDataByUID(setUserData , setFetchingDone , setFetchedRecipes , userUID)
            })
        }
    }
    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDone ? <Loading/> :
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div>
                            <div className={styles.content}>
                                <Group justify={'space-between'}>
                                    <Group>
                                        <img style={{borderRadius: '50%'}} width={130} height={130}
                                             src={userData?.profilePhoto} alt={`${userData?.name} photo`}/>
                                        <Stack>
                                                <Title fw={800}>{userData?.name}</Title>
                                                <Group>
                                                    <Text fw={500} c='dimmed'>
                                                        <span style={{fontWeight:'bold' , color:'black'}}>
                                                        {userData?.followers.length}
                                                        </span> Followers
                                                    </Text>
                                                    <Text fw={500} c='dimmed'>
                                                        <span style={{fontWeight:'bold' , color:'black'}}>
                                                            {userData?.following.length}
                                                        </span> Following
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        </Group>
                                        <Group>
                                            {user && userData &&
                                                user.uid === userData.uid ?
                                                    <Button variant='transparent' onClick={() => navigate('/settings')} c='dimmed' leftSection={<SettingsIcon />}>Settings</Button>
                                                : <Button loading={processing} gradient={{ from: 'red', to: 'yellow', deg: 135 }}
                                                          variant='gradient'
                                                          onClick={() => handleFollow()}>
                                                    {isFollowingUser ? 'Following' : 'Follow'}
                                                </Button>
                                            }
                                        </Group>
                                    </Group>
                                    <Text c='dimmed' mx='sm' my='lg'>
                                        {userData?.description}
                                    </Text>
                                    <Group justify='space-between'>
                                        <Title mb={'sm'}>Created Recipes</Title>
                                        {user && userData && user.uid === userData.uid &&
                                        <Button variant='transparent' onClick={() => navigate('/your-recipes')} c='dimmed' leftSection={<MenuIcon />}>Manage</Button>
                                        }
                                    </Group>
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
                                    </RecipeWrapper> : <div style={{
                                            height: "30vh",
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Stack>
                                                <Title style={{textAlign: 'center'}}>No recipes</Title>
                                                <Text c='dimmed' fw={600} size='lg' style={{textAlign: 'center'}}>
                                                    {user?.uid && userData?.uid
                                                        ? user.uid === userData.uid
                                                            ? "You haven't created any recipes yet"
                                                            : `${userData?.name || 'This user'} hasn't created a recipe yet`
                                                        : `${userData?.name || 'This user'} hasn't created a recipe yet`}
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

export default Profile;