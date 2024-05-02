'use client'

import React, {FormEvent, useState} from "react";
import {redirect} from "next/navigation";
import {useAuth} from "@/components/context/AuthContext";
import {Button, Container, FormGroup, TextField} from "@mui/material";

export default function Register() {
    const {register, isLoggedIn} = useAuth()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await register(username, email, password)

        if(isLoggedIn){
            redirect('/chat')
        }

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <Container maxWidth="xs">
            <div id="registration">
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <TextField
                            type="text"
                            label="Username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            type="email"
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            type="password"
                            label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>

                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
}
