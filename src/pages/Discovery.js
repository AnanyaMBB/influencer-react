import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import "./Discovery.css";

export default function Discovery() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    return (
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
                    <span class="material-symbols-outlined">filter_alt</span>
                </div>
            </div>

            <div className="chat-search-container">
                <div className="title">
                    <p>Chat Search</p>
                </div>
                <div className="chat-search">
                    <input type="text" placeholder="Describe your ideal influencer" />
                </div>
            </div>
            <div className="body"></div>
        </div>
    );
}
