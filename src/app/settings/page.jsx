"use client"
import setApiCookie from "../actions/setApiCookie";

const Settings = () => {

    // const handleSubmit = (e) => {
    //     // Handle form submission logic here
    //     console.log("api key submitted on client side")
    //     e.preventDefault();

    // }

    return (
        <div className="container pt-5 mt-5 w-100 d-flex flex-column align-items-center justify-content-center">
            <p>Please Enter Your Hugging Face API key.</p>
            <form action={setApiCookie} className="d-flex flex-column gap-2 w-25">
                <input type="text" placeholder="Api Key" name="apiKey" />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Settings;
