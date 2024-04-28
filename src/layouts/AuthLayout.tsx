import {ReactNode} from 'react';
import classes from "../assets/css/signup.module.css";
import {Button, Center, Divider, Title} from "@mantine/core";
import signInWithGoogle from "../libs/firebase/auth/signInWithGoogle.ts";

const AuthLayout = ({children , title}:{children:ReactNode , title:string}) => {
    return (
        <section className="bg-white">
            <div className={classes.container}>
                <section className={classes.mainSection}>
                    <img alt=""
                         src="https://media.riverford.co.uk/images/seasonal-3000x2000-d5303831808877da662471a6a52e3507.jpg"
                         className={classes.mainSectionImage}/>

                    <div className={classes.mainSectionContent}>
                        <a style={{display: 'block', color: 'white'}} href="#">
                            <span className={classes.homeSpan}>Home</span>
                        </a>

                        <h2 className={classes.welcomeText}>Welcome to Season</h2>

                        <p className={classes.descriptionText}>An all-encompassing recipe-sharing app crafted with
                            passion for individuals keen on exchanging culinary delights.</p>
                    </div>
                </section>

                <main
                    className={classes.formSection}>
                    <div className={classes.formSectionContentWrapper}>
                        <div className={classes.formSectionInnerWrapper}>

                            <h1 className={classes.formSectionTitle}>Welcome to
                                Season</h1>

                            <p className={classes.formSectionDescription}>An all-encompassing recipe-sharing app crafted with
                                passion for individuals keen on exchanging culinary delights.</p>
                        </div>
                        <Center>
                            <Title>{title}</Title>
                        </Center>
                        <Button onClick={signInWithGoogle} justify="center" fullWidth leftSection={
                            <img height={17}
                                 src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                 alt=""/>} variant='white' color='black'>
                            Continue with Google
                        </Button>
                        <Divider my={'sm'} size='md' label="Or" labelPosition="center"/>
                        {children}
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;