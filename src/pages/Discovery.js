import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import "./Discovery.css";
import MoreFilters from "../components/MoreFilters";
import ChatSearch from "../components/ChatSearch";
import { baseUrl } from "../shared";
import ReactFlagsSelect from "react-flags-select";
import NicheSelect from "../components/NicheSelect";

export default function Discovery() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState({
        username: "",
        name: "",
        followers: 0,
        price: 0,
        location: "",
        niche: "",
    });
    const [selected, setSelected] = useState("");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [selectedCountryFlag, setSelectedCountryFlag] = useState("");
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [filterResponse, setFilterResponse] = useState([]);
    const [selectedNiches, setSelectedNiches] = useState([]);

    useEffect(() => {
        console.log("selected niches", selectedNiches);
    }, [selectedNiches]);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    // function filterResults() {
    //     const url =
    //         baseUrl +
    //         `api/instagram/filter?username=${filterValues.username}&name=${filterValues.name}&followers=${filterValues.followers}&price=${filterValues.price}&location=${filterValues.location}`;
    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("access"),
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Error fetching data");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // Filter Youtube Results
    function filterResults() {
        const url =
            baseUrl +
            `api/youtube/filter?username=${filterValues.username}&name=${filterValues.name}&followers=${filterValues.followers}&price=${filterValues.price}&location=${filterValues.location}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching data");
            }
            return response.json();
        })
        .then((data) => {
            console.log("YOUTUBE DATA", data);
        })
        .catch((error) => {console.log(error)});
    }

    function updateSelectedCountry(code) {
        setSelected(code);
        const countryContainer = document.querySelectorAll(
            ".menu-flags-select button span span"
        );

        setTimeout(() => {
            const countryContainer = document.querySelectorAll(
                ".menu-flags-select button span span"
            );
            const countryName = countryContainer[1]?.textContent;
            const countryFlag = countryContainer[0]?.innerHTML;

            const newCountry = { code, name: countryName, flag: countryFlag };

            setSelectedCountry((prevSelected) => {
                // Check if the country already exists in the array
                if (!prevSelected.some((country) => country.code === code)) {
                    // If it doesn't exist, add it
                    return [...prevSelected, newCountry];
                }
                // If it exists, return the array unchanged
                return prevSelected;
            });
        }, 0);
    }

    // useEffect(() => {
    //     console.log("SELECTED COUNTRY", selectedCountry);

    //     const countryCodes = selectedCountry.map((country) => country.code);
    //     console.log("COUNTRY CODES", countryCodes);
    //     const url = new URL(baseUrl + `api/instagram/filter`);
    //     const params = {
    //         username: filterValues.username,
    //         name: filterValues.name,
    //         followers: filterValues.followers,
    //         price: filterValues.price,
    //         location: countryCodes,
    //     };

    //     Object.keys(params).forEach((key) =>
    //         url.searchParams.append(key, params[key])
    //     );

    //     console.log("URL", url);

    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("access"),
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Error fetching data");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             setFilterResponse(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [selectedCountry, filterValues]);

    //Youtube 

    useEffect(() => {
        const countryCodes = selectedCountry.map((country) => country.code);
        const url = new URL(baseUrl + `api/youtube/filter`);
        const params = {
            username: filterValues.username,
            name: filterValues.name,
            followers: filterValues.followers,
            price: filterValues.price,
            location: countryCodes,
        };

        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );

        console.log("URL", url);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setFilterResponse(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedCountry, filterValues]);

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
                                    filterResults();
                                }}
                            />
                        </div>
                    </div>
                    <div className="filter name">
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
                                    filterResults();
                                }}
                            />
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
                                    filterResults();
                                }}
                            />
                            <p>{filterValues.followers}</p>
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
                                    filterResults();
                                }}
                            />
                            <p>{filterValues.price}</p>
                        </div>
                    </div>
                    <div className="filter location">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                location_on
                            </span>
                            <p>Audience Location</p>
                        </div>
                        <div className="filter-content">
                            {/* <input type="text" /> */}
                            {/* <LocationSuggest /> */}
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
                    </div>
                    <div className="filter niches">
                        <div className="filter-title">
                            <span class="material-symbols-outlined">
                                category
                            </span>
                            <p>Niche</p>
                        </div>
                        <div className="filter-content">
                            {/* <input
                                type="text"
                                value={filterValues.niche}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        niche: e.target.value,
                                    });
                                    filterResults();
                                }}
                            /> */}
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
                        {filterResponse.map((result) => {
                            // YOUTUBE
                            return (
                                <div
                                    className="result"
                                    data-channel-id={result.youtube_channel_information.channel_id}
                                    data-account-type="youtube"
                                    onClick={(e) => {
                                        console.log(
                                            e.currentTarget.getAttribute(
                                                "data-channel-id"
                                            )
                                        );
                                        navigate(
                                            `/profile/${e.currentTarget.getAttribute("data-account-type")}/${e.currentTarget.getAttribute(
                                                "data-channel-id"
                                            )}`
                                        );
                                    }}
                                >
                                    <div className="profile">
                                        <img
                                            src={
                                                result
                                                    .youtube_channel_information.thumbnail_url
                                            }
                                        />
                                    </div>
                                    <div className="username">
                                        <p>
                                            {
                                                result
                                                    .youtube_channel_information.custom_url
                                            }
                                        </p>
                                    </div>
                                    <div className="followers">
                                        <p>
                                            {
                                                result
                                                    .youtube_channel_information.subscriber_count
                                            }
                                        </p>
                                    </div>
                                    <div className="location">
                                        <p>
                                            {
                                                result
                                                    ?.youtube_geographic_demographics
                                            }
                                        </p>
                                    </div>
                                    <div className="engagement">
                                        <p>{result.engagement}</p>
                                    </div>
                                    <div className="niche">
                                        <p>{result.niche}</p>
                                    </div>
                                    <div className="price">
                                        <p>{result.lowest_price}</p>
                                    </div>
                                </div>
                            );
                            // INSTAGRAM
                            // return (
                            //     <div
                            //         className="result"
                            //         data-influencer-id={result.influencer}
                            //         data-instagram-id={result.instagram_id}
                            //         onClick={(e) => {
                            //             console.log(
                            //                 e.currentTarget.getAttribute(
                            //                     "data-instagram-id"
                            //                 )
                            //             );
                            //             navigate(
                            //                 `/profile/${e.currentTarget.getAttribute(
                            //                     "data-instagram-id"
                            //                 )}`
                            //             );
                            //         }}
                            //     >
                            //         <div className="profile">
                            //             <img
                            //                 src={
                            //                     result
                            //                         .instagram_initial_information
                            //                         .profile_picture_url
                            //                 }
                            //             />
                            //         </div>
                            //         <div className="username">
                            //             <p>
                            //                 {
                            //                     result
                            //                         .instagram_initial_information
                            //                         .username
                            //                 }
                            //             </p>
                            //         </div>
                            //         <div className="followers">
                            //             <p>
                            //                 {
                            //                     result
                            //                         .instagram_initial_information
                            //                         .followers_count
                            //                 }
                            //             </p>
                            //         </div>
                            //         <div className="location">
                            //             <p>
                            //                 {
                            //                     result
                            //                         .instagram_country_demographics
                            //                         .this_week_country
                            //                 }
                            //             </p>
                            //         </div>
                            //         <div className="engagement">
                            //             <p>{result.engagement}</p>
                            //         </div>
                            //         <div className="niche">
                            //             <p>{result.niche}</p>
                            //         </div>
                            //         <div className="price">
                            //             <p>{result.price}</p>
                            //         </div>
                            //     </div>
                            // );
                        })}
                        {/* <img src="https://picsum.photos/200" /> */}

                        {/* <div className="result">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
