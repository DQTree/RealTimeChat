'use client'

import React, {FormEvent, useState} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useSocket} from "@/components/context/SocketContext";
import {redirect} from "next/navigation";
import {useAuth} from "@/components/context/AuthContext";

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

    return(
        <div id="login">
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
