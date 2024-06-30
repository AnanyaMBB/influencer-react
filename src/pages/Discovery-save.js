import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import "./Discovery.css";
import MoreFilters from "../components/MoreFilters";

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
        <div className="sidebar"></div>
        <div className="discovery-container">
            
            <div className="header">
                <div className="name-search">
                    <div className="title">
                        <p>Influencer</p>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Name or username" />
                    </div>
                </div>
                <div className="location-search">
                    <div className="title">
                        <p>Audience Location</p>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Location" />
                    </div>
                </div>
                <div className="more-filters">
                    <div className="title">
                        <p>fjkfd</p>
                    </div>
                    <MoreFilters />
                    {/* <span class="material-symbols-outlined">filter_alt</span> */}
                </div>
            </div>

            <div className="chat-search-container">
                <div className="title">
                    <p>Chat Search</p>
                </div>
                <div className="chat-search">
                    <input
                        type="text"
                        placeholder="Describe your ideal influencer"
                    />
                </div>
            </div>
            <div className="body">
                <div className="result-card">
                    <div className="profile-image">
                        <img
                            src="https://images.pexels.com/photos/21945949/pexels-photo-21945949/free-photo-of-a-woman-looking-out-the-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="profile-image"
                        />
                    </div>
                    <div className="profile-info">
                        <div className="username">
                            <div className="content">
                                <p>@ananya</p>
                            </div>
                            <div className="title">{/* <p>Username</p> */}</div>
                        </div>
                        <div className="row">
                            <div className="followers">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        people
                                    </span>
                                </div>
                                <div className="content-container">
                                    <div className="content">
                                        <p>100k</p>
                                    </div>
                                    <div className="title">
                                        <p>Followers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="main-audience-location">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        location_on
                                    </span>
                                </div>
                                <div className="content-container">
                                    <div className="content">USA</div>
                                    <div className="title">
                                        <p>Audience</p>
                                    </div>
                                </div>
                            </div>

                            <div className="engagement">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        percent
                                    </span>
                                </div>
                                <div className="content-container">
                                    <div className="content">20</div>
                                    <div className="title">
                                        <p>Engagement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="price">
                            <div className="content">$10</div>
                            {/* <div className="title">
                                <p>Price</p>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="result-card"></div>
                <div className="result-card"></div>
                <div className="result-card"></div>
                <div className="result-card"></div>
                <div className="result-card"></div>
                <div className="result-card"></div>
                <div className="result-card"></div>
            </div>
        </div>
        </div>
    );
}
