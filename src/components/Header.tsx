import {Burger, Button, Group, Menu, rem, Text, TextInput, UnstyledButton} from "@mantine/core";
import {ChevronDown, ChevronUp, CookingPot, Heart, LogOut, Search, Tag, User} from "lucide-react";
import logout from "../libs/firebase/auth/logout.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {User as UserType} from '../types/user.ts'
const Header = ({user , userData , handleSearch , opened , toggle}:{opened:boolean , toggle:() => void , user:UserType | null | undefined , userData:undefined|UserType,handleSearch:(values:{search:string}) => void}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname} = location;
    const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
    const activeLink = (link:string) => {
        if(pathname === link) return 'yellow'
    }

    const form = useForm({
        initialValues: {
            search: '',
        },

        validate: {
            search: (value) => (value.length > 1 ? null : 'Search keyword must be longer!')
        }
    });

    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
            <Group justify="space-between" style={{flex: 1}}>
                <Text
                    size="xl"
                    onClick={() => navigate('/recipes')}
                    fw={700}
                    variant="gradient"
                    gradient={{from: 'orange', to: 'yellow', deg: 158}}
                >
                    Season
                </Text>

                <form style={{flex: 1}} onSubmit={form.onSubmit((values) => handleSearch(values))}>
                    <TextInput {...form.getInputProps('search')} radius='lg' placeholder='Search...'
                               leftSection={<Search style={{width: rem(14), height: rem(14)}}/>}
                               style={{flex: 1}} visibleFrom='md'/>
                </form>

                <Group ml="xl" gap='md' visibleFrom="sm">
                    <UnstyledButton c={activeLink('/recipes/create')} size='compact-md'
                                    variant='transparent' onClick={() => navigate('/recipes/create')}>Create
                        Recipe</UnstyledButton>
                    <UnstyledButton c={activeLink('/recipes')} size='compact-md' variant='transparent'
                                    onClick={() => navigate('/recipes')}>Home</UnstyledButton>

                    {userData && userData.name && userData.profilePhoto && (
                        <Menu opened={userMenuOpened} onChange={setUserMenuOpened} shadow="md" width={200}>
                            <Menu.Target>
                                <Button c='dimmed' variant='transparent'
                                        leftSection={<img src={userData.profilePhoto}
                                                          style={{width: rem(26), height: rem(26), borderRadius: '50%'}}
                                                          alt={`${userData.name} profile picture`}/>}
                                        rightSection={userMenuOpened ? <ChevronUp/> : <ChevronDown/>}
                                >
                                    {userData.name.split(' ')[0]}
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Account</Menu.Label>
                                <Menu.Item onClick={() => navigate('/your-recipes')}
                                           leftSection={<CookingPot
                                               style={{width: rem(14), height: rem(14)}}/>}>
                                    Your Recipes
                                </Menu.Item>

                                <Menu.Item onClick={() => navigate('/saved-recipes')}
                                           leftSection={<Tag style={{width: rem(14), height: rem(14)}}/>}>
                                    Saved Recipes
                                </Menu.Item>

                                <Menu.Item onClick={() => navigate('/liked-recipes')}
                                           leftSection={<Heart style={{width: rem(14), height: rem(14)}}/>}>
                                    Liked Recipes
                                </Menu.Item>

                                <Menu.Item onClick={() => navigate(`/profile/${user?.uid}`)}
                                           leftSection={<User style={{width: rem(14), height: rem(14)}}/>}>
                                    Profile
                                </Menu.Item>

                                <Menu.Divider/>

                                <Menu.Label>Danger zone</Menu.Label>

                                <Menu.Item
                                    color="red"
                                    onClick={() => logout()}
                                    leftSection={<LogOut style={{width: rem(14), height: rem(14)}}/>}
                                >
                                    Log out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </Group>
            </Group>
        </Group>
    );
};

export default Header;