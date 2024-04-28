import classes from '../assets/css/signup.module.css'
import {Button, FileInput, Group, PasswordInput, Stack, Text, TextInput} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {useEffect} from "react";
import {useForm} from "@mantine/form";
import registerWithEmailAndPassword from "../libs/firebase/auth/registerWithEmailAndPassword.ts";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout.tsx";

const SignUp = () => {
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
            name: '',
            email: '',
            password: '',
            profilePic:undefined,
        },

        validate: {
            name: (value) =>
                value.length < 5
                    ? 'Name must be at least 5 characters'
                    : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 8
                    ? 'Password must be at least 8 characters'
                    : null,
        },
    });

    function handleFormSubmit(values: ReturnType<(values: {
        password: string;
        profilePic: undefined;
        name: string;
        email: string
    }) => { password: string; profilePic: undefined; name: string; email: string }>) {
        if(!values.profilePic){
            toast.error('Please add a profile picture')
        }else{
            try{
                registerWithEmailAndPassword(values.name , values.email, values.password , values.profilePic).then(() => {
                    return navigate('/recipes');
                })
            }catch(e){
                toast.error('There was an error creating your account. Please try again.');
            }
        }
    }

    return (
        <AuthLayout title={'Sign Up'}>
            <form className={classes.formWrapper} onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
                <Stack gap={'22px'}>
                    <TextInput
                        withAsterisk
                        aria-label='Full Name'
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        withAsterisk
                        aria-label='Email'
                        label="Email"
                        placeholder="Enter your email adress"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        withAsterisk
                        aria-label='Password'
                        label="Password"
                        placeholder='Enter your password'
                        {...form.getInputProps('password')}
                    />
                    <FileInput {...form.getInputProps('profilePic')}
                               withAsterisk
                               accept="image/png,image/jpeg"
                               label="Upload profile picture"
                               placeholder="Upload a profile picture"/>

                    <div className={classes.formSectionInputWrapper}>

                        <Button type='submit' variant="gradient"
                                gradient={{from: 'red', to: 'yellow', deg: 90}} fullWidth>Get Started Now</Button>

                        <Group mt='sm'>
                            <Text>Already got an account?</Text>
                            <Link className={classes.authLink} to={'/auth/sign-in'}>Sign in</Link>
                        </Group>
                    </div>
                </Stack>
            </form>
        </AuthLayout>
    );
};

export default SignUp;