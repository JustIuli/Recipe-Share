import classes from "../assets/css/homeFooterSection.module.css";
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import {Instagram, Twitter, Youtube} from "lucide-react";

const FooterSection = () => {

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Text>Season</Text>
                    <Text size="xs" c="dimmed" className={classes.description}>
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © 2024 Season. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Twitter style={{width: rem(18), height: rem(18)}} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Youtube style={{width: rem(18), height: rem(18)}}/>
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <Instagram style={{width: rem(18), height: rem(18)}}/>
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
    };

    export default FooterSection;