import {Dispatch} from 'react';
import styles from "../assets/css/recipeHeader.module.css";
import {Button, Flex, Group, Text, TextInput} from "@mantine/core";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {useForm} from "@mantine/form";
import toast from "react-hot-toast";
import {addComment} from "../utils/addComment.ts";
import {User} from "../types/user.ts";
import {Link} from "react-router-dom";

const AddComment = ({recipeData , setRecipeData , user}:{recipeData:RecipeType | undefined , setRecipeData:Dispatch<RecipeType> , user:User|undefined }) => {

    const form = useForm({
        initialValues: {
            comment: '',
        },

        validate: {
            comment: (value) =>
                value.length < 5
                    ? 'Comment must be at least 5 characters'
                    : null,
        },
    });
    const handleAddComment = async (values: { comment: string }) => {
        if(user && recipeData){
            const newComment = {
                author: {
                    name: user.name,
                    photo: user.profilePhoto,
                    uid:user.uid
                },
                content: values.comment,
            };
            const updatedRecipe: RecipeType = {
                ...recipeData,
                comments: [...recipeData.comments, newComment],
            };
            const {slug} = updatedRecipe;
            setRecipeData(updatedRecipe);
            toast.success("Comment added successfully.");
            form.setFieldValue('comment', '');
            await addComment(slug, updatedRecipe);
        }
    }
    return (
        <>
            {user ? (
                <>
                    <Text mb='sm'>Enjoyed this recipe? Have any tips or feedback? Feel free to share in the comments below!</Text>
                    <div className={styles.author}>
                        <img src={user.profilePhoto} alt={`Photo of author`} width={48} height={48}
                             className={styles.authorImage}/>
                        <form style={{width: '100%'}} className={styles.form}
                              onSubmit={form.onSubmit((values) => handleAddComment(values))}>
                            <Flex gap='xs'>
                                <TextInput
                                    withAsterisk
                                    style={{width: '80%'}}
                                    aria-label='Comment'
                                    placeholder="Share your thoughts! How was it?"
                                    {...form.getInputProps('comment')}
                                />
                                <Button type='submit' variant='filled'
                                        color='yellow'>Add</Button>
                            </Flex>
                        </form>
                    </div>
                </>
            ) :  <Group gap={'5px'}>
                <Link to={'/auth/sign-in'} style={{textDecoration:"none",color:'orange',fontWeight:600}}>Sign in</Link>
                <Text fw={400}>to leave a comment</Text>
            </Group>}
        </>
    );
};

export default AddComment;