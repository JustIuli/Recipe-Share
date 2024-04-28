import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '../assets/css/error.module.css';
const ErrorPage = () => {
    return (
        <div className={classes.root}>
            <Container>
                <Title className={classes.title}>Oops! Something Went Wrong...</Title>
                <Text size="lg" ta="center" className={classes.description}>
                    It seems we're experiencing some technical difficulties with the URL: <span style={{fontWeight:'bold'}}>{window.location.href}</span>. Please
                    accept our apologies for the inconvenience. You can try refreshing the page or come back later.
                </Text>
                <Group justify="center">
                    <Button variant="white" color={'yellow'} size="md" onClick={() => window.location.reload()}>
                        Refresh the Page
                    </Button>
                </Group>
            </Container>
        </div>

    );
};

export default ErrorPage;