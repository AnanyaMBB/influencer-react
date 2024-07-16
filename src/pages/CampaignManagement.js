import "./CampaignManagement.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LineGraph from "../components/LineGraph";
import SentimentChart from "../components/SentimentChart";
import FollowUnfollowChart from "../components/FollowUnfollowChart";
import DateRangePicker from "../components/DateRangePicker";
import AgeGroupChart from "../components/AgeGroupChart";
import GenderChart from "../components/GenderChart";
import { baseUrl } from "../shared";
import FileManager from "../components/FileManager";
import PayPalButton from "../components/PayPalButton";

export default function CampaignManagement() {
    const [page, setPage] = useState("campaigns");
    // const [page, setPage] = useState("services");
    const [servicePage, setServicePage] = useState("ugc-service");
    const [engagementPage, setEngagementPage] = useState("post-metrics");
    const [demographicsPage, setDemographicsPage] = useState("country");
    const { instagram_id } = useParams();
    const [fileDialogOpen, setFileDialogOpen] = useState(false);

    const [campaigns, setCampaigns] = useState([]);
    const [selectedContractID, setSelectedContractID] = useState("");
    const [selectedVersionID, setSelectedVersionID] = useState("");
    const [selectedCampaignFile, setSelectedCampaignFile] = useState("");


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


    const navigate = useNavigate();

    useEffect(() => {
        const url =
            baseUrl + `api/instagram/data/media?instagram_id=${instagram_id}`;
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
    }, []);

    useEffect(() => {
        const url = baseUrl + "api/contract/signed";

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCampaigns(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    
    return (
        <>
            {page == "campaigns" ? (
                <div className="campaign-management-container">
                    <div className="header"></div>
                    <div className="campaigns">
                        <div className="campaign title">
                            <div className="column">
                                <p>Business</p>
                            </div>
                            <div className="column">
                                <p>Influencer</p>
                            </div>
                            <div className="column">
                                <p>Contract</p>
                            </div>
                            <div className="column">
                                <p>File</p>
                            </div>
                            <div className="column">
                                <p>Publishing Date</p>
                            </div>
                            <div className="column">
                                <p>Published</p>
                            </div>
                            <div className="column">
                                <p></p>
                            </div>
                            {/* <div className="column">
                                <p>Impressions</p>
                            </div>
                            <div className="column">
                                <p>Likes</p>
                            </div> */}
                        </div>
                        <div className="scroll-container">
                            {campaigns.map((campaign) => {
                                return (
                                    <div className="campaign" data-contract-id={campaign.contract} data-version-id={campaign.contract_version}>
                                        <div className="column">
                                            <p>{campaign.business}</p>
                                        </div>
                                        <div className="column">
                                            <p>{campaign.influencer}</p>
                                        </div>
                                        <div className="column contract">
                                            <p onClick={() => {
                                                navigate(`/contract/${campaign.contract}/${campaign.contract_version}`)
                                            }}>Contract</p>
                                        </div>
                                        <div
                                            className="column file"
                                            onClick={() => {
                                                setFileDialogOpen(true);
                                                setSelectedContractID(campaign.contract);
                                                setSelectedVersionID(campaign.contract_version);

                                                setSelectedCampaignFile({
                                                    "id": campaign.file,
                                                    "file_name": campaign.file_name,   
                                                    "file_size": campaign.file_size, 
                                                    "file_date": campaign.file_date,
                                                });
                                            }}
                                        >
                                            <p>File</p>
                                        </div>
                                        <div className="column">
                                            <p>Publishing Date</p>
                                        </div>
                                        <div className="column published">
                                            <p>Published</p>
                                        </div>
                                        <div className="column analytics-action">
                                            <p onClick={() => {
                                                setPage("analytics");
                                            }}>Analytics</p>
                                        </div>
                                        <PayPalButton />
                                        {/* <div className="column">
                                            <p>Impressions</p>
                                        </div>
                                        <div className="column">
                                            <p>Likes</p>
                                        </div> */}
                                    </div>
                                );
                            })}

                            {/* <div className="campaign">
                                <div className="column">
                                    <p>Business</p>
                                </div>
                                <div className="column">
                                    <p>Influencer</p>
                                </div>
                                <div className="column contract">
                                    <p>Contract</p>
                                </div>
                                <div className="column file">
                                    <p>File</p>
                                </div>
                                <div className="column">
                                    <p>Publishing Date</p>
                                </div>
                                <div className="column waiting">
                                    <p>Waiting</p>
                                </div>
                                <div className="column">
                                    <p>Impressions</p>
                                </div>
                                <div className="column">
                                    <p>Likes</p>
                                </div>
                            </div>

                            <div className="campaign">
                                <div className="column">
                                    <p>Business</p>
                                </div>
                                <div className="column">
                                    <p>Influencer</p>
                                </div>
                                <div className="column contract">
                                    <p>Contract</p>
                                </div>
                                <div className="column file">
                                    <p>File</p>
                                </div>
                                <div className="column">
                                    <p>Publishing Date</p>
                                </div>
                                <div className="column failed">
                                    <p>Failed</p>
                                </div>
                                <div className="column">
                                    <p>Impressions</p>
                                </div>
                                <div className="column">
                                    <p>Likes</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <FileManager
                        fileDialogOpen={fileDialogOpen}
                        setFileDialogOpen={setFileDialogOpen}
                        selectedContractID={selectedContractID}
                        selectedVersionID={selectedVersionID}
                        selectedCampaignFile={selectedCampaignFile}
                        setSelectedCampaignFile={setSelectedCampaignFile}
                    />
                    
                </div>
            ) : null}
            {page == "analytics" ? (
                <div className="campaign-analytics-containers">
                    <div className="analytics">
                        <div className="analytics-engagement">
                            <div className="title">
                                <p>Engagement Metrics</p>
                                <span onClick={() => {
                                    setPage("campaigns");
                                }}>Campaigns</span>
                            </div>
                            <div className="sub-header">
                                <div className="navigation">
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
                                </div>
                                <div className="filter">
                                    <DateRangePicker />
                                </div>
                                
                            </div>

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
                </div>
            ) : null}
        </>
    );
}
