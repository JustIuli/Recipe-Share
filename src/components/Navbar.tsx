import {Box, Button, rem, Stack, Text, TextInput, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {Search} from "lucide-react";
import {User} from "../types/user.ts";


const Navbar = ({activeLink , handleLogout , user}:{activeLink:(path:string) => 'yellow' | 'dimmed' , handleLogout:()=>void , user:undefined|User}) => {
    const navigate = useNavigate()
    return (
        <Stack>
            {user && (
                <>
                    <UnstyledButton fw={600} c={activeLink('/profile')} size='compact-md' variant='transparent'
                                    onClick={() => navigate(`/profile/${user.uid}`)}>Your Profile</UnstyledButton>
                    <UnstyledButton fw={600} c={activeLink('/saved-recipes')} size='compact-md' variant='transparent'
                                    onClick={() => navigate('/saved-recipes')}>Saved Recipes</UnstyledButton>
                </>
            )}
            <UnstyledButton fw={600} c={activeLink('/recipes')} size='compact-md' variant='transparent'
                            onClick={() => navigate('/recipes')}>All Recipes</UnstyledButton>
            <Box>
                <Text c='dimmed' fw={700}>Search Recipes</Text>
                <form style={{display: 'flex', alignItems: 'center'}}>
                    <TextInput placeholder='Search...'
                               aria-label={'Search Recipes'}
                               leftSection={<Search style={{width: rem(14), height: rem(14)}}/>}
                               style={{flex: 1}} hiddenFrom='md'/>
                    <Button variant='outline' color='yellow'>Go</Button>
                </form>
            </Box>
            {user && (
                <UnstyledButton fw={600} c='dimmed' size='compact-md' variant='transparent' onClick={handleLogout}>Log
                    out</UnstyledButton>
            )}
        </Stack>
    );
};

export default Navbar;