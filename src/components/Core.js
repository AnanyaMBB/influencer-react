import "./Core.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo-no-background.png'
import logo1 from './logo-1-no-bg.png'
import logo2 from './logo-2-no-bg.png'
import beeLogo from './bee-logo.png'
import beeLogo4 from "../components/bee-logo-4.png";
// import logo-no-background from "./logo-no-background.svg";
export default function Core(props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const navigate = useNavigate();
    function handleToggle() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        // <div className="core-container">
        <div className={`core-container ${isCollapsed ? "collapsed" : ""}`}>
            <header>
                <h1>{props.title}</h1>
            </header>

            {!isCollapsed ? (
                <div className="sidebar-toggle-left" onClick={handleToggle}>
                    <div className="left-arrow"></div>
                </div>
            ) : null}

            {isCollapsed ? (
                <div className="sidebar-toggle-right" onClick={handleToggle}>
                    <div className="right-arrow"></div>
                </div>
            ) : null}
            {localStorage.getItem("accountType") == "influencer" ? (
                <aside>
                    <div className="logo">
                        {/* <img src={logo1} width="100"/> */}
                        <img src={beeLogo4} width="100"/>
                    </div>
                    <nav>
                        <div className="nav-btn" onClick={() => {
                            navigate("/account")
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    grid_view
                                </span>
                            </div>
                            <div className="text">Account</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/contract");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    contract
                                </span>
                            </div>
                            <div className="text">Contracts</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("requests");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    work
                                </span>
                            </div>
                            <div className="text">Requests</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/chat");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    chat
                                </span>
                            </div>
                            <div className="text">Chat</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/earnings");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    account_balance_wallet
                                </span>
                            </div>
                            <div className="text">Earnings</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/research");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    conditions
                                </span>
                            </div>
                            <div className="text">Research</div>
                        </div>
                    </nav>
                </aside>
            ) : (
                <aside>
                    <div className="logo">
                        <img src={beeLogo4} width="100" height="300"/>
                    </div>
                    <nav>
                        <div className="nav-btn" onClick={() => {
                            navigate("/discovery");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    {/* grid_view */}
                                    person_search
                                </span>
                            </div>
                            <div className="text">Discovery</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/contract");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    contract
                                </span>
                            </div>
                            <div className="text">Contracts</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/campaigns");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    campaign
                                </span>
                            </div>
                            <div className="text">Campaigns</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/chat");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    chat
                                </span>
                            </div>
                            <div className="text">Chat</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/research");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    conditions
                                </span>
                            </div>
                            <div className="text">Research</div>
                        </div>
                        <div className="nav-btn" onClick={() => {
                            navigate("/wallet");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    account_balance_wallet
                                </span>
                            </div>
                            <div className="text">Wallet</div>
                        </div>
                    </nav>
                </aside>
            )}

            <main>
                <Outlet />
                {/* {props.children} */}
            </main>
        </div>
    );
}
