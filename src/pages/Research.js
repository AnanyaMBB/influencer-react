import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import "./Research.css";
import MoreFilters from "../components/MoreFilters";
import ChatSearch from "../components/ChatSearch";
import { baseUrl } from "../shared";
import ReactFlagsSelect from "react-flags-select";
import NicheSelect from "../components/NicheSelect";

export default function Research() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState({
        username: "",
        keyword: "",
        likes_count: 0,
        comments_count: 0,
        audio_id: "",
    });
    const [selected, setSelected] = useState("");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [selectedCountryFlag, setSelectedCountryFlag] = useState("");
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [filterResponse, setFilterResponse] = useState([]);
    const [selectedNiches, setSelectedNiches] = useState([]);
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [selectedAudioIds, setSelectedAudioIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [videoSource, setVideoSource] = useState("");

    


    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    function filterResults(e) {
        e.preventDefault();
        const usernames = selectedUsernames.join(",");
        const keywords = selectedKeywords.join(",");
        const url =
            baseUrl +
            `api/research/search?query=${searchQuery}&username=${usernames}&tokens=${keywords}&likes_count=${filterValues.likes_count}&comments_count=${filterValues.comments_count}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log("FIlTERED RESPONSE: ", data);
                setFilterResponse(data);
                // getVideoUrl(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // function getVideoUrl(data) {
    //     console.log("COOKIES", document.cookie);
    //     // data.forEach((item) => {
    //     //     const formData = new FormData();
    //     //     fetch("https://www.instagram.com/reels/" + item.media_id + "/", {
    //     //         method: "GET", 

    //     //     })
    //     //     .then((response) => {
    //     //         console.log("REELS RESPONSE", response);
    //     //     })
    //     // });
    // }


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
                            <input
                                type="text"
                                value={filterValues.username}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        username: e.target.value,
                                    });
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setSelectedUsernames([
                                            ...selectedUsernames,
                                            e.target.value,
                                        ]);
                                    }
                                }}
                                placeholder="Press ENTER to add username"
                            />
                        </div>
                        <div className="selected-usernames">
                            <span>Selected Usernames</span>
                            <div className="container">
                                {selectedUsernames.map((username) => {
                                    return (
                                        <div className="selected-username">
                                            {username}
                                            <span
                                                class="material-symbols-outlined"
                                                onClick={() => {
                                                    setSelectedUsernames(
                                                        selectedUsernames.filter(
                                                            (item) =>
                                                                item !==
                                                                username
                                                        )
                                                    );
                                                }}
                                            >
                                                close
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="filter keywords">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                saved_search
                            </span>
                            <p>Keywords</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="text"
                                value={filterValues.keyword}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        keyword: e.target.value,
                                    });
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setSelectedKeywords([
                                            ...selectedKeywords,
                                            e.target.value,
                                        ]);
                                    }
                                }}
                                placeholder="Press ENTER to add keyword"
                            />
                        </div>
                        <div className="selected-keywords">
                            <span>Selected Keywords</span>
                            <div className="container">
                                {selectedKeywords.map((keyword) => {
                                    return (
                                        <div className="selected-keyword">
                                            {keyword}
                                            <span
                                                class="material-symbols-outlined"
                                                onClick={() => {
                                                    setSelectedKeywords(
                                                        selectedKeywords.filter(
                                                            (item) =>
                                                                item !== keyword
                                                        )
                                                    );
                                                }}
                                            >
                                                close
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* <div className="filter name">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">badge</span>
                            <p>Name</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="text"
                                value={filterValues.name}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        name: e.target.value,
                                    });
                                    
                                }}
                            />
                        </div>
                    </div> */}
                    {/* <div className="filter followers">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                people
                            </span>
                            <p>Followers</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                value={filterValues.followers}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        followers: e.target.value,
                                    });
                                    
                                }}
                            />
                            <p>{filterValues.followers}</p>
                        </div>
                    </div> */}
                    <div className="filter likes">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                thumb_up
                            </span>
                            <p>Likes</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                value={filterValues.likes_count}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        likes_count: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                value={filterValues.likes_count}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        likes_count: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="filter comments">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">chat</span>
                            <p>Comments</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                value={filterValues.comments_count}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        comments_count: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                value={filterValues.comments_count}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        comments_count: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className="filter followers">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                people
                            </span>
                            <p>Price</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                value={filterValues.price}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        price: e.target.value,
                                    });
                                    
                                }}
                            />
                            <p>{filterValues.price}</p>
                        </div>
                    </div> */}
                    <div className="filter audio-id">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                person
                            </span>
                            <p>Audio</p>
                        </div>
                        <div className="filter-content">
                            <input
                                type="text"
                                value={filterValues.audio_id}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        audio_id: e.target.value,
                                    });
                                }}
                                placeholder="Press ENTER to add audio ID"
                            />
                        </div>
                        <div className="selected-audio-ids">
                            <span>Selected Audio IDs</span>
                            <div className="container">
                                {selectedAudioIds.map((audioId) => {
                                    return (
                                        <div className="selected-audio-id">
                                            {audioId}
                                            <span
                                                class="material-symbols-outlined"
                                                onClick={() => {
                                                    setSelectedAudioIds(
                                                        selectedAudioIds.filter(
                                                            (item) =>
                                                                item !== audioId
                                                        )
                                                    );
                                                }}
                                            >
                                                close
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* <div className="filter location">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                location_on
                            </span>
                            <p>Audience Location</p>
                        </div>
                        <div className="filter-content">
                            <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => updateSelectedCountry(code)}
                                searchable
                                searchPlaceholder="Search countries"
                                className="menu-flags-select"
                                showSelectedLabel={true}
                            />
                            <div className="selected-locations">
                                <span>Selected Locations</span>
                                <div className="container">
                                    {selectedCountry.map((country, index) => {
                                        return (
                                            <>
                                                <div className="location">
                                                    <div
                                                        className="flag"
                                                        dangerouslySetInnerHTML={{
                                                            __html: country.flag,
                                                        }}
                                                    />
                                                    <div className="name">
                                                        {country.code}
                                                    </div>
                                                    <div className="delete">
                                                        <span
                                                            class="material-symbols-outlined"
                                                            onClick={() => {
                                                                setSelectedCountry(
                                                                    selectedCountry.filter(
                                                                        (
                                                                            item,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            close
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="filter niches">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                category
                            </span>
                            <p>Niche</p>
                        </div>
                        <div className="filter-content">
                            <NicheSelect
                                selectedNiches={selectedNiches}
                                setSelectedNiches={setSelectedNiches}
                            />
                            <div className="selected-niches">
                                <span>Selected Niches</span>
                                <div className="container">
                                    {selectedNiches.map((niche) => {
                                        return (
                                            <>
                                                <div className="niche-item">
                                                    <div className="name">
                                                        {niche}
                                                    </div>
                                                    <div className="delete">
                                                        <span
                                                            class="material-symbols-outlined"
                                                            onClick={() => {
                                                                setSelectedNiches(
                                                                    selectedNiches.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item !==
                                                                            niche
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            close
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="research-container">
                <div className="chat-search-container">
                    <ChatSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterResults={filterResults}
                    />
                </div>
                <div className="results">
                    {filterResponse.map((result) => {
                        return (
                            <div className="result">
                                <div className="result-video">

                                    {/* <video width="100%" controls>
                                        <source src="" type="video/mp4" />
                                        Your browser does not support the video
                                        tag.
                                    </video> */}
                                    <p onClick={() => {
                                        // window.location.href = "https://www.instagram.com/reels/" + result.media_id + "/";
                                        window.open("https://www.instagram.com/reels/" + result.media_id + "/", "_blank");
                                    }}>Go to video on instagram</p>
                                </div>
                                <div className="analytics-container">
                                    <div className="analytics likes">
                                        <div className="icon">
                                            <span class="material-symbols-outlined">
                                                thumb_up
                                            </span>
                                        </div>
                                        <div className="value">{result.likes_count}</div>
                                    </div>
                                    <div className="analytics comments">
                                        <div className="icon">
                                            <span class="material-symbols-outlined">
                                                chat
                                            </span>
                                        </div>
                                        <div className="value">{result.comments_count}</div>
                                    </div>
                                    {/* <div className="analytics shares">
                                        <div className="icon">
                                            <span class="material-symbols-outlined">
                                                share
                                            </span>
                                        </div>
                                        <div className="value">10000</div>
                                    </div> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
