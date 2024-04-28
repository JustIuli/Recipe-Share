import {Button, Stack, Text, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";


const NoCreatedRecipes = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            height: "80vh",
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Stack>
                <Title style={{textAlign: 'center'}}>No created recipes</Title>
                <Text fw={600} size='lg' style={{textAlign: 'center'}}>Click on the button below to create one!</Text>
                <Button onClick={() => navigate('/recipes/create')} variant='filled' color='yellow'>Create
                    recipe</Button>
            </Stack>
        </div>
    );
};

export default NoCreatedRecipes;