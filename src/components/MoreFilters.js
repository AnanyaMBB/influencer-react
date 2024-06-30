import "./MoreFilters.css";
import { useState } from "react";

export default function MoreFilters() {
    const [closed, setClosed] = useState(true);
    return (
        <>
            {/* <button></button> */}
            <span
                class="material-symbols-outlined"
                onClick={(e) => {
                    setClosed(!closed);
                }}
            >
                filter_alt
            </span>

            {!closed ? (
                <div className="more-filters-container">
                    <div className="header">
                        <div className="title">
                            <p>Filter Influencers</p>
                        </div>
                        <div
                            className="close"
                            onClick={() => {
                                setClosed(true);
                            }}
                        >
                            <span class="material-symbols-outlined">close</span>
                        </div>
                    </div>
                    <div className="filters">
                        <div className="filter">
                            <div className="filter-title">
                                <p>Followers</p>
                            </div>
                            <div className="filter-content">
                            </div>
                        </div>
                        <div className="filter"></div>
                        <div className="filter"></div>
                        <div className="filter"></div>
                        <div className="filter"></div>
                        <div className="filter"></div>
                        <div className="filter"></div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
