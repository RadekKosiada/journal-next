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
                        // @ts-expect-error TODO: solve the type problem
                        defaultValue={state?.email}                    
                    />
                    {state?.errors?.email && <p className="error">{state.errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        minLength={8} required
                    />
                    {state?.errors?.password && <div className="error">
                        <p>Password must: </p>
                        <ul>
                            {state.errors.password.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm your password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="confirmPassword"
                        minLength={8} required
                    />
                     {state?.errors?.confirmPassword && 
                     <p className="error">{state.errors.confirmPassword}</p>}
                </div>
                <input disabled={isPending} type="submit" 
                    value={isPending ? "Loading..." : "Register"} />
            </form>
        </>
    )
}