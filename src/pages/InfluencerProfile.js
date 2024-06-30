import "./InfluencerProfile.css";
import { useEffect, useState } from "react";
import LineGraph from "../components/LineGraph";
import SentimentChart from "../components/SentimentChart";
import FollowUnfollowChart from "../components/FollowUnfollowChart";
import DateRangePicker from "../components/DateRangePicker";
import AgeGroupChart from "../components/AgeGroupChart";
import GenderChart from "../components/GenderChart";

export default function InfluencerProfile() {
    const [page, setPage] = useState("services");
    const [servicePage, setServicePage] = useState("ugc-service");
    const [engagementPage, setEngagementPage] = useState("account-metrics");
    const [demographicsPage, setDemographicsPage] = useState("country");

    const data = [
        // Your data goes here: each item should have coordinates [longitude, latitude] and a value
        { coordinates: [-99.1332, 19.4326], value: 20 },
        { coordinates: [-99.1332, 10], value: 20 },
        // More data points...
    ];

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
                                <div
                                    className={
                                        servicePage === "ugc-service"
                                            ? "nav ugc selected"
                                            : "nav ugc"
                                    }
                                    onClick={() => {
                                        setServicePage("ugc-service");
                                    }}
                                >
                                    <p>UGC</p>
                                </div>
                                <div
                                    className={
                                        servicePage === "feed-post-service"
                                            ? "nav feed-post selected"
                                            : "nav feed-post"
                                    }
                                    onClick={() => {
                                        setServicePage("feed-post-service");
                                    }}
                                >
                                    <p>Feed Post</p>
                                </div>
                                <div
                                    className={
                                        servicePage === "reel-post-service"
                                            ? "nav reel-post selected"
                                            : "nav reel-post"
                                    }
                                    onClick={() => {
                                        setServicePage("reel-post-service");
                                    }}
                                >
                                    <p>Reel Post</p>
                                </div>
                                <div
                                    className={
                                        servicePage === "story-post-service"
                                            ? "nav story-post selected"
                                            : "nav story-post"
                                    }
                                    onClick={() => {
                                        setServicePage("story-post-service");
                                    }}
                                >
                                    <p>Story Post</p>
                                </div>
                                <div
                                    className={
                                        servicePage === "other-service"
                                            ? "nav other-service selected"
                                            : "nav other-service"
                                    }
                                    onClick={() => {
                                        setServicePage("other-service");
                                    }}
                                >
                                    <p>Other</p>
                                </div>
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
                                {servicePage === "feed-post-service" ? (
                                    <div className="content feed-post-service"></div>
                                ) : null}
                                {servicePage === "reel-post-service" ? (
                                    <div className="content reel-post-service"></div>
                                ) : null}
                                {servicePage === "story-post-service" ? (
                                    <div className="content story-post-service"></div>
                                ) : null}
                                {servicePage === "other-service" ? (
                                    <div className="content other-service"></div>
                                ) : null}
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
                                </div>
                                <div className="filter">
                                    <DateRangePicker />
                                </div>
                            </div>
                            {engagementPage === "account-metrics" ? (
                                <div className="content account-metrics">
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Impressions</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Reach</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Likes</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Views</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Shares</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container">
                                        <div className="title">
                                            <p>Comments</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container website-clicks">
                                        <div className="title">
                                            <p>Websites Clicks</p>
                                        </div>
                                        <div className="graph">
                                            <div className="content">
                                                <LineGraph />
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
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container reach">
                                        <div className="title">
                                            <p>Reach</p>
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
                                            <LineGraph />
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
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container comments">
                                        <div className="title">
                                            <p>Comments</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container saves">
                                        <div className="title">
                                            <p>Saves</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
                                        </div>
                                    </div>
                                    <div className="graph-container video-views">
                                        <div className="title">
                                            <p>Video Views</p>
                                        </div>
                                        <div className="graph">
                                            <LineGraph />
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
                                            <div className="row">
                                                <div className="column">
                                                    <p>USA</p>
                                                </div>
                                                <div className="column">
                                                    <p>10</p>
                                                </div>
                                            </div>
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
                                            <div className="row">
                                                <div className="column">
                                                    <p>fd</p>
                                                </div>
                                                <div className="column">
                                                    <p>10</p>
                                                </div>
                                            </div>
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
                                            <AgeGroupChart />
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <AgeGroupChart />
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <AgeGroupChart />
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
                                            <GenderChart />
                                        </div>
                                    </div>
                                    <div className="engaged-demographics">
                                        <div className="title">
                                            <p>Engaged Demographics</p>
                                        </div>
                                        <div className="content">
                                            <GenderChart />
                                        </div>
                                    </div>
                                    <div className="reached-demographics">
                                        <div className="title">
                                            <p>Reached Demographics</p>
                                        </div>
                                        <div className="content">
                                            <GenderChart />
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
