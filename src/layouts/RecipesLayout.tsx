import {
    AppShell, Avatar, Box, Button, Center, Group, Stack, Text,
} from "@mantine/core";
import {User as UserType} from "../types/user.ts";
import {Dispatch, ReactNode, useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {useLocation, useNavigate} from "react-router-dom";
import logout from "../libs/firebase/auth/logout.ts";
import {useDisclosure} from "@mantine/hooks";
import {Recipe} from "../types/recipe.ts";
import {searchByKeyword} from "../utils/searchByKeyword.ts";
import Header from "../components/Header.tsx";
import fetchUserData from "../utils/fetchUserData.ts";
import Navbar from "../components/Navbar.tsx";

const RecipesLayout = ({children , setRecipes = null , setUsingSearch = null}:{children:ReactNode , setRecipes:null|Dispatch<Recipe[]> , setUsingSearch:null|Dispatch<boolean> }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname} = location;
    const activeLink = (link:string) => {
        if(pathname === link) return 'yellow'; else return 'dimmed'
    }
    const [opened , {toggle}] = useDisclosure();
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState<UserType | undefined>();
    const [fetchingDone, setFetchingDone] = useState<boolean>(false);
    useEffect(() => {
        if (loading || fetchingDone) return;
        if(user) fetchUserData(setUserData , user.uid , setFetchingDone);
    }, [user, loading]);

    async function handleSearch(values: ReturnType<(values: { search: string }) => { search: string }>) {
        if(pathname === '/recipes'){
            const results = await searchByKeyword(values.search)
            if (setRecipes && setUsingSearch){
                setRecipes(results);
                setUsingSearch(true)
            }
        }else{
            navigate('/recipes')
        }
    }

    function handleLogout() {
        logout()
        window.location.href = '/recipes'
    }

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
                padding="md"
            >
                <AppShell.Header>
                    <Header user={user as unknown as UserType} userData={userData} handleSearch={handleSearch} opened={opened} toggle={toggle}/>
                </AppShell.Header>

                <AppShell.Navbar py="md" px={4}>
                    {user && userData && (
                            <Stack onClick={() => navigate(`/profile/${user.uid}`)} mb='md'>
                                <Center>
                                    <Avatar src={userData.profilePhoto} size='xl'/>
                                </Center>
                                <Box style={{textAlign:'center'}}>
                                    <Text fw={700}>{userData.name}</Text>
                                    <Text c='dimmed'>{userData.email}</Text>
                                </Box>
                                <Center>
                                    <Group gap='xs'>
                                        <Button fw={600} color='yellow' variant='filled' size='compact-md'
                                                onClick={() => navigate('/your-recipes')}>Your Recipes</Button>
                                        <Button fw={600} color='yellow' size='compact-md' variant='filled'
                                                onClick={() => navigate('/recipes/create')}>Add Recipe</Button>
                                    </Group>
                                </Center>
                            </Stack>
                    )}
                   <Navbar user={userData} activeLink={activeLink} handleLogout={handleLogout}/>
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    );
};

export default RecipesLayout;

/*

                                <UnstyledButton c='dimmed' size='compact-md' variant='transparent' onClick={logout}>Log out</UnstyledButton>

     <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <MantineLogo size={30} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>


* */


/*

<AppShell.Header>
                    <Group h="100%" px="md">
                        <Group w='100%' align="center" justify="space-between">
                            <Group align="center">
                                <Title order={3}>Season</Title>
                            </Group>
                            <Group gap={5}>
                                {colorScheme === 'dark' ? (
                                    <ThemeIcon
                                        variant="transparent"
                                        size="md"
                                        onClick={()=>setColorScheme("light")}
                                        aria-label="Set the theme to light"
                                        c='dimmed'
                                    >
                                        <Sun size={18}/>
                                    </ThemeIcon>
                                ):(
                                    <ThemeIcon
                                        variant="transparent"
                                        size="md"
                                        onClick={()=>setColorScheme("dark")}
                                        aria-label="Set the theme to dark"
                                        c='dimmed'
                                    >
                                        <Moon size={18}/>
                                    </ThemeIcon>
                                )}
                                {!loading && user ? (<>

                                    <Group gap={0}>

                                        <Button c='dimmed' size='compact-md' variant='transparent' onClick={logout}>Log out</Button>
                                        <Button c={activeLink('/recipes/create')} size='compact-md' variant='transparent' onClick={() => navigate('/recipes/create')}>Add Recipe</Button>
                                        <Button c={activeLink('/recipes')} size='compact-md' variant='transparent' onClick={() => navigate('/recipes')}>Home</Button>
                                        <Button c={activeLink('/your-recipes')} size='compact-md' variant='transparent' onClick={() => navigate('/your-recipes')}>Your recipes</Button>

                                    </Group>

                                </>):(
                                    <Button c='dimmed' variant='transparent' onClick={() => navigate('/auth/sign-in')}>Sign In</Button>
                                )}
                            </Group>
                        </Group>
                    </Group>
                </AppShell.Header>


 */