"use server"

import { cookies } from "next/headers"

const handleCookie = (name) => {
    console.log("handleCookie called");
    console.log(name);


}

export default handleCookie;