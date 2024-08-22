import "./BusinessLanding.css";
import dashboardImg from "./dashboardImg.png";
import logo from "../components/logo-1-no-bg-2.png";
import beeLogo from "../components/bee-logo.png";
import beeLogo4 from "../components/bee-logo-4.png";

export default function BusinessLanding() {
    return (
        <div className="landing-page-container">
            <div className="main">
                <div className="title-container">
                    <div className="logo">
                        <img src={beeLogo4} />
                    </div>
                    <div className="header">
                        <h1>
                            Unlock Powerful Insights with Influencer Analytics
                            and Content Discovery!
                        </h1>
                    </div>
                    <div className="sub-header">
                        <p>
                            Find influencers, search transcribed content, and
                            monitor your brand across social media—all in one
                            platform.
                        </p>
                    </div>
                    <div className="call-to-action">
                        <button type="button" onClick={() => {}}>
                            Book a Demo
                        </button>
                    </div>
                </div>
                <div className="covering"></div>
            </div>
            <div className="features">
                <div className="dashboard-image-container">
                    <img src={dashboardImg} />
                </div>
                <div className="info-container">
                    <div className="left">
                        <div className="header">
                            <h2>
                                Comprehensive Influencer Marketing Solutions
                            </h2>
                        </div>
                        <div className="content">
                            <p>
                                Our platform simplifies influencer marketing.
                                Find and analyze influencers, manage contracts,
                                and ensure secure payments. Monitor campaigns
                                with detailed analytics and use our extensive
                                content database for inspiration and competitor
                                research. Enhance your brand's reputation with
                                our upcoming brand monitoring feature. Achieve
                                impactful results with our all-in-one solution.
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="column">
                            <div className="feature">
                                <div className="title">
                                    <h2>Discover Influencers</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Access detailed metrics and pricing for
                                        YouTube and Instagram influencers.
                                    </p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="title">
                                    <h2>Content Discovery</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Filter through a vast collection of
                                        transcribed Instagram Reels and YouTube
                                        Shorts by likes, comments, user, and
                                        more.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="feature">
                                <div className="title">
                                    <h2>Brand Monitoring</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Track brand mentions and manage your
                                        reputation across YouTube Shorts,
                                        Instagram Reels, and Reddit.
                                    </p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="title">
                                    <h2>Campaign Analytics</h2>
                                </div>
                                <div className="content">
                                    <p>
                                        Monitor your campaign's performance with
                                        real-time, detailed analytics.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow-chart">
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            conditions
                        </span>
                    </div>
                    <div className="title">
                        <h2>Research</h2>
                    </div>
                    <div className="content">
                        <p>Discover Your Competitive Edge</p>
                        <p>
                            Dive deep into your niche and analyze competitors to
                            tailor your content strategy and influencer
                            marketing. Utilize our advanced tools to gain
                            insights and advantages that set you apart in your
                            industry.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            person_search
                        </span>
                    </div>
                    <div className="title">
                        <h2>Discovery</h2>
                    </div>
                    <div className="content">
                        <p>Find Your Perfect Influencer</p>
                        <p>
                            Find ideal influencers with our detailed analytics
                            and pricing info. Our platform helps you identify
                            those who align with your strategy and can
                            effectively promote your content.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">contract</span>
                    </div>
                    <div className="title">
                        <h2>Contract</h2>
                    </div>
                    <div className="content">
                        <p>Seamless Contract Management</p>
                        <p>
                            Effortlessly create and manage contracts with our
                            template library. Send contracts digitally for
                            smooth, efficient signing. Access all securely
                            stored agreements anytime.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            account_balance_wallet
                        </span>
                    </div>
                    <div className="title">
                        <h2>Secure Payment</h2>
                    </div>
                    <div className="content">
                        <p>Trustworthy Transactions</p>
                        <p>
                            Handle all your payments through our platform to
                            avoid fraud. We act as an intermediary to ensure
                            that both parties meet their obligations, providing
                            a safe and secure environment for financial
                            transactions.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">campaign</span>
                    </div>
                    <div className="title">
                        <h2>Campaign Management</h2>
                    </div>
                    <div className="content">
                        <p>Monitor Your Campaigns</p>
                        <p>
                            Track the performance of your campaigns with
                            detailed analytics. Our platform allows you to
                            manage content uploads, sync them with agreed data
                            from the contract, and monitor results in real time
                            to optimize your strategy.
                        </p>
                    </div>
                </div>
                <div className="connector">
                    <div className="arrow"></div>
                </div>
                <div className="card">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            storefront
                        </span>
                    </div>
                    <div className="title">
                        <h2>Brand Management</h2>
                    </div>
                    <div className="content">
                        <p>Enhance Your Brand Presence</p>
                        <p>
                            Use our transcribed Instagram reels and YouTube
                            shorts to inspire content, research competitors, and
                            monitor your brand. Quickly find mentions and manage
                            negative comments with advanced search filters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
