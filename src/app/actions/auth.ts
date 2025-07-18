"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
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

    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    });
    
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            email: formData.get("email")
        }
    }

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const userCollection = await getCollection('users');
    console.log(userCollection);
}