import {Card, Image, Text, Box} from '@mantine/core';
import styles from "../assets/css/recipeWrapper.module.css";
import {Link} from "react-router-dom";
type RecipeProps = {
    recipeSlug:string,
    thumbnailPhoto:string,
    title:string,
    numberOfIngredients:number,
    timeToPrepare:number
}

const Recipe = ({ recipeSlug, thumbnailPhoto, title, numberOfIngredients, timeToPrepare }:RecipeProps) => {
    return (
        <Card className={styles.gridItem} padding="xs" radius="md">
            <Card.Section>
                <Link to={`/recipe/${recipeSlug}`} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={thumbnailPhoto}
                        height={260}
                        alt="Norway"
                    />
                </Link>
            </Card.Section>
            <Card.Section style={{height:'100%'}}>
                <Box style={{height:'80%'}} px='xs'  py='sm'>
                    <Link className={styles.title}
                          to={`/recipe/${recipeSlug}`}>
                        <Text fw={600}>{title}</Text>
                    </Link>
                </Box>



                <Box mx='xs' mb='sm'>
                    <Text size="sm" c="dimmed">
                        {numberOfIngredients} {' '} <span style={{fontWeight: 'bold'}}>Ingredients</span> {timeToPrepare}<span
                        style={{fontWeight: 'bold'}}>min</span>
                    </Text>
                </Box>
            </Card.Section>
        </Card>
    );
};

export default Recipe;
