import "./InfluencerRegister.css";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { baseUrl } from "../shared";

export default function InfluencerRegister() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [page, setPage] = useState(1);

    const pageTitle = {
        1: "Create an account",
        2: "Company details",
        3: "Address",
    };

    const [registrationData, setRegistrationData] = useState({
        "first-name": "",
        "last-name": "",
        email: "",
        username: "",
        password: "",
        "confirm-password": "",
        "company-name": "",
        "company-size": "",
        "company-industry": "",
        "company-website": "",
        "company-description": "",
        "address-line-1": "",
        "address-line-2": "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.clear();
        setLoggedIn(false);
    }, []);

    function register(e) {
        e.preventDefault();
        const url = baseUrl + "api/register/influencer";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: registrationData["first-name"],
                last_name: registrationData["last-name"],
                email: registrationData.email,
                username: registrationData.username,
                password: registrationData.password,
                influencerAccount: {
                    
                },
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in registering");
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("access", data.accesss);
                localStorage.setItem("refresh", data.refresh);
                setLoggedIn(true);
                navigate(
                    location?.state?.previousUrl
                        ? location.state.previousUrl
                        : "/discovery"
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="register-container">
            <form id="registerForm" onSubmit={register} className="w-full">
                    <div className="page page-1">
                        <div className="page-title">
                            <h1>{pageTitle[page]}</h1>
                        </div>
                        <div className="page-content">
                            <div class="p-1 space-y-4">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Create an account
                                </h1>
                                <form class="space-y-4 md:space-y-6" action="#">
                                    <div className="name-container">
                                        <div className="first-name">
                                            <label
                                                for="first-name"
                                                class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                required=""
                                                value={
                                                    registrationData["first-name"]
                                                }
                                                onChange={(e) => {
                                                    setRegistrationData({
                                                        ...registrationData,
                                                        "first-name":
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="last-name">
                                            <label
                                                for="last-name"
                                                class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="test"
                                                name="last-name"
                                                id="last-name"
                                                class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                required=""
                                                value={
                                                    registrationData["last-name"]
                                                }
                                                onChange={(e) => {
                                                    setRegistrationData({
                                                        ...registrationData,
                                                        "last-name":
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            for="username"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Your username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required=""
                                            value={registrationData.username}
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    username: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required=""
                                            value={registrationData.email}
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    email: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="password"
                                            class="register-label register-password-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            class="register-input register-password-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            value={registrationData.password}
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    password: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="confirm-password"
                                            class="register-label register-confirm-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Confirm password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="••••••••"
                                            class="register-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            value={
                                                registrationData[
                                                    "confirm-password"
                                                ]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "confirm-password":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input
                                                id="terms"
                                                aria-describedby="terms"
                                                type="checkbox"
                                                class="register-terms-check w-4 h-4"
                                                required=""
                                                value={registrationData.terms}
                                                onChange={(e) => {
                                                    setRegistrationData({
                                                        ...registrationData,
                                                        terms: e.target.checked,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label
                                                for="terms"
                                                class="font-light"
                                            >
                                                I accept the{" "}
                                                <a class="font-medium" href="#">
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                    type="submit"
                                    form="registerForm"
                                    class="register-submit w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p class="text-sm font-light">
                                    Already have an account?{" "}
                                    <a href="#" class="font-medium">
                                        Login here
                                    </a>
                                </p>
                                </form>
                            </div>
                        </div>
                    </div>
                

            </form>
        </div>
    );
}
