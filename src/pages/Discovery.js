import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import "./Discovery.css";
import MoreFilters from "../components/MoreFilters";
import ChatSearch from "../components/ChatSearch";

export default function Discovery() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="main-container">
            <div className="sidebar">
                <div className="title">
                    <p>Filters</p>
                </div>
                <div className="filters">
                    <div className="filter username">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                person
                            </span>
                            <p>Username</p>
                        </div>
                        <div className="filter-content">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="filter name">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">badge</span>
                            <p>Name</p>
                        </div>
                        <div className="filter-content">
                            <input type="text" />
                        </div>
                    </div>
                    <div className="filter followers">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                people
                            </span>
                            <p>Followers</p>
                        </div>
                        <div className="filter-content">
                            <input type="range" />
                            <p>50</p>
                        </div>
                    </div>
                    <div className="filter followers">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                people
                            </span>
                            <p>Price</p>
                        </div>
                        <div className="filter-content">
                            <input type="range" />
                            <p>50</p>
                        </div>
                    </div>
                    <div className="filter followers">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                location_on
                            </span>
                            <p>Audience Location</p>
                        </div>
                        <div className="filter-content">
                            <input type="text" />
                            <div className="selected-locations">
                                <span>Selected Locations</span>
                            </div>
                        </div>
                    </div>
                    <div className="filter name">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">category</span>
                            <p>Niche</p>
                        </div>
                        <div className="filter-content">
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="discovery-container">
                <div className="chat-search-container">
                    <ChatSearch />
                    {/* <div className="title">
                        <p>Chat Search</p>
                    </div>
                    <div className="chat-search">
                        <input
                            type="text"
                            placeholder="Describe your ideal influencer"
                        />
                    </div> */}
                </div>
                <div className="results-table">
                    <div className="title-row">
                        <div className="title profile">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    account_circle
                                </span>
                            </div>
                            <div className="text">
                                <p>Profile</p>
                            </div>
                        </div>
                        <div className="title username">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    person
                                </span>
                            </div>
                            <div className="text">
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="title followers">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    people_alt
                                </span>
                            </div>
                            <div className="text">
                                <p>Followers</p>
                            </div>
                        </div>
                        <div className="title location">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    location_on
                                </span>
                            </div>
                            <div className="text">
                                <p>Audience Location</p>
                            </div>
                        </div>
                        <div className="title engagement">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    percent
                                </span>
                            </div>
                            <div className="text">
                                <p>Engagement</p>
                            </div>
                        </div>
                        <div className="title niche">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    category
                                </span>
                            </div>
                            <div className="text">
                                <p>Niche</p>
                            </div>
                        </div>
                        <div className="title price">
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    payments
                                </span>
                            </div>
                            <div className="text">
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <div className="results">
                        <div className="result">
                            <div className="profile">
                                <img src="https://picsum.photos/200" />
                            </div>
                            <div className="username">
                                <p>@ananya</p>
                            </div>
                            <div className="followers">
                                <p>100k</p>
                            </div>
                            <div className="location">
                                <p>USA</p>
                            </div>
                            <div className="engagement">
                                <p>10</p>
                            </div>
                            <div className="niche">
                                <p>Beauty</p>
                            </div>
                            <div className="price">
                                <p>10</p>
                            </div>
                        </div>
                        <div className="result">
                            <div className="profile">
                                <img src="https://picsum.photos/202" />
                            </div>
                            <div className="username">
                                <strong>@ananya</strong>
                            </div>
                            <div className="followers">
                                <p>100k</p>
                            </div>
                            <div className="location">
                                <p>USA</p>
                            </div>
                            <div className="engagement">
                                <p>10</p>
                            </div>
                            <div className="niche">
                                <p>Beauty</p>
                            </div>
                            <div className="price">
                                <p>10</p>
                            </div>
                        </div>
                        <div className="result">
                            <div className="profile">
                                <img src="https://picsum.photos/202" />
                            </div>
                            <div className="username">
                                <strong>@ananya</strong>
                            </div>
                            <div className="followers">
                                <p>100k</p>
                            </div>
                            <div className="location">
                                <p>USA</p>
                            </div>
                            <div className="engagement">
                                <p>10</p>
                            </div>
                            <div className="niche">
                                <p>Beauty</p>
                            </div>
                            <div className="price">
                                <p>10</p>
                            </div>
                        </div>
                        <div className="result">
                            <div className="profile">
                                <img src="https://picsum.photos/202" />
                            </div>
                            <div className="username">
                                <strong>@ananya</strong>
                            </div>
                            <div className="followers">
                                <p>100k</p>
                            </div>
                            <div className="location">
                                <p>USA</p>
                            </div>
                            <div className="engagement">
                                <p>10</p>
                            </div>
                            <div className="niche">
                                <p>Beauty</p>
                            </div>
                            <div className="price">
                                <p>10</p>
                            </div>
                        </div>
                        {/* <div className="result"></div>
                        <div className="result"></div>
                        <div className="result"></div>
                        <div className="result"></div>
                        <div className="result"></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
