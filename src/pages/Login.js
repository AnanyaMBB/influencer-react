import "./Login.css";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { baseUrl } from "../shared";
import buzz_findr_text_bg_removed from '../components/buzz_findr_text_bg_removed.png';

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        const url = baseUrl + "api/token";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("LOGIN DATA 1 ", data);
                if (!data.access || !data.refresh){
                    alert("Invalid username or password");
                    return;
                }   
                    

                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                localStorage.setItem("username", username);
                setLoggedIn(true);

                fetch(baseUrl + `api/accountType?username=${username}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log("LOGIN DATA", data);
                    localStorage.setItem("accountType", data.accountType);
                    if (data.accountType === "business") {
                        // navigate(
                        //     location?.state?.previousUrl
                        //         ? location.state.previousUrl
                        //         : "/discovery"
                        // );
                        navigate("/discovery");
                    }
                    else {
                        // navigate(
                        //     location?.state?.previousUrl
                        //         ? location.state.previousUrl
                        //         : "/account"
                        // );
                        navigate("/account");
                    }   
                });
             
                
            });
    }
    return (
        <div className="login-main-container">
            <div className="login-box-container">
                <div className="login-header">
                    <img
                        className=""
                        src={buzz_findr_text_bg_removed}
                        alt="Your Company"
                        width="150"
                    />
                    <h2 className="">
                        Sign in to your account
                    </h2>
                </div>
                <form id="userLogin" onSubmit={login}>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    for="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        autocomplete="email"
                                        required
                                        className="login-email-input px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        for="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    {/* <div className="text-sm">
                                        <a
                                            href="#"
                                            className="login-forgot font-semibold"
                                        >
                                            Forgot password?
                                        </a>
                                    </div> */}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autocomplete="current-password"
                                        required
                                        className="login-password-input px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    form="userLogin"
                                    className="login-submit flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>

                        {/* <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?
                            <a href="#" className="login-14 font-semibold leading-6">
                                Start a 14 day free trial
                            </a>
                        </p> */}
                    </div>
                </form>
            </div>
        </div>
    );
}
