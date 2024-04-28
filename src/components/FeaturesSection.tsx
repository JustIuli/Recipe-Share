import classes from "../assets/css/homeFeaturesSection.module.css";
import { Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
import {PlusCircleIcon, Settings, TelescopeIcon, Users} from "lucide-react";
const FeaturesSection = () => {

    return (
        <Container size={700} className={classes.wrapper}>
            <Text c='yellow' className={classes.supTitle}>Why you should choose us</Text>

            <Title className={classes.title} order={2}>
                Season is not only for food gurus
            </Title>

            <Container size={660} p={0}>
                <Text c="dimmed" className={classes.description}>
                    Crafting delicious recipes is an electrifying experience with our app.
                    Every creation is like a symphony of flavors, with each ingredient
                    adding its own unique spark. Our recipes are packed full of essential
                    nutrients to nourish your culinary journey.
                </Text>
            </Container>

            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
                {

                    [
                        {
                            icon: <PlusCircleIcon />,
                            title: 'Create Recipes',
                            description: 'Craft your own culinary masterpieces and share them with the world.',
                        },
                        {
                            icon: <Settings />,
                            title: 'Manage Profile',
                            description: 'Effortlessly manage your profile, view your own recipes, and explore others’ creations.',
                        },
                        {
                            icon: <TelescopeIcon />,
                            title: 'Explore Recipes',
                            description: 'Browse a vast collection of recipes from fellow food enthusiasts and chefs.',
                        },
                        {
                            icon: <Users />,
                            title: 'Community Interaction',
                            description: 'Connect with other users, exchange tips, and engage in discussions about cooking.',
                        },
                    ].map((item , index) => (
                        <div className={classes.item} key={index}>
                            <ThemeIcon variant="white" color='yellow' className={classes.itemIcon} size={60} radius="md">
                                {item.icon}
                            </ThemeIcon>

                            <div>
                                <Text fw={700} fz="lg" className={classes.itemTitle}>
                                    {item.title}
                                </Text>
                                <Text c="dimmed">{item.description}</Text>
                            </div>
                        </div>
                    ))

                }
            </SimpleGrid>
        </Container>
    );
};

export default FeaturesSection;