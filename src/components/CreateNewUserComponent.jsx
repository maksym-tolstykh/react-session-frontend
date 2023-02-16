import { Avatar, Box, Button, Container, CssBaseline, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

export default function CreateNewUserComponent() {
    const [userRole, setUserRole] = React.useState('user');

    const handleChange = (event) => {
        setUserRole(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await axios.post("/users", {
            name: data.get('firstName'),
            lastName: data.get('lastName') || "",
            email: data.get('email'),
            password: data.get('password'),
            confPassword: data.get('confirmPassword'),
            role: userRole,
        });
        alert(res?.data?.msg);

    };

    return (
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                autoComplete="confirmPassword"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="role">Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role"
                                value={userRole}
                                label="Age"
                                defaultValue={userRole}
                                onChange={handleChange}
                            >
                                <MenuItem value={"user"}>user</MenuItem>
                                <MenuItem value={"admin"}>admin</MenuItem>

                            </Select>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create new user
                    </Button>
                </Box>
            </Box>
        </Container>

    )
}
