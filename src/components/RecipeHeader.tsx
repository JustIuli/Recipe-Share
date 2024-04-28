import styles from "../assets/css/recipeHeader.module.css";
import {Recipe as RecipeType} from "../types/recipe.ts";
import {Group, Badge, Avatar} from "@mantine/core";
import {Dispatch} from "react";
import {Link} from "react-router-dom";
const RecipeHeader = ({recipeData}:{recipeData:RecipeType , setRecipeData:Dispatch<RecipeType> , user: {
        name: string,profilePhoto: string
    }}) => {
    return (
                        <article className={styles.container}>
                            <img
                                src={recipeData?.thumbnailPhoto}
                                alt={`${recipeData?.title} thumbnail`}
                                className={styles.image}
                            />

                            <div className={styles.content}>
                                <p className={styles.title}>{recipeData?.title}</p>
                                <Group>
                                    <Badge color="yellow">{recipeData.mealType}</Badge>
                                    <Badge color="yellow">{recipeData.dietType}</Badge>
                                    <Badge color="yellow">{recipeData.cuisineType}</Badge>
                                </Group>
                                <p className={styles.description}>{recipeData?.description}</p>
                                <div className={styles.author}>
                                    <Avatar className={styles.authorImage} src={recipeData.author.photo} alt="Recipe author's photo" />
                                    <Link className={styles.authorName} to={`/profile/${recipeData.author.uid}`}>{recipeData.author.name}</Link>
                                </div>
                            </div>
                        </article>
    );
};

export default RecipeHeader;