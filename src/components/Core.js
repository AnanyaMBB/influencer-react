import "./Core.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Core(props) {
    const [isCollapsed, setIsCollapsed] = useState(true);  
    function handleToggle() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        // <div className="core-container">
         <div className={`core-container ${isCollapsed ? 'collapsed': ''}`}>
            <header>
                <h1>{props.title}</h1>
            </header>

            {!isCollapsed ? 
            <div className="sidebar-toggle-left" onClick={handleToggle}>
                    <div className="left-arrow"></div>
            </div>
            : 
            null }

            {isCollapsed ? 
            <div className="sidebar-toggle-right" onClick={handleToggle}>
                    <div className="right-arrow"></div>
                </div>
            :null}
            <aside>
                
                <div className="logo"></div>
                <nav>
                    <div className='nav-btn'>
                        <div className="icon">
                            <span class="material-symbols-outlined">
                                grid_view
                            </span>
                        </div>
                        <div className="text">Discovery</div>
                    </div>
                    <div className='nav-btn'>
                        <div className="icon"></div>
                        <div className="text">Services</div>
                    </div>
                    <div className='nav-btn'>
                        <div className="icon"></div>
                        <div className="text">Services</div>
                    </div>
                </nav>
            </aside>
            <main>
                <Outlet />
                {/* {props.children} */}
            </main>
        </div>
    );
}