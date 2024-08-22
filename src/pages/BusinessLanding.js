import "./BusinessLanding.css";
import React, { useEffect } from "react";
import dashboardImg from "./dashboardImg.png";
import logo from "../components/logo-1-no-bg-2.png";
import beeLogo from "../components/bee-logo.png";
import beeLogo4 from "../components/bee-logo-4.png";

export default function BusinessLanding() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible-item");
                    entry.target.classList.remove("hidden-item");
                } else {
                    entry.target.classList.add("hidden-item");
                    entry.target.classList.remove("visible-item");
                }
            });
        });

        const featureObserver = new IntersectionObserver((entries) => {
            console.log("FEATURE OBSERVER", entries);
            entries.forEach((entry) => {
                console.log("ENTRY", entry);
                console.log("REMOVED", entry.target.classList[1]);
                if (entry.isIntersecting) {
                    entry.target.classList.add("from-finished");
                    entry.target.classList.remove(entry.target.classList[1]);
                } else {
                    entry.target.classList.remove("from-finished");
                    entry.target.classList.add(entry.target.classList[1]);
                }
            });
        });

        const elementsToObserve = document.querySelectorAll(".feature");
        const dashboardImgToObserve = document.querySelectorAll(
            ".dashboard-image-container"
        );
        const cardsToObserve = document.querySelectorAll(".card");

        elementsToObserve.forEach((element) => observer.observe(element));
        dashboardImgToObserve.forEach((element) => observer.observe(element));
        cardsToObserve.forEach((element) => observer.observe(element));

        // Clean up the observer when the component unmounts
        return () => {
            elementsToObserve.forEach((element) => observer.unobserve(element));
        };
    }, []); // Empty dependency array ensures this runs only once after mount

    return (
        <div className="landing-page-container">
            <div className="main">
                <div className="title-container">
                    <div className="logo">
                        <img src={beeLogo4} />
                    </div>
                    <div className="header">
                        <h1>
                            Supercharge Your Brand with AI-Driven Content
                            Discovery and Market Insights!
                        </h1>
                    </div>
                    <div className="sub-header">
                        <p>
                            Explore millions of transcribed YouTube Shorts and
                            Instagram Reels to find the perfect content for your
                            brand. Whether you're researching your niche,
                            monitoring competitor strategies, or discovering the
                            latest trends, our platform provides the insights
                            you need to lead in your industry.
                        </p>
                    </div>
                    <div className="call-to-action">
                        <button
                            type="button"
                            onClick={() => {
                                window.open(
                                    "https://calendly.com/buzzfindr/30min",
                                    "_blank"
                                );
                            }}
                        >
                            Book a Demo
                        </button>
                    </div>
                </div>
                <div className="covering"></div>
            </div>
            <div className="features">
                <div className="dashboard-image-container hidden-item">
                    <img src={dashboardImg} />
                </div>
                <div className="info-container">
                    <div className="left">
                        <div className="header">
                            <h2>
                                AI-Powered Content Research for Strategic
                                Marketing
                            </h2>
                        </div>
                        <div className="content">
                            <p>
                                Effortlessly explore and analyze millions of
                                social media videos to shape your brand’s
                                content strategy. Discover trending topics in
                                your niche, gain deep insights into competitor
                                tactics, and uncover opportunities for
                                engagement. Our advanced filters allow you to
                                search by specific keywords, usernames,
                                engagement metrics, and more. Stay ahead of the
                                curve with real-time alerts for any mentions of
                                your brand or competitors.
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="column">
                            <div className="feature hidden-item from-left">
                                <div className="title">
                                    <h2>Discover Influencers</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Connect with YouTube and Instagram
                                        influencers who are already engaging
                                        with your niche, using key engagement
                                        metrics like likes and comments.
                                    </p>
                                </div>
                            </div>
                            <div className="feature hidden-item from-top">
                                <div className="title">
                                    <h2>Reputation Management</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Monitor brand mentions across YouTube
                                        Shorts, Instagram Reels, and Reddit.
                                        Respond quickly to feedback and protect
                                        your brand's image.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="feature hidden-item from-bottom">
                                <div className="title">
                                    <h2>Content Discovery</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Search millions of transcribed Reels and
                                        Shorts by keywords, user handles, likes,
                                        and comments. Uncover trends, competitor
                                        content, and inspiration for your
                                        campaigns.
                                    </p>
                                </div>
                            </div>
                            <div className="feature feature-content-idea hidden-item from-right">
                                <div className="title">
                                    <h2>
                                        Content Idea
                                    </h2>
                                    <p>(Coming Soon)</p>
                                </div>
                                <div className="content">
                                    <p>
                                        Get tailored content ideas for your
                                        brand based on selected videos and your
                                        brand description. Elevate your
                                        marketing strategy with data-driven
                                        creativity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow-chart">
                <div className="card first-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            conditions
                        </span>
                    </div>
                    <div className="title">
                        <h2>Research</h2>
                    </div>
                    <div className="content">
                        <p>Gain a Competitive Edge</p>
                        <p>
                            Analyze millions of videos to uncover what works in
                            your industry. Get actionable insights to refine
                            your content strategy.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card second-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            person_search
                        </span>
                    </div>
                    <div className="title">
                        <h2>Discovery</h2>
                    </div>
                    <div className="content">
                        <p>Discover Content that Resonates</p>
                        <p>
                            Search millions of videos to find content that
                            aligns with your brand. Use advanced filters to
                            target the right audience.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card third-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">contract</span>
                    </div>
                    <div className="title">
                        <h2>Content Alerts</h2>
                    </div>
                    <div className="content">
                        <p>Stay Ahead with Real-Time Alerts</p>
                        <p>
                            Set up alerts to monitor brand mentions, trends, or
                            competitor activities. Never miss an opportunity to
                            engage or respond.
                        </p>
                    </div>
                </div>
                <div className="connector middle-connector">
                    <div className="arrow"></div>
                </div>
                <div className="card fourth-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            account_balance_wallet
                        </span>
                    </div>
                    <div className="title">
                        <h2>Competitor Tracking</h2>
                    </div>
                    <div className="content">
                        <p>Spy on Competitors</p>
                        <p>
                            Track your competitors' content strategies. Learn
                            from their successes and avoid their mistakes.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card fifth-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">campaign</span>
                    </div>
                    <div className="title">
                        <h2>Trend Analysis</h2>
                    </div>
                    <div className="content">
                        <p>Spot Emerging Trends</p>
                        <p>
                            Identify trending topics and content formats to keep
                            your brand relevant and ahead of the curve.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card sixth-card hidden-item">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            storefront
                        </span>
                    </div>
                    <div className="title">
                        <h2>Brand Management</h2>
                    </div>
                    <div className="content">
                        <p>Manage Your Brand's Reputation</p>
                        <p>
                            Track brand mentions and manage your reputation with
                            advanced filters. Quickly address negative comments
                            or leverage positive trends.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
