"use client";

import { FormEvent, useActionState } from "react";
import { register } from "../actions/auth";

export default function Registration() {
    const [state, action, isPending] = useActionState(register, undefined); 
    
    return (
        <>
            <h1>Register</h1>
            <form 
                action={action}
            >
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email" required                       
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        minLength={8} required
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm your password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="confirmPassword"
                        minLength={8} required
                    ></input>
                </div>
                <input type="submit" value="Register" />
            </form>
        </>
    )
}