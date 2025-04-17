"use server"

import { cookies } from "next/headers"

const setApiCookie = async (formData) => {
    const apiKey = formData.get("apiKey");

    // Basic validation
    if (!apiKey || apiKey.trim().length < 8) {
        console.error("Invalid API key format");
        return { success: false, error: "Invalid API key format" };
    }

    try {
        // Get the cookie store first
        const cookieStore = await cookies();

        // Set cookie with security options
        cookieStore.set("apiKey", apiKey, {
            httpOnly: true,     // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // Prevents CSRF
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
        });

        // Now check if the cookie was set successfully
        const apiKeyCookie = cookieStore.get("apiKey");

        if (apiKeyCookie) {
            // Set the flag cookie
            cookieStore.set("apiKeyFlag", "true", {
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            console.log("API key securely stored in cookie");
            return { success: true };
        } else {
            // Set the flag cookie to false
            cookieStore.set("apiKeyFlag", "false", {
                path: "/",
                maxAge: 30 * 24 * 60 * 60,
            });
            console.error("Failed to store API key");
            return { success: false, error: "Failed to store API key" };
        }
    } catch (error) {
        console.error("Error setting cookie:", error);
        // Set the flag cookie to false in case of error
        const cookieStore = await cookies();
        cookieStore.set("apiKeyFlag", "false", {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
        });
        return { success: false, error: "Failed to store API key" };
    }
}

export default setApiCookie;