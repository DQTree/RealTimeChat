'use client'

import React, {FormEvent, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useSocket} from "@/components/context/SocketContext";
import {redirect} from "next/navigation";
import {useAuth} from "@/components/context/AuthContext";

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
        if (isLoggedIn) {
            redirect('/chat');
        }
    }, [isLoggedIn]);

    return(
        <div id="login">
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
