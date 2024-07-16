import "./Core.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                    <div className="logo"></div>
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
                    </nav>
                </aside>
            ) : (
                <aside>
                    <div className="logo"></div>
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
                            navigate("/competitor-analysis");
                        }}>
                            <div className="icon">
                                <span class="material-symbols-outlined">
                                    conditions
                                </span>
                            </div>
                            <div className="text">Compeititor</div>
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
