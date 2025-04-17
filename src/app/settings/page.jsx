"use client";

import setApiCookie from "../actions/setApiCookie";


const Settings = () => {

    return (
        <div className="container py-5 d-flex flex-column align-items-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6"></div>
                <div className="card bg-dark bg-opacity-25 border-0 shadow-lg mx-5">
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <h5 className="text-muted">API Key Configuration</h5>
                            <small className="text-warning">This is a demo app and the API key will be stored in a cookie.</small>
                        </div>

                        <form action={setApiCookie} className="mb-4">
                            <div className="form-group">
                                <label className="form-label">Enter Your Hugging Face API Key</label>
                                <input type="text" className="form-control mb-3" placeholder="Enter API Key" name="apiKey" />
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </div>
                        </form>

                        <div className="text-center mb-4">
                            <p className="mb-0">Get your API key from <a href="https://huggingface.co/settings/tokens" target="_blank" className="text-decoration-none">Hugging Face</a></p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Current API Key</label>
                            <div className="input-group">
                                <input type="password" className="form-control" id="apiKeyField" />
                                <button className="btn btn-outline-secondary" type="button"
                                    onClick={() => {
                                        const field = document.getElementById('apiKeyField');
                                        field.type = field.type === 'password' ? 'text' : 'password';
                                    }}>
                                    <i className="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Settings;
