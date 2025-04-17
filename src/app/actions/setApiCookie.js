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
        // Set cookie with security options
        cookies().set("apiKey", apiKey, {
            httpOnly: true,     // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // Prevents CSRF
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
        });

        // Give the cookie operation a moment to complete
        await new Promise(resolve => setTimeout(resolve, 50));

        // Now check if the cookie was set successfully
        const apiKeyCookie = cookies().get("apiKey");

        if (apiKeyCookie) {
            cookies().set("apiKeyFlag", "true", {
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            console.log("API key securely stored in cookie");
            return { success: true };
        } else {
            cookies().set("apiKeyFlag", "false");
            console.error("Failed to store API key");
            return { success: false, error: "Failed to store API key" };
        }
    } catch (error) {
        console.error("Error setting cookie:", error);
        cookies().set("apiKeyFlag", "false");
        return { success: false, error: "Failed to store API key" };
    }
}

export default setApiCookie;