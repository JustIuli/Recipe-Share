import styles from "../assets/css/recipes.module.css";
import RecipesLayout from "../layouts/RecipesLayout.tsx";
import {
    Box,
    Button,
    FileInput,
    Stack,
    Text,
    Textarea,
    Title
} from "@mantine/core";
import classes from "../assets/css/signup.module.css";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {User} from "../types/user.ts";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import Loading from "./Loading.tsx";
import updateSettings from "../utils/updateSettings.ts";
import fetchUserData from "../utils/fetchUserData.ts";


const Settings = () => {
    const [userData, setUserData] = useState<User | undefined>();
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/auth/sign-in");
        fetchUserData(setUserData , user.uid , setFetchingDone);
    }, [user, loading]);

    const form = useForm({
        initialValues: {
            description: userData?.description || '',
            profilePic: undefined,
        },
    })

    async function handleFormSubmit(values: ReturnType<(values: { profilePic: undefined; description: string }) => {
        profilePic: undefined;
        description: string
    }>) {
        if (!values.description && !values.profilePic) {
            return toast.error("You need to change something")
        }
        if (userData) {
            await updateSettings(values , userData.uid)
            toast.success("User updated successfully")
        }
    }

    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            {!fetchingDone ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div>
                            <div className={styles.content}>
                                <Box my='lg'>
                                    <Title mb='lg'>Settings</Title>
                                    <Text size='lg' fw={900}>Your profile</Text>
                                    <Text fw={900} c='dimmed'>Choose how your account looks like.</Text>
                                </Box>
                                <form action="#" className={classes.formWrapper} onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
                                    <Stack gap={'22px'} style={{maxWidth: '70%'}}>
                                        <Textarea
                                            aria-label='Description'
                                            label={<Text fw={600} c='dimmed'>Description</Text>}
                                            placeholder="Add a meaningful description about your account"
                                            {...form.getInputProps('description')}
                                        />
                                        <FileInput
                                                   accept="image/png,image/jpeg"
                                                   label={<Text fw={600} c='dimmed'>Profile photo</Text>}
                                                   placeholder="Upload a profile picture"
                                                   {...form.getInputProps('profilePic')}
                                        />
                                        <Box>
                                            <Button size='sm'
                                                    radius='lg' type='submit' variant='filled' color='yellow'>Save Changes</Button>
                                        </Box>
                                    </Stack>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> }
        </RecipesLayout>
    );
};

export default Settings;