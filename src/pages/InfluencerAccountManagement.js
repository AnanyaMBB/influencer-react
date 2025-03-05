/* global PhylloConnect */
import "./InfluencerAccountManagement.css";
import { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddService from "../components/AddService";
import AddYoutubeService from "../components/AddYoutubeService";
import { baseUrl } from "../shared";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import youtubeLogo from "./youtube-logo.png";
import instagramLogo from "./instagram-logo.png";
import tiktokLogo from "./tiktok-logo.png";
import { LoginContext } from "../App";
import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api";
import { request } from "websocket";
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import InfluencerChart from "../components/InfluencerChart";

export default function InfluencerAccountManagement() {
    const [page, setPage] = useState("ugc");
    const [show, setShow] = useState(false);
    const [instagramData, setInstagramData] = useState(null);
    const [youtubeData, setYoutubeData] = useState(null);
    const [tiktokData, setTiktokData] = useState(null);

    const [servicesData, setServicesData] = useState({
        ugc: [],
        "feed-post": [],
        "reel-post": [],
        "story-post": [],
        "other-post": [],
    });

    const [services, setServices] = useState([]);
    const tabItems = [
        { label: 'Campaigns', icon: 'pi pi-megaphone', command: () => console.log('Home clicked') },
        { label: 'Requests', icon: 'pi pi-bell', command: () => console.log('Settings clicked') },
        { label: 'Account Analytics', icon: 'pi pi-chart-line', command: () => console.log('Profile clicked') }
    ];
    const [tabActiveIndex, setTabActiveIndex] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    
    const [campaignsTable, setCampaignsTable] = useState([]);
    const [filters, setFilters] = useState({

    });

    const [loading, setLoading] = useState(false);

    
    const [requestsTable, setRequestsTable] = useState([]);
    const [requestsFilters, setRequestsFilters] = useState({});
    const [requestsLoading, setRequestsLoading] = useState(false);

    const [phylloAccountSummary, setPhylloAccountSummary] = useState({});
    const [phylloContentData, setPhylloContentData] = useState([]); 
    const [phylloContentDataDaily, setPhylloContentDataDaily] = useState([]);
    const [phylloAudienceDemographics, setPhylloAudienceDemographics] = useState([]);

    const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
            {
                label: 'Impressions',
                data: [300, 50, 100, 70, 120],
                fill: true, // Enables gradient below the line
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(24, 120, 241, 0.4)'); // Top gradient color
                    gradient.addColorStop(1, 'rgba(24, 120, 241, 0)');   // Bottom gradient color
                    return gradient;
                },
                borderColor: '#1878F1', // Line color
                borderWidth: 3, // Line thickness
                tension: 0.4, // Makes the line smooth
                pointRadius: 5, // Circle radius
                pointBackgroundColor: '#1878F1', // Circle color
                pointHoverRadius: 7, // Hover size
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes the grid lines
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: '#333', // X-axis text color
                },
            },
            y: {
                grid: {
                    display: false, // Removes the grid lines
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: '#333', // Y-axis text color
                },
            },
        },
    };

    const [engagementMetricsNavButton, setEngagementMetricsNavButton] = useState(0);
    const [audienceDemographicsNavButton, setAudienceDemographicsNavButton] = useState(0);
    const engagementAccountNavRef = useRef(null);
    const engagementPostNavRef = useRef(null);
    const audienceLocationNavRef = useRef(null);
    const audienceGenderAgeNavRef = useRef(null);

    const chartCountryData = {
        labels: phylloAudienceDemographics?.country?.map((item) => {return item.country_code}),
        datasets: [
            {
                label: '% of Data',
                data: phylloAudienceDemographics?.country?.map((item) => {return item.percentage}),
                backgroundColor: '#1878F1', // Bar color
                borderRadius: 5, // Rounded edges
                barThickness: 15 // Thickness of bars
            }
        ]
    };

    const chartCountryOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false // Hide the x-axis completely
            },
            y: {    
                ticks: {
                    font: {
                        size: 14, // Increase label font size
                    }
                },
                grid: {
                    display: false // Hide gridlines
                },
                border: {
                    display: false // Remove y-axis line
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            },
            tooltip: {
                enabled: false // Disable tooltips
            },
            datalabels: {
                anchor: 'end', // Position the label at the end of the bar
                align: 'end', // Align the label to the right of the bar
                formatter: (value) => `${value}%`, // Append '%' to the value
                color: '#000', // Label color
                font: {
                    size: 14 // Label font size
                }
            }
        },
        elements: {
            bar: {
                borderSkipped: 'start', // Removes the border on the left side
                barPercentage: 0.8, // Adjust bar width
                categoryPercentage: 0.9 // Adjust spacing between bars
            }
        }
    };


    const chartCityData = {
        labels: phylloAudienceDemographics?.city?.map((item) => {return item.city}),
        datasets: [
            {
                label: '% of Data',
                data: phylloAudienceDemographics?.city?.map((item) => {return item.percentage}),
                backgroundColor: '#1878F1', // Bar color
                borderRadius: 5, // Rounded edges
                barThickness: 15 // Thickness of bars
            }
        ]
    };

    const chartCityOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        scales: {
            x: {
                display: false // Hide the x-axis completely
            },
            y: {
                ticks: {
                    font: {
                        size: 14, // Increase label font size
                    }
                },
                grid: {
                    display: false // Hide gridlines
                },
                border: {
                    display: false // Remove y-axis line
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            },
            tooltip: {
                enabled: false // Disable tooltips
            },
            datalabels: {
                anchor: 'end', // Position the label at the end of the bar
                align: 'end', // Align the label to the right of the bar
                formatter: (value) => `${value}%`, // Append '%' to the value
                color: '#000', // Label color
                font: {
                    size: 14 // Label font size
                }
            }
        },
        elements: {
            bar: {
                borderSkipped: 'start', // Removes the border on the left side
            }
        }
    };

    const chartGenderData = {
        labels: ['Male', 'Female', 'Others'],
        datasets: [
            {
                data: [phylloAudienceDemographics?.gender?.male, phylloAudienceDemographics?.gender?.female, phylloAudienceDemographics?.gender?.other],
                backgroundColor: ['#1878F1', '#F29219', '#E0E0E0'], // Updated colors
                hoverBackgroundColor: ['#1878F1', '#F29219', '#E0E0E0'],
                borderWidth: 5, // Adds spacing between the segments
                borderColor: '#ffffff', // Ensures the border creates a white gap
                cutout: '90%', // Hollow effect
                borderRadius: 10, // Rounds the edges of the chart segments
            },
        ],
    };
    
    const chartGenderOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: '#495057',
                    usePointStyle: true,
                    font: {
                        size: 14, // Larger font size for better readability
                        weight: 'bold',
                    },
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets[0];
                        return chart.data.labels.map((label, index) => {
                            const value = datasets.data[index];
                            return {
                                text: `${label} (${value}%)`, // Adds values next to labels
                                fillStyle: datasets.backgroundColor[index],
                                hidden: false,
                                lineCap: 'round',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'round',
                                strokeStyle: datasets.borderColor,
                                pointStyle: 'circle',
                            };
                        });
                    },
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        return `${value}%`;
                    },
                },
            },
        },
        layout: {
            padding: {
                right: 20, // Brings legend closer to the chart
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const chartAgeData = {
        labels: ['13-17', '18-24', '25-32', '33-39', '40-49', '50-59', '60+'],
        datasets: [
            {
                label: '% of Data',
                data: [phylloAudienceDemographics?.age?.["13-17"] ?? 0,
                        phylloAudienceDemographics?.age?.["18-24"] ?? 0,
                        phylloAudienceDemographics?.age?.["25-32"] ?? 0,
                        phylloAudienceDemographics?.age?.["33-39"] ?? 0,
                        phylloAudienceDemographics?.age?.["40-49"] ?? 0,
                        phylloAudienceDemographics?.age?.["50-59"] ?? 0,
                        phylloAudienceDemographics?.age?.["60+"] ?? 0],
                backgroundColor: '#1878F1', // Bar color
                borderRadius: 5, // Rounded edges
                barThickness: 15 // Thickness of bars
            }
        ]
    };

    const chartAgeOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        scales: {
            x: {
                display: false // Hide the x-axis completely
            },
            y: {
                ticks: {
                    font: {
                        size: 14, // Increase label font size
                    }
                },
                grid: {
                    display: false // Hide gridlines
                },
                border: {
                    display: false // Remove y-axis line
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            },
            tooltip: {
                enabled: false // Disable tooltips
            },
            datalabels: {
                anchor: 'end', // Position the label at the end of the bar
                align: 'end', // Align the label to the right of the bar
                formatter: (value) => `${value}%`, // Append '%' to the value
                color: '#000', // Label color
                font: {
                    size: 14 // Label font size
                }
            }
        },
        elements: {
            bar: {
                borderSkipped: 'start', // Removes the border on the left side
            }
        }
    };




    // useEffect(() => {
    //     const url = baseUrl + 'api/tiktok/account/get?username=' + localStorage.getItem("username");
    //     fetch(url, {
    //         method: "GET", 
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("access")
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setTiktokData(data.tiktok_accounts);
    //         console.log("Tiktok Accounts", data.tiktok_accounts);
    //     })
    // }, []);


    // function linkTiktokAccount() {
    //     const link = `https://tikapi.io/account/authorize?client_id=${process.env.REACT_APP_TIKAPI_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TIKAPI_REDIRECT_URI}&scope=view_profile+view_followers+view_notifications+view_analytics+view_collections+view_messages+view_coins+edit_profile+send_messages+conversation_requests+media_actions+follow_actions+live+explore`
    //     const popup = window.open(link, "Login", "width=400,height=600,scrollbars=no,resizable=no");


    //     window.addEventListener("message", (event) => {
    //         // if (event.origin !== new URL(process.env.REACT_APP_TIKAPI_REDIRECT_URI).origin) {
    //         //     return; // Ignore messages from unknown origins
    //         // }
    
    //         if (event.data === "closePopupAndRefresh") {
    //             // alert("here");
    //             popup.close();
    //             window.location.reload(); // Refresh the parent page
    //         }
    //     });
    // }


    function getOrCreatePhylloUser() {
        const link = baseUrl + 'api/phyllo/user/get_or_create?username=' + localStorage.getItem("username");

        fetch(link, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            handlePhylloConnect(data.id, data.sdk_token);  
        })
        .catch((error) => {});
    }

    
    const handlePhylloConnect = (user_id, sdk_token) => {
        const config = {
        clientDisplayName: "BuzzFindr", 
        environment: "staging",
        userId: user_id, 
        token: sdk_token,
        };
    
        const phylloConnect = PhylloConnect.initialize(config);
    
        // Register event listeners
        phylloConnect.on("accountConnected", (accountId, workplatformId, userId) => {
        savePhylloAddedAccount(accountId, workplatformId, userId);
        window.location.reload();
        });
    
        phylloConnect.on("accountDisconnected", (accountId, workplatformId, userId) => {
        console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
        });
    
        phylloConnect.on("tokenExpired", (userId) => {
        console.log(`onTokenExpired: ${userId}`);
        });
    
        phylloConnect.on("exit", (reason, userId) => {
        console.log(`onExit: ${reason}, ${userId}`);
        });
    
        phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
        console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
        });
    
        // Open the Phyllo Connect SDK
        phylloConnect.open();
    
    };

    function savePhylloAddedAccount(accountId, workplatformId, userId) {
        const url = baseUrl + `api/phyllo/account/save?username=${localStorage.getItem("username")}&account_id=${accountId}&workplatform_id=${workplatformId}&user_id=${userId}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Account Added Successfully");
        })
        .catch((error) => {
            alert("Error Adding Account");
        });
    }

      

    function connectSocialMediaAccount() {
        
    }

    function handleRowClick() {

    }

    function handleCampaignsRowClick (event) {
        navigate(`/influencer_campaign/${event.data.id}/${selectedAccount}/${event.data.business_user_id}`);
    }


    function handleAccept(rowData) {
        const url = baseUrl + `api/campaign/influencer/accept?campaign_id=${rowData.id}&account_id=${selectedAccount}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Accepting Campaign Failed");
            }
            window.location.reload();
            return response.json();
        })
        .catch((error) => {})
    }

    function handleDeny(rowData) {
        const url = baseUrl + `api/campaign/influencer/decline?campaign_id=${rowData.id}&account_id=${selectedAccount}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Declining Campaign Failed");
            }
            window.location.reload();
            return response.json();
        })
        .catch((error) => {})
    }


    function influencerAnalyticsScrollHandler(event) {
        // console.log("Scrolling");
        // console.log(event);
    }
    
    const [influencerAccounts, setInfluencerAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");

    // Get Accounts 
    useEffect(() => {
        const url = baseUrl + `api/phyllo/added_accounts/get?username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((response) => {
            if (!response.ok)
                throw new Error("Grabbing Accounts Failed");
            return response.json();
        })
        .then((data) => {
            setInfluencerAccounts(data);
        })  
        .catch((error) => {})
    }, []);

    // Get Campaigns 
    useEffect(() => {
        if (selectedAccount) {
            const url = baseUrl + `api/campaign_influencer/get?account_id=${selectedAccount}`;
            fetch(url, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Grabbing Campaigns Failed");
                }
                return response.json();
            })
            .then((data) => {
                // {id: 1, campaign_name: "Fitness Campaign", business_name: "Amazon", date_created: "10/10/24", views: '100k', likes: '10k', shares: '1k', location: 'USA'},
                // Accepted Campaigns
                setCampaignsTable([]);
                setRequestsTable([]);
                data.accepted.map((item) => {  
                    setCampaignsTable((prevState) => {
                        return [
                            ...prevState, 
                            {
                                "id": item.campaign.id,
                                "campaign_name": item.campaign.campaign_name, 
                                "business_name": item.company_name, 
                                "date_created": item.campaign.timestamp.split("T")[0],
                                "business_user_id": item.campaign.user
                            }
                        ];
                    })            
                }); 
                // Pending Campaigns 
                // {id: 1, business_name: "Amazon", request_date: "10/10/24", post_type: "Reel", content_provider: "Influencer", payment_type: "hourly"}, 
                data.pending_data.map((item) => {  
                    setRequestsTable((prevState) => {
                        return [
                            ...prevState, 
                            {
                                "id": item.campaign.id,
                                "campaign_name": item.campaign.campaign_name, 
                                "business_name": item.company_name, 
                                "request_date": item.campaign.timestamp.split("T")[0], 
                                "service_type": item.service_type,
                                "pricing_method": item.pricing_method, 
                                "price": item.final_price, 
                                "amount": item.amount,
                                "content_provider": item.content_provider, 
                                "total": item.final_price * item.amount,
                                "business_user_id": item.campaign.id    
                            }
                        ];
                    })            
                }); 

            
            })
            .catch((error) => {});
        }
    }, [selectedAccount]);




    useEffect(() => {
        let url = baseUrl + `api/phyllo/account/filter?account_id=${selectedAccount}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((summaryResponse) => {
            if (!summaryResponse.ok) {
                throw new Error("Failed to fetch account summary");
            }
            return summaryResponse.json()
        })
        .then((summaryData) => {
            setPhylloAccountSummary(summaryData);
            console.log("Account Summary ", summaryData);
            
        })
        .catch((error) => {});

        let contentDataUrl = baseUrl + `api/phyllo/content_data?account_id=${selectedAccount}`;
        fetch(contentDataUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((contentResponse) => {
            if (!contentResponse.ok) {
                throw new Error("Failed to fetch account summary");
            }
            return contentResponse.json()
        })
        .then((contentData) => {
            setPhylloContentData(contentData);
            console.log("Content Data ", contentData);
            
        })
        .catch((error) => {});
        
        let contentDataDailyUrl = baseUrl + `api/phyllo/content_data/daily?selectedAccount=${selectedAccount}`;
        fetch(contentDataDailyUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((contentDataDailyResponse) => {
            if (!contentDataDailyResponse.ok) {
                throw new Error("Failed to fetch account summary");
            }
            return contentDataDailyResponse.json()
        })
        .then((contentDataDailyData) => {
            setPhylloContentDataDaily(contentDataDailyData);
            console.log("Content Data Daily ", contentDataDailyData);
            
        })
        .catch((error) => {});

        let audienceDemographicsUrl = baseUrl + `api/phyllo/audience_demographics?account_id=${selectedAccount}`;
        fetch(audienceDemographicsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
        .then((audienceDemographicsResponse) => {
            if (!audienceDemographicsResponse.ok) {
                throw new Error("Failed to fetch account summary");
            }
            return audienceDemographicsResponse.json()
        })
        .then((audienceDemographicsData) => {
            setPhylloAudienceDemographics(audienceDemographicsData);
            console.log("Audience Demographics: ", audienceDemographicsData);
        })
        .catch((error) => {});
    }, [selectedAccount]);

    
    

    return (
        <div className="account-container">
            <div className="header">
                <div className="title">
                    <p>Accounts</p>
                </div>
                <div className="add-container">
                    <button className="tiktok-add-button" onClick={getOrCreatePhylloUser}>
                        <img src={tiktokLogo} />
                        <span>Connect</span>
                    </button>
                </div>
            </div>
            <div className="connected-accounts">
                {influencerAccounts ? influencerAccounts.map((influencerAccount) => {
                    return (
                        <>
                            <div
                                className="account"
                                onClick={() => {
                                    setSelectedAccount(influencerAccount.added_account.phyllo_accountid);
                                }}
                            >
                                <div className="icon">
                                    <img
                                        src={influencerAccount.profile.phyllo_image_url}
                                        alt="profile"
                                    />
                                </div>
                                <div className="text">
                                    <div className="username">
                                        <p>{influencerAccount.profile.phyllo_account_platform_username}</p>
                                    </div>
                                    <div className="followers">
                                        <p>{influencerAccount.profile.phyllo_reputation_follower_count}</p>
                                    </div>
                                </div>
                                <div className="settings">
                                    <AddService selectedAccount={selectedAccount} />
                                </div>
                            </div>
                        </>
                    );
                }) : null}
            </div>

            <div className="services">
            <TabMenu 
                model={tabItems} 
                activeIndex={tabActiveIndex} 
                onTabChange={(e) => setTabActiveIndex(e.index)} 
            />
            <div>
                {tabActiveIndex === 0 && <div className="influencer-campaigns">
                    <DataTable
                        value={campaignsTable}
                        paginator
                        showGridlines
                        rows={10}
                        loading={loading}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={['campaign_name', 'num_influencers', 'active_influencers', 'views', 'likes', 'shares', 'location']}
                        // header="Customer Table"
                        // header={header}
                        emptyMessage="No accounts found"
                        onFilter={(e) => setFilters(e.filters)}
                        onRowClick={handleCampaignsRowClick}
                    >
                        <Column
                            field="campaign_name"
                            header="Campaign Name"
                            // filter
                            filterPlaceholder="Search by Campaign"
                            style={{ minWidth: '7rem' }}
                        />
                        <Column
                            field="business_name"
                            header="Business Name"
                            // filter
                            filterPlaceholder="Search by Business"
                            style={{ minWidth: '7rem' }}
                        />
                        <Column
                            field="date_created"
                            header="Date Created"
                            // filter
                            filterPlaceholder="Search by Date"
                            style={{ minWidth: '7rem' }}
                        />
                        {/* <Column
                            field="views"
                            header="Total Views"
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="likes"
                            header="Total Likes"
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="shares"
                            header="Total Shares"
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="location"
                            header="Audience Location"
                            style={{ minWidth: '4rem' }}
                        /> */}
                    </DataTable>
                    </div>}
                {tabActiveIndex === 1 && <div className="influencer-requests">
                        <DataTable
                            value={requestsTable}
                            paginator
                            showGridlines
                            rows={10}
                            loading={requestsLoading}
                            dataKey="id"
                            filters={requestsFilters}
                            // globalFilterFields={['campaign_name', 'num_influencers', 'active_influencers', 'views', 'likes', 'shares', 'location']}
                            // header="Customer Table"
                            // header={header}
                            emptyMessage="No requests"
                            onFilter={(e) => setRequestsFilters(e.filters)}
                            // onRowClick={handleRowClick}
                            // onRowClick={handleCampaignsRowClick}
                        >
                            <Column
                                field="business_name"
                                header="Business"
                                filterPlaceholder="Search by Campaign"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="request_date"
                                header="Date"
                                filterPlaceholder="Search by Business"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="content_provider"
                                header="Content Provider"
                                filterPlaceholder="Search by Date"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="service_type"
                                header="Service Type"
                                filterPlaceholder="Search by Date"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="pricing_method"
                                header="Pricing Method"
                                filterPlaceholder="Search by Date"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="price"
                                header="Price"
                                filterPlaceholder="Search by Date"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="amount"
                                header="Amount"
                                filterPlaceholder="Search by Date"
                                style={{ minWidth: '7rem' }}
                            />
                            <Column
                                field="total"
                                header="Total"
                                style={{ minWidth: '4rem' }}
                            />
                            <Column
                                field="action"
                                header=""
                                style={{ minWidth: '4rem' }}
                                body={(rowData) => (
                                    <div className="button-container">
                                        <button className="accept-btn" onClick={() => handleAccept(rowData)}>Accept</button>
                                        <button className="reject-btn" onClick={() => handleDeny(rowData)}>Deny</button>
                                    </div>
                                )} />
                        </DataTable>
                    </div>}
                {tabActiveIndex === 2 && <div className="influencer-analytics" onScroll={influencerAnalyticsScrollHandler}>
                        <div className="summary-container">
                            <div className="header">
                                <h2>Summary</h2>
                            </div>
                            <div className="content">
                                <div className="summary-top">
                                    <div className="profile-picture">
                                        <img src={phylloAccountSummary.phyllo_image_url} />
                                    </div>
                                    <div className="profile-information">
                                        <div className="profile-name">
                                            <p>{phylloAccountSummary[0].phyllo_account_platform_username}</p>
                                        </div>
                                        <div className="profile-account">
                                            <p>@{phylloAccountSummary[0].phyllo_account_platform_username}</p>
                                        </div>
                                        <div className="profile-bio">
                                            {/* <p>This is my bio!</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="summary-middle">
                                    <div className="summary followers">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-users"></i>
                                            </div>
                                            <div className="amount">
                                            <p>{phylloAccountSummary[0].phyllo_reputation_follower_count}</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Followers</p></div>
                                        </div>
                                    </div>
                                    <div className="summary engagement-rate">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-bell"></i>
                                            </div>
                                            <div className="amount">
                                            <p>{phylloAccountSummary[0].engagement_rate}%</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Engagement</p></div>
                                        </div>
                                    </div>
                                    <div className="summary average-views">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-eye"></i>
                                            </div>
                                            <div className="amount">
                                                <p>{phylloAccountSummary[0].avg_view_count}</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Average Views</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="summary-bottom">
                                    <div className="summary average-likes">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-heart"></i>
                                            </div>
                                            <div className="amount">
                                                <p>{phylloAccountSummary[0].avg_like_count}</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Average Likes</p></div>
                                        </div>
                                    </div>
                                    <div className="summary average-comments">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-comment"></i>
                                            </div>
                                            <div className="amount">
                                                <p>100</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Average Comments</p></div>
                                        </div>
                                    </div>
                                    <div className="summary average-shares">
                                        <div className="top-align">
                                            <div className="icon">
                                                <i class="pi pi-share-alt"></i>
                                            </div>
                                            <div className="amount">
                                                <p>{phylloAccountSummary[0].avg_share_count}</p>
                                            </div>
                                        </div>
                                        <div className="bottom-align">
                                            <div className="title"><p>Average Shares</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="engagement-metrics">
                            <div className="header">
                                <h2>Engagement Metrics</h2>
                            </div>
                            <div className="content">
                                <div className="navigation">
                                    <div className="nav-element account selected" ref={engagementAccountNavRef} onClick={() => {
                                        setEngagementMetricsNavButton(0);
                                        engagementAccountNavRef.current.classList.add("selected");
                                        engagementPostNavRef.current.classList.remove("selected");
                                        }}>
                                        <span>Account</span>
                                    </div>
                                    <div className="nav-element post" ref={engagementPostNavRef} onClick={() => {
                                        setEngagementMetricsNavButton(1);
                                        engagementAccountNavRef.current.classList.remove("selected");
                                        engagementPostNavRef.current.classList.add("selected");
                                        }}>
                                        <span>Post</span>
                                    </div>
                                </div>
                                {engagementMetricsNavButton == 0 ? 
                                    <div className="chart-container account">
                                        <div className="chart impressions">
                                            <div className="chart-title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.impression_organic_count} labels={phylloContentDataDaily.published_at}/>
                                            </div>
                                        </div>
                                        <div className="chart reach">
                                            <div className="chart-title">
                                                <p>Reach</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} />    */}
                                                <InfluencerChart data={phylloContentDataDaily.reach_organic_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        <div className="chart likes">
                                            <div className="chart-title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} />    */}
                                                <InfluencerChart data={phylloContentDataDaily.like_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        <div className="chart views">
                                            <div className="chart-title">
                                                <p>Views</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.view_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        <div className="chart shares">
                                            <div className="chart-title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.share_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        <div className="chart comments">
                                            <div className="chart-title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.comment_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        {/* <div className="chart website-clicks">
                                            <div className="chart-title">
                                                <p>Website Clicks</p>
                                            </div>
                                            <div className="chart-chart">
                                                <Chart type="line" data={chartData} options={chartOptions} />
                                            </div>
                                        </div> */}
                                        {/* <div className="chart follow-unfollow">
                                            <div className="chart-title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="chart-chart">
                                                <Chart type="line" data={chartData} options={chartOptions} />
                                            </div>
                                        </div> */}
                                        <div className="chart paid-impressions">
                                            <div className="chart-title">
                                                <p>Paid Impressions</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.impression_paid_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                        <div className="chart paid-reach">
                                            <div className="chart-title">
                                                <p>Paid Reach</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentDataDaily.reach_paid_count} labels={phylloContentDataDaily.published_at} />
                                            </div>
                                        </div>
                                    </div>
                                : null}
                                {engagementMetricsNavButton == 1 ? 
                                    <div className="chart-container post">
                                        <div className="chart impressions">
                                            <div className="chart-title">
                                                <p>Impressions</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.impression_organic_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart reach">
                                            <div className="chart-title">
                                                <p>Reach</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} />    */}
                                                <InfluencerChart data={phylloContentData.reach_organic_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart likes">
                                            <div className="chart-title">
                                                <p>Likes</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} />    */}
                                                <InfluencerChart data={phylloContentData.like_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart views">
                                            <div className="chart-title">
                                                <p>Views</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.view_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart shares">
                                            <div className="chart-title">
                                                <p>Shares</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.share_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart comments">
                                            <div className="chart-title">
                                                <p>Comments</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                            </div>
                                        </div>
                                        <div className="chart website-clicks">
                                            <div className="chart-title">
                                                <p>Website Clicks</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.comment_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart paid-impressions">
                                            <div className="chart-title">
                                                <p>Paid Impressions</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.impression_paid_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                        <div className="chart paid-reach">
                                            <div className="chart-title">
                                                <p>Paid Reach</p>
                                            </div>
                                            <div className="chart-chart">
                                                {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                                                <InfluencerChart data={phylloContentData.reach_paid_count} labels={phylloContentDataDaily.content_id} />
                                            </div>
                                        </div>
                                    </div>
                                : null}
                                
                            </div>
                        </div>
                        <div className="audience-demographics">
                            <div className="header">
                                <h2>Audience Demographics</h2>
                            </div>
                            <div className="content">
                                <div className="navigation">
                                    <div className="nav-element location selected" ref={audienceLocationNavRef} onClick={() => {
                                        setAudienceDemographicsNavButton(0);
                                        audienceLocationNavRef.current.classList.add("selected");
                                        audienceGenderAgeNavRef.current.classList.remove("selected");
                                        
                                    }}>
                                        <span>Location</span>
                                    </div>
                                    <div className="nav-element gender-age" ref={audienceGenderAgeNavRef} onClick={() => {
                                        setAudienceDemographicsNavButton(1);
                                        audienceLocationNavRef.current.classList.remove("selected");
                                        audienceGenderAgeNavRef.current.classList.add("selected");
                                    }}>
                                        <span>Gender & Age</span>
                                    </div>
                                </div>
                                <div className="chart-container">
                                    {audienceDemographicsNavButton == 0 ? 
                                        <div className="chart location">
                                            <div className="country-chart">
                                                <div className="chart-header">
                                                    <h2>Countries</h2>
                                                </div>
                                                <Chart type="bar" data={chartCountryData} options={chartCountryOptions} plugins={[ChartDataLabels]}/>
                                            </div>
                                            <div className="city-chart">
                                                <div className="chart-header">
                                                    <h2>Cities</h2>
                                                </div>
                                                <Chart type="bar" data={chartCityData} options={chartCityOptions} plugins={[ChartDataLabels]}/>
                                            </div>                                        
                                        </div>
                                    : null}
                                    
                                    {audienceDemographicsNavButton == 1 ? 
                                        <div className="chart gender-age">
                                            <div className="gender-chart">
                                                <div className="chart-header">
                                                    <h2>Gender Distribution</h2>
                                                </div>
                                                <Chart type="doughnut" data={chartGenderData} options={chartGenderOptions} />
                                            </div>
                                            <div className="age-chart">
                                                <div className="chart-header">
                                                    <h2>Age Distribution</h2>
                                                </div>
                                                <Chart type="bar" data={chartAgeData} options={chartAgeOptions} plugins={[ChartDataLabels]}/>
                                            </div>
                                        </div>
                                    : null}
                                    
                                    
                                </div>
                            </div>
                        </div>
                        {/* <Chart type="line" data={chartData} options={chartOptions} /> */}
                    </div>}
            </div>
            </div>
        </div>
    );
}
