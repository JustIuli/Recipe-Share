import {Button, Stack, Text, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const NoRecipes = () => {
    const navigate = useNavigate();
    return (
        <div style={{ height: "80vh" , width: "100%" , display: 'flex' , flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack>
                <Title style={{textAlign:'center'}}>No recipes</Title>
                <Text fw={600} size='lg' style={{textAlign:'center'}}>Be the first one to create one!</Text>
                <Button onClick={() => navigate('/recipes/create')} variant='filled' color='yellow'>Create recipe</Button>
            </Stack>
        </div>
    );
};