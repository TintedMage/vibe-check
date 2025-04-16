"use server"

import { cookies } from "next/headers"

const setApiCookie = (formData) => {
    const apiKey = formData.get("apiKey");

    // Basic validation
    if (!apiKey || apiKey.trim().length < 8) {
        // You could throw an error here or return an error status
        console.error("Invalid API key format");
        return { success: false, error: "Invalid API key format" };
    }

    try {
        // Set cookie with security options
        cookies().set("apiKey", apiKey, {
            httpOnly: true,     // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production",  // HTTPS only in production
            sameSite: "strict", // Prevents CSRF
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            path: "/",          // Available across the site
        });

        console.log("API key securely stored in cookie");
        return { success: true };
    } catch (error) {
        console.error("Error setting cookie:", error);
        return { success: false, error: "Failed to store API key" };
    }
}

export default setApiCookie;