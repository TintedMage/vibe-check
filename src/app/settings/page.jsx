"use client";

import { useEffect, useState } from "react";
import setApiCookie from "../actions/setApiCookie";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Settings = () => {

    const [apiKeyFlag, setApiKeyFlag] = useState(false);


    useEffect(() => {

        const hasApiKey = Cookies.get('apiKeyFlag') === 'true';
        setApiKeyFlag(hasApiKey);

    }, []);

    const [status, setStatus] = useState({
        message: null,
        type: null, // "success", "error", or null
        loading: false
    });
    const router = useRouter();

    // Client action that wraps the server action
    const handleSubmit = async (formData) => {
        try {
            setStatus({ message: "Saving API key...", type: null, loading: true });
            const result = await setApiCookie(formData);

            if (result.success) {
                setStatus({
                    message: "API key saved successfully! You can go back to the home page.",
                    type: "success",
                    loading: false
                });

                // Refresh client data to ensure cookies are recognized
                router.refresh();


            } else {
                setStatus({
                    message: result.error || "Failed to save API key",
                    type: "error",
                    loading: false
                });
            }
        } catch (error) {
            setStatus({
                message: "An unexpected error occurred",
                type: "error",
                loading: false
            });
            console.error("Error in form submission:", error);
        }
    };

    return (
        <div className="container py-5 d-flex flex-column align-items-center mt-5">
            <div className="row justify-content-center w-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-dark bg-opacity-25 border-0 shadow-md mx-sm-5 mx-3">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <h5 className="text-muted">API Key Configuration</h5>
                                <small className="text-warning">This is a demo app and the API key will be stored in a cookie.</small>
                            </div>

                            {/* Display status messages or placeholder */}
                            {status.message ? (
                                <div className={`alert ${status.type === "success" ? "alert-success" : status.type === "error" ? "alert-danger" : "alert-info"} mb-3`}>
                                    {status.message}
                                </div>
                            ) : apiKeyFlag && (
                                <div className="alert alert-success text-center mb-3">
                                    Api Key is already set. You can change it by entering a new one.
                                </div>
                            )}

                            {/* Form with client action wrapper */}
                            <form action={handleSubmit} className="mb-4">
                                <div className="form-group">
                                    <label className="form-label">Enter Your Hugging Face API Key</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Enter API Key"
                                        name="apiKey"
                                        disabled={status.loading}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={status.loading}
                                    >
                                        {status.loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </>
                                        ) : "Submit"}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <p className="mb-0">Get your API key from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-decoration-none">Hugging Face</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;