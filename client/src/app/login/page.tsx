'use client'

import React, {FormEvent, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useAuth} from "@/components/context/AuthContext";

import './page.css'
import {Button, Container, FormGroup, TextField} from "@mui/material";

export default function Login() {
    const {login, isLoggedIn} = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await login(username, password)

        if(isLoggedIn){
            redirect('/chat')
        }

        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        if (isLoggedIn) redirect('/chat');
    }, [isLoggedIn]);

    return (
        <Container maxWidth="xs">
            <div id="login">
                <form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <TextField
                            type="text"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <TextField
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>

                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </div>
        </Container>
    );
}
