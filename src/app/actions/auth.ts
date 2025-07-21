"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
    errors?: {
        eventName?: string[];
        // eventLocation?: string[];
        // eventType?: string[];
        // eventStartDate?: string[];
        // eventEndDate?: string[];
        // eventHouses?: string[];
        // eventVictors?: string[];
        // eventLosers?: string[];
        // eventExtraNotes?: string[];
    };
    message?: string | null;
};

export async function register(state: any, formData: FormData ) {

    // validate form fields
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    });
    
    // if form fields invalid returns an error
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            email: formData.get("email")
        }
    }

    // const email = formData.get("email");
    // const password = formData.get("password");
    // const confirmPassword = formData.get("confirmPassword");

    // if validated, extracts form fields
    const { email, password } = validatedFields.data;

    const userCollection = await getCollection('users');
    
    // check if userCollection exists
    if(!userCollection) { 
        return {
            errors: { email: "Server error! "} 
        }
    }

    // check if user already exists
    const exisitingUser = await userCollection.findOne({email});
    if (exisitingUser) {
        return {
            errors: { email: "E-mail already exist in our database!"}
        }
    }

    // Hash the password, 10 represents how complicated the hashed PW should be
    const hashedPassword = await bcrypt.hash(password, 10)


    // Save in DB
    const results = await userCollection?.insertOne({ email, password: hashedPassword });

    // Create a session 
    await createSession(results.insertedId.toString());

    // redirect
    redirect("/dashboard");
}