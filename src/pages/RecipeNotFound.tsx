import RecipesLayout from "../layouts/RecipesLayout.tsx";
import {Stack, Title} from "@mantine/core";
import {Link} from "react-router-dom";


const RecipeNotFound = () => {
    return (
        <RecipesLayout setRecipes={null} setUsingSearch={null}>
            <div style={{
                height: "80vh",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Stack>
                    <Title  style={{textAlign: 'center' , fontSize: '4rem'}}>404</Title>
                    <Link to={'/recipes'} style={{textAlign: 'center' , color: '#f78014' , textDecoration:'none' , fontSize: '1.4rem'}}>Recipes
                        Go to the home page
                    </Link>
                </Stack>
            </div>
        </RecipesLayout>
    );
};

export default RecipeNotFound;