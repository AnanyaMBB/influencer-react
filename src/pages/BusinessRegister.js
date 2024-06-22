import "./BusinessRegister.css";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { baseUrl } from "../shared";

export default function BusinessRegister() {
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
        const url = baseUrl + "api/register/business";
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
                businessAccount: {
                    company_name: registrationData["company-name"],
                    company_size: registrationData["company-size"],
                    company_industry: registrationData["company-industry"],
                    company_website: registrationData["company-website"],
                    company_description:
                        registrationData["company-description"],
                    company_address: registrationData["address-line-1"],
                    company_city: registrationData.city,
                    company_state: registrationData.state,
                    company_zip: registrationData.zip,
                    company_country: registrationData.country,
                    company_phone: registrationData.phone,
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

    function next() {
        if (page >= 1 && page < 3) setPage(page + 1);
    }

    function previous() {
        if (page > 1 && page <= 3) setPage(page - 1);
    }

    return (
        <div className="register-container">
            <form id="registerForm" onSubmit={register} className="w-full">
                {page == 1 ? (
                    <div className="page page-1">
                        <div className="page-title">
                            <h1>{pageTitle[page]}</h1>
                        </div>
                        <div className="page-content">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                                    {/* <div class="flex items-start">
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
                                    </div> */}
                                    {/* <button
                                    type="submit"
                                    class="register-submit w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p class="text-sm font-light">
                                    Already have an account?{" "}
                                    <a href="#" class="font-medium">
                                        Login here
                                    </a>
                                </p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                ) : null}
                {page == 2 ? (
                    <div className="page page-2">
                        <div className="page-title">
                            <h1>{pageTitle[page]}</h1>
                        </div>
                        <div className="page-content">
                            <div class="p-6 md:space-y-3 sm:p-8 sm:py-4">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    {pageTitle[page]}
                                </h1>
                                <div class="space-y-4 " action="#">
                                    <div>
                                        <label
                                            for="company-name"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company-name"
                                            id="company-name"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required=""
                                            value={
                                                registrationData["company-name"]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-name":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="company-industry"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Industry
                                        </label>
                                        <input
                                            type="text"
                                            name="company-industry"
                                            id="company-industry"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required=""
                                            value={
                                                registrationData[
                                                    "company-industry"
                                                ]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-industry":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="company-description"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Description
                                        </label>
                                        <input
                                            type="text"
                                            name="company-description"
                                            id="company-description"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required=""
                                            value={
                                                registrationData[
                                                    "company-description"
                                                ]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-description":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="company-website"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Website
                                        </label>
                                        <input
                                            type="text"
                                            name="company-website"
                                            id="company-website"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required=""
                                            value={
                                                registrationData[
                                                    "company-website"
                                                ]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-website":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="company-size"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Size
                                        </label>
                                        <input
                                            type="number"
                                            name="company-size"
                                            id="company-size"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0"
                                            required=""
                                            value={
                                                registrationData["company-size"]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-size":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="company-email"
                                            class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Email
                                        </label>
                                        <input
                                            type="email"
                                            name="company-email"
                                            id="company-email"
                                            class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required=""
                                            value={
                                                registrationData[
                                                    "company-email"
                                                ]
                                            }
                                            onChange={(e) => {
                                                setRegistrationData({
                                                    ...registrationData,
                                                    "company-email":
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    {/* <button
                                    type="submit"
                                    class="register-submit w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p class="text-sm font-light">
                                    Already have an account?{" "}
                                    <a href="#" class="font-medium">
                                        Login here
                                    </a>
                                </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {page == 3 ? (
                    <div className="page page-2">
                        <div className="page-title">
                            <h1>{pageTitle[page]}</h1>
                        </div>
                        <div className="page-content">
                            <div className="company-location-container">
                                <h1 class="title text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl py-4">
                                    {pageTitle[page]}
                                </h1>
                                <div className="Address">
                                    <label
                                        for="company-address"
                                        class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company Address
                                    </label>
                                    <input
                                        type="text"
                                        name="company-address"
                                        id="company-address"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={
                                            registrationData["address-line-1"]
                                        }
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                "address-line-1":
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="Phone">
                                    <label
                                        for="company-phone"
                                        class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="company-phone"
                                        id="company-phone"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={registrationData.phone}
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                phone: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="City">
                                    <label
                                        for="company-city"
                                        class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company City
                                    </label>
                                    <input
                                        type="text"
                                        name="company-city"
                                        id="company-city"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={registrationData.city}
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                city: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="State">
                                    <label
                                        for="company-state"
                                        class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company State
                                    </label>
                                    <input
                                        type="text"
                                        name="company-state"
                                        id="company-state"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={registrationData.state}
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                state: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="Zip">
                                    <label
                                        for="company-zip"
                                        class="register-label register-email-label w-full block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company Zip
                                    </label>
                                    <input
                                        type="number"
                                        name="company-zip"
                                        id="company-zip"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={registrationData.zip}
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                zip: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="Country">
                                    <label
                                        for="company-country"
                                        class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Company Country
                                    </label>
                                    <input
                                        type="text"
                                        name="company-country"
                                        id="company-country"
                                        class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-2.5 py-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=""
                                        required=""
                                        value={registrationData.country}
                                        onChange={(e) => {
                                            setRegistrationData({
                                                ...registrationData,
                                                country: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="buttons">
                    <button
                        type="button"
                        className="previous"
                        onClick={previous}
                    >
                        &larr; Prev
                    </button>
                    {page != 3 ? (
                        <button type="button" className="next" onClick={next}>
                            Next &rarr;
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="next"
                            form="registerForm"
                        >
                            Submit
                        </button>
                    )}
                    {/* <button type="button" className="next" onClick={next}>
                    {page != 3 ? "Next \u2192" : "Submit"}
                </button> */}
                </div>
            </form>
        </div>
        // <div>
        //   <section class="">
        //     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        //       <a
        //         href="#"
        //         class="register-logo-link flex items-center mb-6 text-2xl font-semibold text-gray-900"
        //       >
        //         <img
        //           class="w-8 h-8 mr-2"
        //           src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        //           alt="logo"
        //         />
        //         Flowbite
        //       </a>
        //       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        //         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        //           <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        //             Create an account
        //           </h1>
        //           <form class="space-y-4 md:space-y-6" action="#">
        //             <div>
        //               <label
        //                 for="email"
        //                 class="register-label register-email-label block mb-2 text-sm font-medium text-gray-900"
        //               >
        //                 Your email
        //               </label>
        //               <input
        //                 type="email"
        //                 name="email"
        //                 id="email"
        //                 class="register-input register-email-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                 placeholder="name@company.com"
        //                 required=""
        //               />
        //             </div>
        //             <div>
        //               <label
        //                 for="password"
        //                 class="register-label register-password-label block mb-2 text-sm font-medium text-gray-900"
        //               >
        //                 Password
        //               </label>
        //               <input
        //                 type="password"
        //                 name="password"
        //                 id="password"
        //                 placeholder="••••••••"
        //                 class="register-input register-password-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                 required=""
        //               />
        //             </div>
        //             <div>
        //               <label
        //                 for="confirm-password"
        //                 class="register-label register-confirm-label block mb-2 text-sm font-medium text-gray-900"
        //               >
        //                 Confirm password
        //               </label>
        //               <input
        //                 type="password"
        //                 name="confirm-password"
        //                 id="confirm-password"
        //                 placeholder="••••••••"
        //                 class="register-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                 required=""
        //               />
        //             </div>
        //             <div class="flex items-start">
        //               <div class="flex items-center h-5">
        //                 <input
        //                   id="terms"
        //                   aria-describedby="terms"
        //                   type="checkbox"
        //                   class="register-terms-check w-4 h-4"
        //                   required=""
        //                 />
        //               </div>
        //               <div class="ml-3 text-sm">
        //                 <label
        //                   for="terms"
        //                   class="font-light"
        //                 >
        //                   I accept the{" "}
        //                   <a
        //                     class="font-medium"
        //                     href="#"
        //                   >
        //                     Terms and Conditions
        //                   </a>
        //                 </label>
        //               </div>
        //             </div>
        //             <button
        //               type="submit"
        //               class="register-submit w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        //             >
        //               Create an account
        //             </button>
        //             <p class="text-sm font-light">
        //               Already have an account?{" "}
        //               <a
        //                 href="#"
        //                 class="font-medium"
        //               >
        //                 Login here
        //               </a>
        //             </p>
        //           </form>
        //         </div>
        //       </div>
        //     </div>
        //   </section>
        // </div>
    );
}
