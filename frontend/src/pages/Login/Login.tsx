import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../images/logo/logo.png';
import { ILoginResponse } from '../../interfaces/login.interface';
import { logIn } from '../../store/actions/auth.action';
import { getCookie } from '../../store/actions/cookies.action';
import { isEmptyObject } from '../../utils/helper';
import styles from './Login.module.css';
import { CircularProgress } from '@mui/material';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<
        ILoginResponse['errorMessage']
    >({});
    const [message, setMessage] = useState('');

    const theme = createTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (accessToken && accessToken.length > 30) {
            navigate('/');
        }
    }, []);

    const onEmailChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setErrorMessage({
            ...errorMessage,
            email: '',
        });
        setMessage('');
        setEmail(e.target.value);
    };

    const onPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setErrorMessage({
            ...errorMessage,
            password: '',
        });
        setMessage('');
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };
        setMessage('');
        setLoading(true);

        const response = await logIn(payload);
        setLoading(false);

        if (response && response.data && !isEmptyObject(response.data)) {
            navigate('/');
        } else {
            setErrorMessage(response.errorMessage);
            setMessage(response.message);
        }
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <img
                                src={logo}
                                className={styles.logo}
                                alt="logo"
                            />
                        </div>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            action="/"
                            method="post"
                            onSubmit={(e) => handleLogin(e)}
                        >
                            <Box>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => onEmailChange(e)}
                                    error={
                                        errorMessage && errorMessage.email
                                            ? true
                                            : false
                                    }
                                />
                                <span className={styles.error_message}>
                                    {errorMessage && errorMessage.email
                                        ? errorMessage.email
                                        : ''}
                                </span>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => onPasswordChange(e)}
                                    error={
                                        errorMessage && errorMessage.password
                                            ? true
                                            : false
                                    }
                                />
                                <span className={styles.error_message}>
                                    {errorMessage && errorMessage.password
                                        ? errorMessage.password
                                        : ''}
                                </span>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={14} />}
                                    <span className={styles.sign_in}>
                                        Log in
                                    </span>
                                </Button>
                                <div className={styles.error_message_server}>
                                    {message ? message : ''}
                                </div>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};
