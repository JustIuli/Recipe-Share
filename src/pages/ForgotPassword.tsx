import styles from '../assets/css/signin.module.css'
import {TextInput, Stack, Button, Flex} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../libs/firebase/firebase.ts";
import {Link, useNavigate} from "react-router-dom";
import sendPasswordResetEmail from "../libs/firebase/auth/sendPasswordReset.ts";

export const ForgotPassword = () => {
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
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={form.onSubmit((values) => sendPasswordResetEmail(values.email))}>
                    <h3 className={styles.heading}>Forgot your password?</h3>
                    <Stack gap={'22px'}>
                        <TextInput
                            withAsterisk
                            aria-label='Email Address'
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                        <div>
                            <Button loading={loading} fullWidth variant="filled" type="submit" color="yellow">Send</Button>
                            <Flex align='center' gap='10px' className={styles.forgotPassword}>
                                <p className={styles.signupText}>Got an account?</p>
                                <Link to="/auth/sign-in" className={styles.signupLink}>Sign in here </Link>
                            </Flex>
                        </div>
                    </Stack>
                </form>
            </div>
        </div>
    );
};