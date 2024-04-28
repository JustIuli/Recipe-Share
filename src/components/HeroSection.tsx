import classes from "../assets/css/homeHeroSection.module.css";
import {Button, Container, Group, Image, List, rem, Text, ThemeIcon, Title} from "@mantine/core";
import {Check} from "lucide-react";
import appOnPhonePic from "../../public/images/appOnPhone.png";
import {User} from "../types/user.ts";
import {useNavigate} from "react-router-dom";


const HeroSection = ({user} : {user:null|undefined|User}) => {
    const navigate = useNavigate();
    return (
        <Container size="md">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Text variant="gradient"
                           gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                          className={classes.title}>
                        Season
                    </Text>
                    <Title order={2}>
                        Food Your Way
                    </Title>
                    <Text c="dimmed" size="lg" mt="md">
                        Introducing the ultimate food companion: your go-to app for saving, discovering, and sharing recipes with ease.
                    </Text>

                    <List
                        mt={30}
                        spacing="md"
                        size="sm"
                        icon={
                            <ThemeIcon color='yellow' size={20} radius="sm">
                                <Check style={{ width: rem(12), height: rem(12) }} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>Unlimited Access</b> – Explore a vast collection of mouth-watering recipes, from family favorites to exotic cuisines, all at your fingertips.
                        </List.Item>
                        <List.Item>
                            <b>Effortless Cooking</b> – Discover recipes that are not only delicious but also simple and quick to prepare, making every mealtime a breeze.
                        </List.Item>
                        <List.Item>
                            <b>No Interruptions</b> – Enjoy a distraction-free cooking experience with our ad-free environment, allowing you to focus solely on creating culinary masterpieces.
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        {user ?  <Button onClick={() => navigate('/recipes')} color='yellow' fullWidth radius="xl" size="md" className={classes.control}>
                            Continue
                        </Button> : <Button onClick={() => navigate('/auth/sign-in')} color='yellow' fullWidth radius="xl" size="md" className={classes.control}>
                            Get started now
                        </Button>}
                    </Group>
                </div>
                <Image src={appOnPhonePic} className={classes.image} />
            </div>
        </Container>
    );
};

export default HeroSection;