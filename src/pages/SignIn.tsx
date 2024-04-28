import {TextInput, Stack, PasswordInput, Button, Group, Text} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import logInWithEmailAndPassword from "../libs/firebase/auth/logInWithEmailAndPassword.ts";
import {Link, useNavigate} from "react-router-dom";
import classes from '../assets/css/signup.module.css'
import AuthLayout from "../layouts/AuthLayout.tsx";

export const SignIn = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) return navigate('/recipes');
    }, [user, loading, navigate]);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 8
                    ? 'Password must be at least 8 characters'
                    : null,
        },
    });

    return (
        <AuthLayout title={'Sign In'}>
            <form className={classes.formWrapper}
                  onSubmit={form.onSubmit((values) => logInWithEmailAndPassword(values.email, values.password))}>
                <Stack gap={'22px'}>
                    <TextInput
                        withAsterisk
                        aria-label='Email Address'
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        aria-label='Password'
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                    />
                    <div className={classes.formSectionInputWrapper}>

                        <Button type='submit' variant="gradient"
                                gradient={{from: 'red', to: 'yellow', deg: 90}} fullWidth>Sign in</Button>

                        <Group mt='sm'>
                            <Text>Don't have an account?</Text>
                            <Link className={classes.authLink} to={'/auth/sign-up'}>Join now</Link>
                        </Group>
                    </div>
                </Stack>
            </form>
        </AuthLayout>
    );
};