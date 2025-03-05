import "./InfluencerProfile.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LineGraph from "../components/LineGraph";
import SentimentChart from "../components/SentimentChart";
import FollowUnfollowChart from "../components/FollowUnfollowChart";
import DateRangePicker from "../components/DateRangePicker";
import AgeGroupChart from "../components/AgeGroupChart";
import GenderChart from "../components/GenderChart";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function InfluencerProfile() {
    const [page, setPage] = useState("services");
    const [servicePage, setServicePage] = useState("feed-post-service");
    const [engagementPage, setEngagementPage] = useState("account-metrics");
    const [demographicsPage, setDemographicsPage] = useState("country");
    const { account_type } = useParams("instagram");
    const { account_id } = useParams();
    const [selectedContentProvider, setSelectedContentProvider] =
        useState("influencer");

    const [selectedPricingType, setSelectedPricingType] = useState("hourly");

    const [accountMetrics, setAccountMetrics] = useState({
        impressions: {
            label: "",
            labels: [],
            data: [],
        },
        reach: {
            label: "",
            labels: [],
            data: [],
        },
        likes: {
            label: "",
            labels: [],
            data: [],
        },
        views: {
            label: "",
            labels: [],
            data: [],
        },
        shares: {
            label: "",
            labels: [],
            data: [],
        },
        comments: {
            label: "",
            labels: [],
            data: [],
        },
        website_clicks: {
            label: "",
            labels: [],
            data: [],
        },
        sentiment_analysis: {
            label: "",
            labels: [],
            data: [],
        },
        follow_unfollow: {
            label: "",
            labels: [],
            data: [],
        },
    });

    const [postMetrics, setPostMetrics] = useState({
        impressions: {
            label: "",
            labels: [],
            data: [],
        },
        reach: {
            label: "",
            labels: [],
            data: [],
        },
        like_count: {
            label: "",
            labels: [],
            data: [],
        },
        views: {
            label: "",
            labels: [],
            data: [],
        },
        shares: {
            label: "",
            labels: [],
            data: [],
        },
        comments_count: {
            label: "",
            labels: [],
            data: [],
        },
        saved: {
            label: "",
            labels: [],
            data: [],
        },
        video_views: {
            label: "",
            labels: [],
            data: [],
        },
    });

    const [reelMetrics, setReelMetrics] = useState({
        ig_reels_avg_watch_time: {
            label: "",
            labels: [],
            data: [],
        },
        plays: {
            label: "",
            labels: [],
            data: [],
        },
        ig_reels_video_view_total_time: {
            label: "",
            labels: [],
            data: [],
        },
    });

    const [ageDemographics, setAgeDemographics] = useState({
        follower_demographics: {},
        engaged_audience_demographics: {},
        reached_audience_demographics: {},
    });
    const [genderDemographics, setGenderDemographics] = useState({
        follower_demographics: {},
        engaged_audience_demographics: {},
        reached_audience_demographics: {},
    });
    const [cityDemographics, setCityDemographics] = useState({
        follower_demographics: [],
        engaged_audience_demographics: [],
        reached_audience_demographics: [],
    });
    const [countryDemographics, setCountryDemographics] = useState({
        follower_demographics: [],
        engaged_audience_demographics: [],
        reached_audience_demographics: [],
    });

    // Youtube Data
    const [youtubeChannelInformation, setYoutubeChannelInformation] = useState({
        subscriber_count: {
            label: "",
            labels: [],
            data: [],
        },
        video_count: {
            label: "",
            labels: [],
            data: [],
        },
        view_count: {
            label: "",
            labels: [],
            data: [],
        }
    });

    const [youtubeChannelAnalytics, setYoutubeChannelAnalytics] = useState({
        average_view_duration: {
            label: "",
            labels: [],
            data: [],
        },
        comments: {
            label: "",
            labels: [],
            data: [],
        },
        dislikes: {
            label: "",
            labels: [],
            data: [],
        },
        estimated_minutes_watched: {
            label: "",
            labels: [],
            data: [],
        },
        likes: {
            label: "",
            labels: [],
            data: [],
        },
        shares: {
            label: "",
            labels: [],
            data: [],
        },
        total_interactions: {
            label: "",
            labels: [],
            data: [],
        },
        views: {
            label: "",
            labels: [],
            data: [],
        },
    });
    const [youtubeAgeDemographics, setYoutubeAgeDemographics] = useState([]);
    const [youtubeGenderDemographics, setYoutubeGenderDemographics] = useState({
        male: {
            label: "",
            labels: [],
            data: [],
        },
        female: {
            label: "",
            labels: [],
            data: [],
        },
        unknown: {
            label: "",
            labels: [],
            data: [],
        }
    });
    const [youtubeVideoAnalytics, setYoutubeVideoAnalytics] = useState({
        views: {
            label: "",
            labels: [],
            data: [],
        },
        estimated_minutes_watched: {
            label: "",
            labels: [],
            data: [],
        },
        average_view_duration: {
            label: "",
            labels: [],
            data: [],
        },
        likes: {
            label: "",
            labels: [],
            data: [],
        },
        dislikes: {
            label: "",
            labels: [],
            data: [],
        },
        comments: {
            label: "",
            labels: [],
            data: [],
        },
        shares: {
            label: "",
            labels: [],
            data: [],
        },
        impressions: {
            label: "",
            labels: [],
            data: [],
        },
        reach: {
            label: "",
            labels: [],
            data: [],
        }
    });


    const [services, setServices] = useState([]);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    function getInstagramDetails() {
        const url =
            baseUrl + `api/instagram/data/details?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("INSTAGRAM DETAILS", data);
                data.instagram_details.forEach((item) => {
                    Object.keys(accountMetrics).forEach((key) => {
                        accountMetrics[key].label = key;
                        accountMetrics[key].labels.push(
                            item.date.split("T")[0]
                        );
                        accountMetrics[key].data.push(item[`${key}`]);
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramMediaData() {
        const url =
            baseUrl + `api/instagram/data/media?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                data.instagram_media_data.forEach((item) => {
                    Object.keys(postMetrics).forEach((key) => {
                        postMetrics[key].label = key;
                        postMetrics[key].labels.push(item.media_id);
                        postMetrics[key].data.push(item[`${key}`]);
                    });
                    Object.keys(reelMetrics).forEach((key) => {
                        reelMetrics[key].label = key;
                        reelMetrics[key].labels.push(item.media_id);
                        if (item[`${key}`] == null) {
                            reelMetrics[key].data.push(0);
                        } else {
                            reelMetrics[key].data.push(item[`${key}`]);
                        }
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramAgeDemographics() {
        const url =
            baseUrl +
            `api/instagram/data/demographics/age?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                data.instagram_age_demographics.forEach((item) => {
                    delete item.id;
                    delete item.date;
                    delete item.influencer_instagram_information;

                    let newDemographics = {};
                    if (item.type_identifier == 0) {
                        delete item.type_identifier;
                        newDemographics = {
                            follower_demographics: { ...item },
                        };
                    } else if (item.type_identifier == 1) {
                        delete item.type_identifier;
                        newDemographics = {
                            engaged_audience_demographics: { ...item },
                        };
                    } else if (item.type_identifier == 2) {
                        delete item.type_identifier;
                        newDemographics = {
                            reached_audience_demographics: { ...item },
                        };
                    }

                    setAgeDemographics((prevState) => ({
                        ...prevState,
                        ...newDemographics,
                    }));
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramGenderDemographics() {
        const url =
            baseUrl +
            `api/instagram/data/demographics/gender?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                data.instagram_gender_demographics.forEach((item) => {
                    delete item.id;
                    delete item.date;
                    delete item.influencer_instagram_information;

                    let newDemographics = {};
                    if (item.type_identifier == 0) {
                        delete item.type_identifier;
                        newDemographics = {
                            follower_demographics: { ...item },
                        };
                    } else if (item.type_identifier == 1) {
                        delete item.type_identifier;
                        newDemographics = {
                            engaged_audience_demographics: { ...item },
                        };
                    } else if (item.type_identifier == 2) {
                        delete item.type_identifier;
                        newDemographics = {
                            reached_audience_demographics: { ...item },
                        };
                    }

                    setGenderDemographics((prevState) => ({
                        ...prevState,
                        ...newDemographics,
                    }));
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramCityDemographics() {
        const url =
            baseUrl +
            `api/instagram/data/demographics/city?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                let newDemographics = {
                    follower_demographics: [],
                    engaged_audience_demographics: [],
                    reached_audience_demographics: [],
                };

                data.instagram_city_demographics.forEach((item) => {
                    if (item.type_identifier == 0) {
                        let newItem = { ...item };
                        delete newItem.id;
                        delete newItem.date;
                        delete newItem.influencer_instagram_information;
                        delete newItem.type_identifier;
                        newDemographics.follower_demographics.push(newItem);
                    } else if (item.type_identifier == 1) {
                        let newItem = { ...item };
                        delete newItem.id;
                        delete newItem.date;
                        delete newItem.influencer_instagram_information;
                        delete newItem.type_identifier;
                        newDemographics.engaged_audience_demographics.push(
                            newItem
                        );
                    } else if (item.type_identifier == 2) {
                        let newItem = { ...item };
                        delete newItem.id;
                        delete newItem.date;
                        delete newItem.influencer_instagram_information;
                        delete newItem.type_identifier;
                        newDemographics.reached_audience_demographics.push(
                            newItem
                        );
                    }
                });

                setCityDemographics(newDemographics);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramCountryDemographics() {
        const url =
            baseUrl +
            `api/instagram/data/demographics/country?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                let newDemographics = {
                    follower_demographics: [],
                    engaged_audience_demographics: [],
                    reached_audience_demographics: [],
                };

                data.instagram_country_demographics.forEach((item) => {
                    delete item.id;
                    delete item.date;
                    delete item.influencer_instagram_information;

                    if (item.type_identifier == 0) {
                        delete item.type_identifier;
                        newDemographics.follower_demographics.push({
                            ...item,
                        });
                    } else if (item.type_identifier == 1) {
                        delete item.type_identifier;
                        newDemographics.engaged_audience_demographics.push({
                            ...item,
                        });
                    } else if (item.type_identifier == 2) {
                        delete item.type_identifier;
                        newDemographics.reached_audience_demographics.push({
                            ...item,
                        });
                    }
                });

                setCountryDemographics((prevState) => ({
                    ...prevState,
                    ...newDemographics,
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getInstagramServices() {
        const url =
            baseUrl + `api/instagram/service/get?instagram_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getYoutubeChannelInformation() {
        const url = baseUrl + `api/influencer/youtube/get?channel_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in fetching data");
            }
            return response.json();
        })
        .then((data) => {
            Object.keys(youtubeChannelInformation).forEach((key) => {
                youtubeChannelInformation[key].label = "";
                youtubeChannelInformation[key].labels = [];
                youtubeChannelInformation[key].data = [];
            });
            data.channel_info.forEach((item) => {
                console.log(item);
                Object.keys(youtubeChannelInformation).forEach((key) => {
                    youtubeChannelInformation[key].label = key;
                    youtubeChannelInformation[key].labels.push(item.date.split("T")[0]);
                    youtubeChannelInformation[key].data.push(item[`${key}`]);
                });
            }); 
        })
        .catch((error) => {});
    }

    console.log("YOUTUBE CHANNEL INFORMATION", youtubeChannelInformation);  
    function getYoutubeAnalytics() {
        const url = baseUrl + `api/youtube-analytics/get?channel_id=${account_id}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in fetching data");
            }
            return response.json();
        })
        .then((data) => {
            console.log("YOUTUBE ANALYTICS", data);
            Object.keys(youtubeChannelAnalytics).forEach((key) => {
                youtubeChannelAnalytics[key].label = "";
                youtubeChannelAnalytics[key].labels = [];
                youtubeChannelAnalytics[key].data = [];
            });
            Object.keys(youtubeVideoAnalytics).forEach((key) => {
                youtubeVideoAnalytics[key].label = "";
                youtubeVideoAnalytics[key].labels = [];
                youtubeVideoAnalytics[key].data = [];
            });

            data.channel_analytics.forEach((item) => {
                Object.keys(youtubeChannelAnalytics).forEach((key) => {
                    youtubeChannelAnalytics[key].label = key;
                    youtubeChannelAnalytics[key].labels.push(item.date.split("T")[0]);
                    youtubeChannelAnalytics[key].data.push(item[`${key}`]);
                });
            });
            data.video_analytics.forEach((item) => {
                Object.keys(youtubeVideoAnalytics).forEach((key) => {
                    youtubeVideoAnalytics[key].label = key;
                    youtubeVideoAnalytics[key].labels.push(item.video_id);
                    youtubeVideoAnalytics[key].data.push(item[`${key}`]);
                });
            });
        })
        .catch((error) => {});
    }   

    console.log("YOUTUBE VIDEO ANALYTICS", youtubeVideoAnalytics);

    // YOUTUBE DATA GRABBER FUNCTIONS
    function getYoutubeServices() {
        const url =
            baseUrl + `api/youtube/service/get?channel_id=${account_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetching data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("SERVICES", data);
                setServices(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        //17841439310660818
        if (account_type === "instagram") {
            getInstagramDetails();
            getInstagramMediaData();
            getInstagramAgeDemographics();
            getInstagramGenderDemographics();
            getInstagramCityDemographics();
            getInstagramCountryDemographics();
            getInstagramServices();
        } else if (account_type === "youtube") {
            getYoutubeServices();
            getYoutubeChannelInformation();
            getYoutubeAnalytics();
        }
    }, []);

    function requestService(
        account_id,
        business_username,
        service_id,
        state
    ) {
        if (account_type === "instagram") {
            const url = baseUrl + `api/requests/send`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                },
                body: JSON.stringify({
                    instagram_id: account_id,
                    business_username: business_username,
                    service_id: service_id,
                    state: state,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                })
                .then((data) => {
                    alert("Service has been requested");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (account_type === "youtube") {
            const url = baseUrl + `api/youtube/requests/send`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                },
                body: JSON.stringify({
                    channel_id: account_id,
                    business_username: business_username,
                    service_id: service_id,
                    state: state,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                })
                .then((data) => {
                    alert("Service has been requested");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div
                    className={
                        page === "services"
                            ? "navigation services selected"
                            : "navigation services"
                    }
                    onClick={() => {
                        setPage("services");
                    }}
                >
                    <p>Services</p>
                </div>
                <div
                    className={
                        page === "analytics"
                            ? "navigation analytics selected"
                            : "navigation analytics"
                    }
                    onClick={() => {
                        setPage("analytics");
                    }}
                >
                    <p>Analytics</p>
                </div>
            </div>
            <div className="profile-contents">
                {page === "services" ? (
                    <div className="services-container">
                        <div className="profile-info">
                            <div className="profile-image">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                />
                            </div>
                            <div className="profile-name">
                                <p>John Doe</p>
                            </div>
                            <div className="profile-bio">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="profile-followers">
                                <p>Followers: 100k</p>
                            </div>
                            <div className="profile-engagement">
                                <p>Engagement: 75%</p>
                            </div>
                            <div className="avgs">
                                <div className="avg-likes">
                                    <div className="icon">
                                        <span className="material-symbols-outlined">
                                            thumb_up
                                        </span>
                                    </div>
                                    <div className="value-text">
                                        <div className="value">
                                            <p>100</p>
                                        </div>
                                        <div className="text">
                                            <p>Avg.</p>
                                            <p>Likes</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="avg-comments">
                                    <div className="icon">
                                        <span className="material-symbols-outlined">
                                            comment
                                        </span>
                                    </div>
                                    <div className="value-text">
                                        <div className="value">
                                            <p>100</p>
                                        </div>
                                        <div className="text">
                                            <p>Avg</p>
                                            <p>Comments</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="avg-shares">
                                    <div className="icon">
                                        <span className="material-symbols-outlined">
                                            share
                                        </span>
                                    </div>
                                    <div className="value-text">
                                        <div className="value">
                                            <p>100</p>
                                        </div>
                                        <div className="text">
                                            <p>Avg.</p>
                                            <p>Shares</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="services">
                            <div className="services-title">
                                <p>Services</p>
                            </div>
                            <div className="services-nav">
                                {account_type == "instagram" ? (
                                    <>
                                        <div
                                            className={
                                                servicePage ===
                                                "feed-post-service"
                                                    ? "nav feed-post selected"
                                                    : "nav feed-post"
                                            }
                                            onClick={() => {
                                                setServicePage(
                                                    "feed-post-service"
                                                );
                                            }}
                                        >
                                            <p>Feed Post</p>
                                        </div>
                                        <div
                                            className={
                                                servicePage ===
                                                "reel-post-service"
                                                    ? "nav reel-post selected"
                                                    : "nav reel-post"
                                            }
                                            onClick={() => {
                                                setServicePage(
                                                    "reel-post-service"
                                                );
                                            }}
                                        >
                                            <p>Reel Post</p>
                                        </div>
                                        <div
                                            className={
                                                servicePage ===
                                                "story-post-service"
                                                    ? "nav story-post selected"
                                                    : "nav story-post"
                                            }
                                            onClick={() => {
                                                setServicePage(
                                                    "story-post-service"
                                                );
                                            }}
                                        >
                                            <p>Story Post</p>
                                        </div>
                                    </>
                                ) : account_type === "youtube" ? (
                                    <>
                                        <div
                                            className={
                                                servicePage ===
                                                "youtube-full-post-service"
                                                    ? "nav youtube-full-post selected"
                                                    : "nav youtube-full-post"
                                            }
                                            onClick={() => {
                                                setServicePage(
                                                    "youtube-full-post-service"
                                                );
                                            }}
                                        >
                                            <p>FULL POST</p>
                                        </div>
                                        <div
                                            className={
                                                servicePage ===
                                                "youtube-short-post-service"
                                                    ? "nav youtube-short-post selected"
                                                    : "nav youtube-short-post"
                                            }
                                            onClick={() => {
                                                setServicePage(
                                                    "youtube-short-post-service"
                                                );
                                            }}
                                        >
                                            <p>SHORT POST</p>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                            <div className="services-content">
                                {servicePage === "ugc-service" ? (
                                    <div className="content ugc-service">
                                        <div className="service">
                                            <div className="service-title">
                                                <p>UGC</p>
                                            </div>
                                            <div className="service-description">
                                                <p>
                                                    A 30 second video
                                                    testimonial about your
                                                    product or service.
                                                </p>
                                            </div>
                                            <div className="post-type">
                                                <span className="material-symbols-outlined">
                                                    format_list_bulleted
                                                </span>
                                                <p>Video</p>
                                            </div>
                                            <div className="post-length">
                                                <span className="material-symbols-outlined">
                                                    schedule
                                                </span>
                                                <p>30 second</p>
                                            </div>
                                            <div className="price">
                                                <span className="material-symbols-outlined">
                                                    payments
                                                </span>
                                                <strong>$10</strong>
                                            </div>
                                        </div>
                                        <div className="service"></div>
                                        <div className="service"></div>
                                        <div className="service"></div>
                                        <div className="service"></div>
                                        <div className="service"></div>
                                    </div>
                                ) : null}
                                {servicePage === "youtube-full-post-service" ? (
                                    <div className="content youtube-full-post-service">
                                        {services != null
                                            ? services.map((service) => {
                                                  if (
                                                      service.service_type ===
                                                          "FULL" ||
                                                      service.service_type ===
                                                          "full"
                                                  ) {
                                                      return (
                                                          <div className="service">
                                                              <div className="service-title">
                                                                  <p>
                                                                      {
                                                                          service.service_name
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-type">
                                                                  <span className="material-symbols-outlined">
                                                                      format_list_bulleted
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_type
                                                                      }
                                                                  </p>
                                                              </div>
                                                              {/* <div className="post-length">
                                                        <span className="material-symbols-outlined">
                                                            schedule
                                                        </span>
                                                        <p>
                                                            {
                                                                service.post_length
                                                            }{" "}
                                                            second
                                                        </p>
                                                    </div> */}
                                                              <div className="service-content-provider">
                                                                  <p className="title">
                                                                      Content
                                                                      Provider
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="influencer-checkbox">
                                                                              Influencer
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="influencer-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "influencer"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "influencer"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "influencer"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="option-2 option">
                                                                          <label for="business-checkbox">
                                                                              Business
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="business-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "business"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "business"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "business"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div className="pricing-type">
                                                                  <p className="title">
                                                                      Pricing
                                                                      Type
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="hourly-pricing">
                                                                              Per
                                                                              Hour
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="hourly-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "hourly"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "hourly"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>

                                                                      <div className="option-2 option">
                                                                          <label for="view-pricing">
                                                                              Per
                                                                              View
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="view-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "view"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "view"
                                                                                  )
                                                                              }
                                                                              disabled
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              {selectedPricingType ===
                                                              "hourly" ? (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "hourly"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter live hours"
                                                                      />
                                                                  </div>
                                                              ) : (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "view"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter max. views"
                                                                      />
                                                                  </div>
                                                              )}
                                                              <div className="request-service">
                                                                  <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                          requestService(
                                                                              account_id,
                                                                              localStorage.getItem(
                                                                                  "username"
                                                                              ),
                                                                              service.id,
                                                                              "requested"
                                                                          );
                                                                      }}
                                                                  >
                                                                      Request
                                                                      Service
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })
                                            : null}
                                    </div>
                                ) : null}
                                {servicePage ===
                                "youtube-short-post-service" ? (
                                    <div className="content youtube-short-post-service">
                                        {services != null
                                            ? services.map((service) => {
                                                  if (
                                                      service.service_type ===
                                                          "SHORTS" ||
                                                      service.service_type ===
                                                          "shorts"
                                                  ) {
                                                      return (
                                                          <div className="service">
                                                              <div className="service-title">
                                                                  <p>
                                                                      {
                                                                          service.service_name
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-type">
                                                                  <span className="material-symbols-outlined">
                                                                      format_list_bulleted
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_type
                                                                      }
                                                                  </p>
                                                              </div>
                                                              {/* <div className="post-length">
                                                        <span className="material-symbols-outlined">
                                                            schedule
                                                        </span>
                                                        <p>
                                                            {
                                                                service.post_length
                                                            }{" "}
                                                            second
                                                        </p>
                                                    </div> */}
                                                              <div className="service-content-provider">
                                                                  <p className="title">
                                                                      Content
                                                                      Provider
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="influencer-checkbox">
                                                                              Influencer
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="influencer-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "influencer"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "influencer"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "influencer"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="option-2 option">
                                                                          <label for="business-checkbox">
                                                                              Business
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="business-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "business"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "business"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "business"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div className="pricing-type">
                                                                  <p className="title">
                                                                      Pricing
                                                                      Type
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="hourly-pricing">
                                                                              Per
                                                                              Hour
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="hourly-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "hourly"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "hourly"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>

                                                                      <div className="option-2 option">
                                                                          <label for="view-pricing">
                                                                              Per
                                                                              View
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="view-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "view"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "view"
                                                                                  )
                                                                              }
                                                                              disabled
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              {selectedPricingType ===
                                                              "hourly" ? (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "hourly"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter live hours"
                                                                      />
                                                                  </div>
                                                              ) : (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "view"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter max. views"
                                                                      />
                                                                  </div>
                                                              )}
                                                              <div className="request-service">
                                                                  <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                          requestService(
                                                                              account_id,
                                                                              localStorage.getItem(
                                                                                  "username"
                                                                              ),
                                                                              service.id,
                                                                              "requested"
                                                                          );
                                                                      }}
                                                                  >
                                                                      Request
                                                                      Service
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })
                                            : null}
                                    </div>
                                ) : null}
                                {servicePage === "feed-post-service" ? (
                                    <div className="content feed-post-service">
                                        {services != null
                                            ? services.map((service) => {
                                                  if (
                                                      service.service_type ===
                                                          "feed" ||
                                                      service.service_type ===
                                                          "FEED"
                                                  ) {
                                                      return (
                                                          <div className="service">
                                                              <div className="service-title">
                                                                  <p>
                                                                      {
                                                                          service.service_name
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-type">
                                                                  <span className="material-symbols-outlined">
                                                                      format_list_bulleted
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_type
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-length">
                                                                  <span className="material-symbols-outlined">
                                                                      schedule
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_length
                                                                      }{" "}
                                                                      second
                                                                  </p>
                                                              </div>
                                                              <div className="service-content-provider">
                                                                  <p className="title">
                                                                      Content
                                                                      Provider
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="influencer-checkbox">
                                                                              Influencer
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="influencer-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "influencer"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "influencer"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "influencer"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="option-2 option">
                                                                          <label for="business-checkbox">
                                                                              Business
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="business-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "business"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "business"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "business"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div className="pricing-type">
                                                                  <p className="title">
                                                                      Pricing
                                                                      Type
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="hourly-pricing">
                                                                              Per
                                                                              Hour
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="hourly-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "hourly"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "hourly"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>

                                                                      <div className="option-2 option">
                                                                          <label for="view-pricing">
                                                                              Per
                                                                              View
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="view-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "view"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "view"
                                                                                  )
                                                                              }
                                                                              disabled
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              {selectedPricingType ===
                                                              "hourly" ? (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "hourly"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter live hours"
                                                                      />
                                                                  </div>
                                                              ) : (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "view"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter max. views"
                                                                      />
                                                                  </div>
                                                              )}
                                                              <div className="request-service">
                                                                  <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                          requestService(
                                                                              account_id,
                                                                              localStorage.getItem(
                                                                                  "username"
                                                                              ),
                                                                              service.id,
                                                                              "requested"
                                                                          );
                                                                      }}
                                                                  >
                                                                      Request
                                                                      Service
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })
                                            : null}
                                    </div>
                                ) : null}
                                {servicePage === "reel-post-service" ? (
                                    <div className="content reel-post-service">
                                        {services != null
                                            ? services.map((service) => {
                                                  if (
                                                      service.service_type ===
                                                          "reel" ||
                                                      service.service_type ===
                                                          "REEL"
                                                  ) {
                                                      return (
                                                          <div className="service">
                                                              <div className="service-title">
                                                                  <p>
                                                                      {
                                                                          service.service_name
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-type">
                                                                  <span className="material-symbols-outlined">
                                                                      format_list_bulleted
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_type
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-length">
                                                                  <span className="material-symbols-outlined">
                                                                      schedule
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_length
                                                                      }{" "}
                                                                      second
                                                                  </p>
                                                              </div>
                                                              <div className="service-content-provider">
                                                                  <p className="title">
                                                                      Content
                                                                      Provider
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="influencer-checkbox">
                                                                              Influencer
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="influencer-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "influencer"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "influencer"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "influencer"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="option-2 option">
                                                                          <label for="business-checkbox">
                                                                              Business
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="business-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "business"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "business"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "business"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div className="pricing-type">
                                                                  <p className="title">
                                                                      Pricing
                                                                      Type
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="hourly-pricing">
                                                                              Per
                                                                              Hour
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="hourly-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "hourly"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "hourly"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>

                                                                      <div className="option-2 option">
                                                                          <label for="view-pricing">
                                                                              Per
                                                                              View
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="view-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "view"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "view"
                                                                                  )
                                                                              }
                                                                              disabled
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              {selectedPricingType ===
                                                              "hourly" ? (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "hourly"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter live hours"
                                                                      />
                                                                  </div>
                                                              ) : (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "view"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter max. views"
                                                                      />
                                                                  </div>
                                                              )}
                                                              <div className="request-service">
                                                                  <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                          requestService(
                                                                              account_id,
                                                                              localStorage.getItem(
                                                                                  "username"
                                                                              ),
                                                                              service.id,
                                                                              "requested"
                                                                          );
                                                                      }}
                                                                  >
                                                                      Request
                                                                      Service
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })
                                            : null}
                                    </div>
                                ) : null}
                                {servicePage === "story-post-service" ? (
                                    <div className="content story-post-service">
                                        {services != null
                                            ? services.map((service) => {
                                                  if (
                                                      service.service_type ===
                                                          "story" ||
                                                      service.service_type ===
                                                          "STORY"
                                                  ) {
                                                      return (
                                                          <div className="service">
                                                              <div className="service-title">
                                                                  <p>
                                                                      {
                                                                          service.service_name
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-type">
                                                                  <span className="material-symbols-outlined">
                                                                      format_list_bulleted
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_type
                                                                      }
                                                                  </p>
                                                              </div>
                                                              <div className="post-length">
                                                                  <span className="material-symbols-outlined">
                                                                      schedule
                                                                  </span>
                                                                  <p>
                                                                      {
                                                                          service.post_length
                                                                      }{" "}
                                                                      second
                                                                  </p>
                                                              </div>
                                                              <div className="service-content-provider">
                                                                  <p className="title">
                                                                      Content
                                                                      Provider
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="influencer-checkbox">
                                                                              Influencer
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="influencer-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "influencer"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "influencer"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "influencer"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                      <div className="option-2 option">
                                                                          <label for="business-checkbox">
                                                                              Business
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="business-checkbox"
                                                                              name="content-provider-option"
                                                                              //   checked={
                                                                              //       selectedContentProvider ===
                                                                              //       "business"
                                                                              //   }
                                                                              checked={
                                                                                  service.content_provider ===
                                                                                  "business"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedContentProvider(
                                                                                      "business"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div className="pricing-type">
                                                                  <p className="title">
                                                                      Pricing
                                                                      Type
                                                                  </p>
                                                                  <div className="option-container">
                                                                      <div className="option-1 option">
                                                                          <label for="hourly-pricing">
                                                                              Per
                                                                              Hour
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="hourly-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "hourly"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "hourly"
                                                                                  )
                                                                              }
                                                                          />
                                                                      </div>

                                                                      <div className="option-2 option">
                                                                          <label for="view-pricing">
                                                                              Per
                                                                              View
                                                                          </label>
                                                                          <input
                                                                              type="checkbox"
                                                                              id="view-pricing"
                                                                              name="pricing-type-checkbox"
                                                                              checked={
                                                                                  selectedPricingType ===
                                                                                  "view"
                                                                              }
                                                                              onChange={() =>
                                                                                  setSelectedPricingType(
                                                                                      "view"
                                                                                  )
                                                                              }
                                                                              disabled
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              {selectedPricingType ===
                                                              "hourly" ? (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "hourly"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter live hours"
                                                                      />
                                                                  </div>
                                                              ) : (
                                                                  <div className="price">
                                                                      <span className="material-symbols-outlined">
                                                                          payments
                                                                      </span>
                                                                      <strong>
                                                                          $
                                                                          {service.pricing.map(
                                                                              (
                                                                                  price
                                                                              ) => {
                                                                                  if (
                                                                                      price.pricing_type ===
                                                                                      "view"
                                                                                  ) {
                                                                                      return price.price;
                                                                                  }
                                                                              }
                                                                          )}
                                                                      </strong>
                                                                      <input
                                                                          type="number"
                                                                          placeholder="Enter max. views"
                                                                      />
                                                                  </div>
                                                              )}
                                                              <div className="request-service">
                                                                  <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                          requestService(
                                                                              account_id,
                                                                              localStorage.getItem(
                                                                                  "username"
                                                                              ),
                                                                              service.id,
                                                                              "requested"
                                                                          );
                                                                      }}
                                                                  >
                                                                      Request
                                                                      Service
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })
                                            : null}
                                    </div>
                                ) : null}
                                {/* {servicePage === "other-service" ? (
                                    <div className="content other-service"></div>
                                ) : null} */}
                            </div>
                        </div>
                    </div>
                ) : null}
                {page === "analytics" ? (
                    <div className="analytics">
                        <div className="analytics-engagement">
                            <div className="title">
                                <p>Engagement Metrics</p>
                            </div>
                            <div className="sub-header">
                                <div className="navigation">
                                    {account_type === "instagram" ? <>
                                    <div
                                        className={
                                            engagementPage == "account-metrics"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setEngagementPage(
                                                "account-metrics"
                                            );
                                        }}
                                    >
                                        <p>Account Metrics</p>
                                    </div>
                                    <div
                                        className={
                                            engagementPage == "post-metrics"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setEngagementPage("post-metrics");
                                        }}
                                    >
                                        <p>Post Metrics</p>
                                    </div>
                                    <div
                                        className={
                                            engagementPage == "reel-metrics"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setEngagementPage("reel-metrics");
                                        }}
                                    >
                                        <p>Reel Metrics</p>
                                    </div>
                                    </> : account_type === "youtube" ? <>
                                    <div
                                        className={
                                            engagementPage == "account-metrics"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setEngagementPage(
                                                "account-metrics"
                                            );
                                        }}
                                    >
                                        <p>Account Metrics</p>
                                    </div>
                                    <div
                                        className={
                                            engagementPage == "post-metrics"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setEngagementPage("post-metrics");
                                        }}
                                    >
                                        <p>Post Metrics</p>
                                    </div>
                                    
                                    </> : null}
                                </div>
                                
                                <div className="filter">
                                    <DateRangePicker />
                                </div>
                            </div>
                            {account_type === "instagram" ? 
                            <>
                                {engagementPage === "account-metrics" ? (
                                    <div className="content account-metrics">
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.impressions
                                                            .label
                                                    }
                                                    labels={
                                                        accountMetrics.impressions
                                                            .labels
                                                    }
                                                    data={
                                                        accountMetrics.impressions
                                                            .data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Reach</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.reach.label
                                                    }
                                                    labels={
                                                        accountMetrics.reach.labels
                                                    }
                                                    data={accountMetrics.reach.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.likes.label
                                                    }
                                                    labels={
                                                        accountMetrics.likes.labels
                                                    }
                                                    data={accountMetrics.likes.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Views</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.views.label
                                                    }
                                                    labels={
                                                        accountMetrics.views.labels
                                                    }
                                                    data={accountMetrics.views.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.shares.label
                                                    }
                                                    labels={
                                                        accountMetrics.shares.labels
                                                    }
                                                    data={
                                                        accountMetrics.shares.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        accountMetrics.comments
                                                            .label
                                                    }
                                                    labels={
                                                        accountMetrics.comments
                                                            .labels
                                                    }
                                                    data={
                                                        accountMetrics.comments.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container website-clicks">
                                            <div className="title">
                                                <p>Websites Clicks</p>
                                            </div>
                                            <div className="graph">
                                                <div className="content">
                                                    <LineGraph
                                                        label={
                                                            accountMetrics
                                                                .website_clicks
                                                                .label
                                                        }
                                                        labels={
                                                            accountMetrics
                                                                .website_clicks
                                                                .labels
                                                        }
                                                        data={
                                                            accountMetrics
                                                                .website_clicks.data
                                                        }
                                                    />
                                                </div>
                                                <div className="changes">
                                                    <div className="quantity">
                                                        <p>6M</p>
                                                    </div>
                                                    <div className="increase">
                                                        <span className="material-symbols-outlined">
                                                            arrow_upward
                                                        </span>
                                                        <span>12%</span>
                                                    </div>
                                                    <div className="text">
                                                        <p>vs last month</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="graph-container sentiment">
                                            <div className="title">
                                                <p>Sentiment Analysis</p>
                                            </div>
                                            <div className="graph">
                                                <div className="content">
                                                    <SentimentChart />
                                                </div>
                                                <div className="value">
                                                    <p>75</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="graph-container follow-unfollow">
                                            <div className="title">
                                                <p>Follow-Unfollow</p>
                                            </div>
                                            <div className="graph">
                                                <FollowUnfollowChart />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {engagementPage === "post-metrics" ? (
                                    <div className="content post-metrics">
                                        <div className="graph-container impressions">
                                            <div className="title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        postMetrics.impressions
                                                            .label
                                                    }
                                                    labels={
                                                        postMetrics.impressions
                                                            .labels
                                                    }
                                                    data={
                                                        postMetrics.impressions.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container reach">
                                            <div className="title">
                                                <p>Reach</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={postMetrics.reach.label}
                                                    labels={
                                                        postMetrics.reach.labels
                                                    }
                                                    data={postMetrics.reach.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container likes">
                                            <div className="title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        postMetrics.like_count.label
                                                    }
                                                    labels={
                                                        postMetrics.like_count
                                                            .labels
                                                    }
                                                    data={
                                                        postMetrics.like_count.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container views">
                                            <div className="title">
                                                <p>Views</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container shares">
                                            <div className="title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={postMetrics.shares.label}
                                                    labels={
                                                        postMetrics.shares.labels
                                                    }
                                                    data={postMetrics.shares.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container comments">
                                            <div className="title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        postMetrics.comments_count
                                                            .label
                                                    }
                                                    labels={
                                                        postMetrics.comments_count
                                                            .labels
                                                    }
                                                    data={
                                                        postMetrics.comments_count
                                                            .data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container saves">
                                            <div className="title">
                                                <p>Saves</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={postMetrics.saved.label}
                                                    labels={
                                                        postMetrics.saved.labels
                                                    }
                                                    data={postMetrics.saved.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container video-views">
                                            <div className="title">
                                                <p>Video Views</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        postMetrics.video_views
                                                            .label
                                                    }
                                                    labels={
                                                        postMetrics.video_views
                                                            .labels
                                                    }
                                                    data={
                                                        postMetrics.video_views.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container hidden"></div>
                                    </div>
                                ) : null}

                                {engagementPage === "reel-metrics" ? (
                                    <div className="content reel-metrics">
                                        <div className="graph-container reels-avg-watch-time">
                                            <div className="title">
                                                <p>Reels Avg. Watch Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container plays">
                                            <div className="title">
                                                <p>Plays</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container reels-view-total-time">
                                            <div className="title">
                                                <p>Reels View Total Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        {/* <div className="graph-container reels-avg-watch-time">
                                            <div className="title">
                                                <p>Reels Avg. Watch Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div> */}
                                    </div>
                                ) : null}
                            </>
                            : account_type === "youtube" ? <>
                                {engagementPage === "account-metrics" ? (
                                    <div className="content account-metrics">
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Subscriber Count</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelInformation.subscriber_count.label
                                                    }
                                                    labels={
                                                        youtubeChannelInformation.subscriber_count
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeChannelInformation.subscriber_count
                                                            .data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Video Count</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelInformation.video_count.label
                                                    }
                                                    labels={
                                                        youtubeChannelInformation.video_count.labels
                                                    }
                                                    data={youtubeChannelInformation.video_count.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Views</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.views.label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.views.labels
                                                    }
                                                    data={youtubeChannelAnalytics.views.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.likes.label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.likes.labels
                                                    }
                                                    data={youtubeChannelAnalytics.likes.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Dislikes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.dislikes.label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.dislikes.labels
                                                    }
                                                    data={youtubeChannelAnalytics.dislikes.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.comments.label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.comments.labels
                                                    }
                                                    data={
                                                        youtubeChannelAnalytics.comments.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.shares
                                                            .label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.shares
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeChannelAnalytics.shares.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container">
                                            <div className="title">
                                                <p>Est. Minutes Watched</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeChannelAnalytics.estimated_minutes_watched
                                                            .label
                                                    }
                                                    labels={
                                                        youtubeChannelAnalytics.estimated_minutes_watched
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeChannelAnalytics.estimated_minutes_watched.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container sentiment">
                                            <div className="title">
                                                <p>Sentiment Analysis</p>
                                            </div>
                                            <div className="graph">
                                                <div className="content">
                                                    <SentimentChart />
                                                </div>
                                                <div className="value">
                                                    <p>75</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {engagementPage === "post-metrics" ? (
                                    <div className="content post-metrics">
                                        <div className="graph-container impressions">
                                            <div className="title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeVideoAnalytics.impressions
                                                            .label
                                                    }
                                                    labels={
                                                        youtubeVideoAnalytics.impressions
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeVideoAnalytics.impressions.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container reach">
                                            <div className="title">
                                                <p>Reach</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={youtubeVideoAnalytics.reach.label}
                                                    labels={
                                                        youtubeVideoAnalytics.reach.labels
                                                    }
                                                    data={youtubeVideoAnalytics.reach.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container views">
                                            <div className="title">
                                                <p>Views</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container likes">
                                            <div className="title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeVideoAnalytics.likes.label
                                                    }
                                                    labels={
                                                        youtubeVideoAnalytics.likes
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeVideoAnalytics.likes.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container likes">
                                            <div className="title">
                                                <p>Dislikes</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeVideoAnalytics.dislikes.label
                                                    }
                                                    labels={
                                                        youtubeVideoAnalytics.dislikes
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeVideoAnalytics.dislikes.data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container shares">
                                            <div className="title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={youtubeVideoAnalytics.shares.label}
                                                    labels={
                                                        youtubeVideoAnalytics.shares.labels
                                                    }
                                                    data={youtubeVideoAnalytics.shares.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container comments">
                                            <div className="title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={
                                                        youtubeVideoAnalytics.comments
                                                            .label
                                                    }
                                                    labels={
                                                        youtubeVideoAnalytics.comments
                                                            .labels
                                                    }
                                                    data={
                                                        youtubeVideoAnalytics.comments
                                                            .data
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container saves">
                                            <div className="title">
                                                <p>Avg. View Duration</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={youtubeVideoAnalytics.average_view_duration.label}
                                                    labels={
                                                        youtubeVideoAnalytics.average_view_duration.labels
                                                    }
                                                    data={youtubeVideoAnalytics.average_view_duration.data}
                                                />
                                            </div>
                                        </div>
                                        <div className="graph-container saves">
                                            <div className="title">
                                                <p>Est. Minutes Watched</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph
                                                    label={youtubeVideoAnalytics.estimated_minutes_watched.label}
                                                    labels={
                                                        youtubeVideoAnalytics.estimated_minutes_watched.labels
                                                    }
                                                    data={youtubeVideoAnalytics.estimated_minutes_watched.data}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="graph-container hidden"></div> */}
                                    </div>
                                ) : null}

                                {engagementPage === "reel-metrics" ? (
                                    <div className="content reel-metrics">
                                        <div className="graph-container reels-avg-watch-time">
                                            <div className="title">
                                                <p>Reels Avg. Watch Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container plays">
                                            <div className="title">
                                                <p>Plays</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        <div className="graph-container reels-view-total-time">
                                            <div className="title">
                                                <p>Reels View Total Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div>
                                        {/* <div className="graph-container reels-avg-watch-time">
                                            <div className="title">
                                                <p>Reels Avg. Watch Time</p>
                                            </div>
                                            <div className="graph">
                                                <LineGraph />
                                            </div>
                                        </div> */}
                                    </div>
                                ) : null}
                            </> : null} 
                        </div>
                        <div className="analytics-demographics">
                            <div className="title">Audience Demographics</div>
                            <div className="sub-header">
                                <div className="navigation">
                                    <div
                                        className={
                                            demographicsPage == "country"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setDemographicsPage("country");
                                        }}
                                    >
                                        <p>Country</p>
                                    </div>
                                    <div
                                        className={
                                            demographicsPage == "city"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setDemographicsPage("city");
                                        }}
                                    >
                                        <p>City</p>
                                    </div>
                                    <div
                                        className={
                                            demographicsPage == "age"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setDemographicsPage("age");
                                        }}
                                    >
                                        <p>Age</p>
                                    </div>
                                    <div
                                        className={
                                            demographicsPage == "gender"
                                                ? "nav selected"
                                                : "nav"
                                        }
                                        onClick={() => {
                                            setDemographicsPage("gender");
                                        }}
                                    >
                                        <p>Gender</p>
                                    </div>
                                </div>
                                <div className="filter">
                                    <DateRangePicker />
                                </div>
                            </div>
                            {demographicsPage === "country" ? (
                                <div className="content">
                                    <div className="follower-demographics">
                                        <div className="title">
                                            <p>Follower Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>Country</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {countryDemographics.follower_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_country
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>Country</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {countryDemographics.engaged_audience_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_country
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>Country</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {countryDemographics.reached_audience_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_country
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {demographicsPage === "city" ? (
                                <div className="content">
                                    <div className="follower-demographics">
                                        <div className="title">
                                            <p>Follower Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>City</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {cityDemographics.follower_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {item.this_week_city
                                                                        .split(
                                                                            ","
                                                                        )[0]
                                                                        .substring(
                                                                            2
                                                                        )}
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>City</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {cityDemographics.engaged_audience_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {item.this_week_city
                                                                        .split(
                                                                            ","
                                                                        )[0]
                                                                        .substring(
                                                                            2
                                                                        )}
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <div className="row">
                                                <div className="column">
                                                    <p>City</p>
                                                </div>
                                                <div className="column">
                                                    <p>#</p>
                                                </div>
                                            </div>
                                            {cityDemographics.reached_audience_demographics.map(
                                                (item) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="column">
                                                                <p>
                                                                    {item.this_week_city
                                                                        .split(
                                                                            ","
                                                                        )[0]
                                                                        .substring(
                                                                            2
                                                                        )}
                                                                </p>
                                                            </div>
                                                            <div className="column">
                                                                <p>
                                                                    {
                                                                        item.this_week_follower_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {demographicsPage === "age" ? (
                                <div className="content age">
                                    <div className="follower-demographics">
                                        <div className="title">
                                            <p>Follower Demographics</p>
                                        </div>
                                        <div className="content">
                                            <AgeGroupChart
                                                data={
                                                    ageDemographics.follower_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <AgeGroupChart
                                                data={
                                                    ageDemographics.engaged_audience_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <AgeGroupChart
                                                data={
                                                    ageDemographics.reached_audience_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {demographicsPage === "gender" ? (
                                <div className="content">
                                    <div className="follower-demographics">
                                        <div className="title">
                                            <p>Follower Demographics</p>
                                        </div>
                                        <div className="content">
                                            <GenderChart
                                                data={
                                                    genderDemographics.follower_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <GenderChart
                                                data={
                                                    genderDemographics.engaged_audience_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <GenderChart
                                                data={
                                                    genderDemographics.reached_audience_demographics
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
