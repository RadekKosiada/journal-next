"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await axios.post('/api/register', { email, password });
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={(event: FormEvent) => handleSubmit(event)}>
                <div>
                    <label>E-mail</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email" required
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        minLength={8} required
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <input type="submit" value="Register" />
            </form>
        </>
    )
}