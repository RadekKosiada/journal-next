import { z } from "zod";

export const RegisterFormSchema = z.object ({
    email: z.email({message: "Please enter a vaild e-mail"}).trim(),
    password: z.string()
        .min(1, { message: "Field must not be empty" })
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
        })
        .trim(),
    confirmPassword: z.string().trim()
}).check((ctx) => {
    if (ctx.value.password !== ctx.value.confirmPassword) {
        ctx.issues.push({
            code: "custom",
            message: `Password fields do not match`,
            input: ctx.value,
            path: ["confirmPassword"]
        })
    }
});