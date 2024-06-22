import "./InfluencerAccountManagement.css";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddService from "../components/AddService";

export default function InfluencerAccountManagement() {
    const [page, setPage] = useState("ugc");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="account-container">
            <div className="header">
                <div className="title">
                    <p>Your Connected Accounts</p>
                </div>
                <div className="add-container">
                    <button className="add-button">Add Account</button>
                </div>
            </div>
            <div className="connected-accounts">
                <div className="account">
                    <div className="icon"></div>
                    <div className="text">
                        <div className="username">
                            <p>Username</p>
                        </div>
                        <div className="followers">
                            <p>1.2 million</p>
                        </div>
                    </div>
                </div>

                <div className="account">
                    <div className="icon"></div>
                    <div className="text">
                        <div className="username">
                            <p>Username</p>
                        </div>
                        <div className="followers">
                            <p>1.2 million</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="services">
                <div className="navigation">
                    <div
                        className={
                            page == "ugc" ? "ugc selected-navigation" : "ugc"
                        }
                        onClick={() => {
                            setPage("ugc");
                        }}
                    >
                        UGC
                    </div>
                    <div
                        className={
                            page == "feed-post"
                                ? "feed-post selected-navigation"
                                : "feed-post"
                        }
                        onClick={() => {
                            setPage("feed-post");
                        }}
                    >
                        Feed Post
                    </div>
                    <div
                        className={
                            page == "reel-post"
                                ? "reel-post selected-navigation"
                                : "reel-post"
                        }
                        onClick={() => {
                            setPage("reel-post");
                        }}
                    >
                        Reel Post
                    </div>
                    <div
                        className={
                            page == "other-post"
                                ? "other-post selected-navigation"
                                : "other-post"
                        }
                        onClick={() => {
                            setPage("other-post");
                        }}
                    >
                        Other Post
                    </div>
                    
                </div>
                {page == "ugc" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService/>
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / hour
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">Silver</td>
                                        <td class="px-6 py-4">Laptop</td>
                                        <td class="px-6 py-4">$2999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Magic Mouse 2
                                        </th>
                                        <td class="px-6 py-4">Black</td>
                                        <td class="px-6 py-4">Accessories</td>
                                        <td class="px-6 py-4">$99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "feed-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService/>
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / hour
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">Silver</td>
                                        <td class="px-6 py-4">Laptop</td>
                                        <td class="px-6 py-4">$2999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Magic Mouse 2
                                        </th>
                                        <td class="px-6 py-4">Black</td>
                                        <td class="px-6 py-4">Accessories</td>
                                        <td class="px-6 py-4">$99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "reel-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService/>
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / hour
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">Silver</td>
                                        <td class="px-6 py-4">Laptop</td>
                                        <td class="px-6 py-4">$2999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Magic Mouse 2
                                        </th>
                                        <td class="px-6 py-4">Black</td>
                                        <td class="px-6 py-4">Accessories</td>
                                        <td class="px-6 py-4">$99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "other-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService/>
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / hour
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">Silver</td>
                                        <td class="px-6 py-4">Laptop</td>
                                        <td class="px-6 py-4">$2999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">White</td>
                                        <td class="px-6 py-4">Laptop PC</td>
                                        <td class="px-6 py-4">$1999</td>
                                    </tr>
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Magic Mouse 2
                                        </th>
                                        <td class="px-6 py-4">Black</td>
                                        <td class="px-6 py-4">Accessories</td>
                                        <td class="px-6 py-4">$99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* <div className="services">
                <div className="services-title">
                    <p>Feed</p>
                </div>
                <div className="services-container">
                    <div className="service">
                        <div className="service-title-delete">
                            <div className="service-title">
                                <p>Title</p>
                            </div>
                            <div className="delete-button">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        </div>
                        <div className="service-description">
                            <p>dfkfkj d jkdjdkf jkd kjd jkdfj kdjk fjdkf jdfk  jdfkdj kf</p>
                        </div>
                        <div className="service-price">
                            <p>24$/hr</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
