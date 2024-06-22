import "./Core.css";
import { Outlet } from "react-router-dom";

export default function Core(props) {
    return (
        <div className="core-container">
            <header>
                <h1>{props.title}</h1>
            </header>
            <aside>
                <div className="sidebar-toggle">
                    <div className="left-arrow"></div>
                </div>
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