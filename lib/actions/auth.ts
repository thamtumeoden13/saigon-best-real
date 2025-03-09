"use server"

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import ratelimit from "../ratelimit"
import { redirect } from "next/navigation"

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) redirect('/too-fast');

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                message: result.error,
            };
        }

        return {
            success: true,
            message: "Sign in success",
        };

    } catch (error: any) {
        console.error(error, 'Sign in error')
        return {
            success: false,
            message: "Sign in error",
        };

    }

}

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) redirect('/too-fast');

    // check if user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser && existingUser.length > 0) {
        return {
            success: false,
            message: "User already exists",
        };
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db
            .insert(users)
            .values({
                fullName,
                email,
                universityId,
                password: hashedPassword,
                universityCard,
            });

        //  await signInWithCredentials({ email, password });   

        return {
            success: true,
            message: "User created successfully",
        };
    } catch (error: any) {
        console.error(error, 'Sign up error')
        return {
            success: false,
            message: "Sign up error",
        };
    }
}