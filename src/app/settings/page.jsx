"use client"
import handleCookie from "../actions/handleCookie";

const Settings = () => {

    // const handleSubmit = (e) => {
    //     // Handle form submission logic here
    //     console.log("api key submitted")
    // }

    return (
        <>
            <p>hello world</p>
            <form action={() => handleCookie("test")}>
                <input type="text" placeholder="id" />
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default Settings;
