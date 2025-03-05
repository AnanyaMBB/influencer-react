import "./InfluencerProfile.css";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LineGraph from "../components/LineGraph";
import SentimentChart from "../components/SentimentChart";
import FollowUnfollowChart from "../components/FollowUnfollowChart";
import DateRangePicker from "../components/DateRangePicker";
import AgeGroupChart from "../components/AgeGroupChart";
import GenderChart from "../components/GenderChart";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import InfluencerChart from "../components/InfluencerChart";
import { UpdateModeEnum } from "chart.js";
import { InputText } from "primereact/inputtext";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { time } from "framer-motion";
import { set } from "date-fns";
import { treemapBinary } from "d3";

export default function InfluencerProfile() {
    const [page, setPage] = useState("services");
    const [servicePage, setServicePage] = useState("feed-post-service");
    const [engagementPage, setEngagementPage] = useState("account-metrics");
    const [demographicsPage, setDemographicsPage] = useState("country");
    // const { account_type } = useParams("instagram");
    // const { account_id } = useParams();
    const { account_type, account_id} = useParams();
    const [selectedContentProvider, setSelectedContentProvider] =
        useState("influencer");
    const [feedPrice, setFeedPrice] = useState([]);
    const [feedDuration, setFeedDuration] = useState(0);
    const [feedTotalPrice, setFeedTotalPrice] = useState(0);
    const [numPosts, setNumPosts] = useState(0);

    const [selectedPricingType, setSelectedPricingType] = useState("hourly");

    const [services, setServices] = useState([]);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    const [phylloAccountSummary, setPhylloAccountSummary] = useState({});
    const [phylloContentData, setPhylloContentData] = useState([]); 
    const [phylloContentDataDaily, setPhylloContentDataDaily] = useState([]);
    const [phylloAudienceDemographics, setPhylloAudienceDemographics] = useState([]);

    const chartData = {
            labels: phylloContentDataDaily.published_at,
            datasets: [
                {
                    label: 'Impressions',
                    data: phylloContentDataDaily.impression_organic_count,
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

        const reelPostPricingRef = useRef(null);
        const storyPostPricingRef = useRef(null);
        const livePostPricingRef = useRef(null);
        const reelViewPricingRef = useRef(null);
        const storyViewPricingRef = useRef(null);
        const liveViewPricingRef = useRef(null);
        const reelLikePricingRef = useRef(null);
        const storyLikePricingRef = useRef(null);
        const liveLikePricingRef = useRef(null);

        const reelBusinessContentProviderRef = useRef(null);
        const reelInfluencerContentProviderRef = useRef(null);
        const storyBusinessContentProviderRef = useRef(null);
        const storyInfluencerContentProviderRef = useRef(null);
        const liveBusinessContentProviderRef = useRef(null);
        const liveInfluencerContentProviderRef = useRef(null);

        const [feedPricingMethod, setFeedPricingMethod] = useState("post");
        const [storyPricingMethod, setStoryPricingMethod] = useState("post");
        const [livePricingMethod, setLivePricingMethod] = useState("post");

        const [feedContentProvider, setFeedContentProvider] = useState("business"); 
        const [storyContentProvider, setStoryContentProvider] = useState("business");
        const [liveContentProvider, setLiveContentProvider] = useState("business");

        function influencerAnalyticsScrollHandler(event) {
            
        }

        function feedPricingMethodHandler(method) {
            return () => {
                if (method === "hourly") {
                    reelPostPricingRef.current.classList.add("content-selected");
                    reelViewPricingRef.current.classList.remove("content-selected");
                    reelLikePricingRef.current.classList.remove("content-selected");
                    setFeedPricingMethod("hourly");
                } else if (method === "view") {
                    reelPostPricingRef.current.classList.remove("content-selected");
                    reelViewPricingRef.current.classList.add("content-selected");
                    reelLikePricingRef.current.classList.remove("content-selected");
                    setFeedPricingMethod("view");
                } else if (method === "like") {
                    reelPostPricingRef.current.classList.remove("content-selected");
                    reelViewPricingRef.current.classList.remove("content-selected");
                    reelLikePricingRef.current.classList.add("content-selected");
                    setFeedPricingMethod("like");
                }
            }
        }

        function storyPricingMethodHandler(method) {
            return () => {
                if (method === "post") {
                    storyPostPricingRef.current.classList.add("content-selected");
                    storyViewPricingRef.current.classList.remove("content-selected");
                    storyLikePricingRef.current.classList.remove("content-selected");
                    setStoryPricingMethod("post");
                } else if (method === "view") {
                    storyPostPricingRef.current.classList.remove("content-selected");
                    storyViewPricingRef.current.classList.add("content-selected");
                    storyLikePricingRef.current.classList.remove("content-selected");
                    setStoryPricingMethod("view");
                } else if (method === "like") {
                    storyPostPricingRef.current.classList.remove("content-selected");
                    storyViewPricingRef.current.classList.remove("content-selected");
                    storyLikePricingRef.current.classList.add("content-selected");
                    setStoryPricingMethod("like");
                }
            }
        }

        function livePricingMethodHandler(method) {
            return () => {
                if (method === "post") {
                    livePostPricingRef.current.classList.add("content-selected");
                    liveViewPricingRef.current.classList.remove("content-selected");
                    liveLikePricingRef.current.classList.remove("content-selected");
                    setLivePricingMethod("post");
                } else if (method === "view") {
                    livePostPricingRef.current.classList.remove("content-selected");
                    liveViewPricingRef.current.classList.add("content-selected");
                    liveLikePricingRef.current.classList.remove("content-selected");
                    setLivePricingMethod("view");
                } else if (method === "like") {
                    livePostPricingRef.current.classList.remove("content-selected");
                    liveViewPricingRef.current.classList.remove("content-selected");
                    liveLikePricingRef.current.classList.add("content-selected");
                    setLivePricingMethod("like");
                }
            }
        }

        function feedContentProviderHandler(provider) {
            return () => {
                if (provider === "business") {
                    reelBusinessContentProviderRef.current.classList.add("content-selected");
                    reelInfluencerContentProviderRef.current.classList.remove("content-selected");
                    setFeedContentProvider("business");
                } else if (provider === "influencer") {
                    reelBusinessContentProviderRef.current.classList.remove("content-selected");
                    reelInfluencerContentProviderRef.current.classList.add("content-selected");
                    setFeedContentProvider("influencer");
                }
            }
        }

        function storyContentProviderHandler(provider) {
            return () => {
                if (provider === "business") {
                    storyBusinessContentProviderRef.current.classList.add("content-selected");
                    storyInfluencerContentProviderRef.current.classList.remove("content-selected");
                    setStoryContentProvider("business");
                } else if (provider === "influencer") {
                    storyBusinessContentProviderRef.current.classList.remove("content-selected");
                    storyInfluencerContentProviderRef.current.classList.add("content-selected");
                    setStoryContentProvider("influencer");
                }
            }
        }

        function liveContentProviderHandler(provider) {
            return () => {
                if (provider === "business") {
                    liveBusinessContentProviderRef.current.classList.add("content-selected");
                    liveInfluencerContentProviderRef.current.classList.remove("content-selected");
                    setLiveContentProvider("business");
                } else if (provider === "influencer") {
                    liveBusinessContentProviderRef.current.classList.remove("content-selected");
                    liveInfluencerContentProviderRef.current.classList.add("content-selected");
                    setLiveContentProvider("influencer");
                }
            }
        }


        

    useEffect(() => {
        let url = baseUrl + `api/phyllo/account/filter?account_id=${account_id}`;
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

        let contentDataUrl = baseUrl + `api/phyllo/content_data?account_id=${account_id}`;
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
        
        let contentDataDailyUrl = baseUrl + `api/phyllo/content_data/daily?account_id=${account_id}`;
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

        let audienceDemographicsUrl = baseUrl + `api/phyllo/audience_demographics?account_id=${account_id}`;
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
    }, []);

    const [selectedCampaigns, setSelectedCampaigns] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    // const campaigns = [
    //     { id: 1, code: "P1001", campaign: "Product A", date: "2024-02-01" },
    //     { id: 2, code: "P1002", campaign: "Product B", date: "2024-01-15" },
    //     { id: 3, code: "P1003", campaign: "Product C", date: "2024-03-10" },
    //     { id: 4, code: "P1004", campaign: "Product D", date: "2024-02-20" },
    //     { id: 5, code: "P1005", campaign: "Product E", date: "2024-01-25" },
    //     { id: 6, code: "P1006", campaign: "Product F", date: "2024-11-24" },
    //     { id: 7, code: "P1007", campaign: "Product G", date: "2024-08-01" },
    //     { id: 8, code: "P1008", campaign: "Product H", date: "2024-12-15" },
    //     { id: 9, code: "P1009", campaign: "Product I", date: "2024-09-10" },
    //     { id: 10, code: "P1010", campaign: "Product J", date: "2024-07-20" },
    //     { id: 11, code: "P1011", campaign: "Product K", date: "2024-06-25" },

    // ];

    const [campaigns, setCampaigns] = useState([]);
    // Filter function
    const filteredCampaigns = campaigns.filter((campaign) =>
        Object.values(campaign).some((value) =>
            value.toString().toLowerCase().includes(globalFilter.toLowerCase())
        )
    );

    const [showAddCampaignOverlay, setShowAddCampaignOverlay] = useState(false);
    const [pricingMethod, setPricingMethod] = useState("");
    const [contentProvider, setContentProvider] = useState("business");
    const [serviceType, setServiceType] = useState("");

    const [feedAmount, setFeedAmount] = useState();
    const [storyAmount, setStoryAmount] = useState();
    const [liveAmount, setLiveAmount] = useState();

    const [amount, setAmount] = useState();

    function addToCampaignHandler(postType) {
        const url = baseUrl + `api/campaign/get?username=${localStorage.getItem("username")}`;
    
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get campaigns");
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((item) => {
                setCampaigns((prevState) => {
                    return [
                        ...prevState,
                        {
                            id: item.id,
                            campaign: item.campaign_name,
                            date: item ? item.timestamp ? item.timestamp.split("T")[0] : null : null
                        }
                    ]
                });
            });
        })
        .catch((error) => {
            console.error(error);
        });
    
        let pricingMethod = "";
        let contentProvider = "";
    
        if (postType === "feed") {

            setPricingMethod(feedPricingMethod);
            setContentProvider(feedContentProvider);
            setServiceType("feed");
            setAmount(feedAmount);
            // pricingMethod = feedPricingMethod;
            // contentProvider = feedContentProvider;
        } else if (postType === "story") {
            setPricingMethod(storyPricingMethod);
            setContentProvider(storyContentProvider);
            setServiceType("story");
            setAmount(storyAmount);
            // pricingMethod = storyPricingMethod;
            // contentProvider = storyContentProvider;
        } else if (postType === "live") {
            setPricingMethod(livePricingMethod);
            setContentProvider(liveContentProvider);
            setServiceType("live");
            setAmount(liveAmount);
            // pricingMethod = livePricingMethod;
            // contentProvider = liveContentProvider;
        }
    
        setShowAddCampaignOverlay(true);
    }
    

    
    function addCampaignCancelHandler() {
        setShowAddCampaignOverlay(false);   
        setCampaigns([]);
    }

    useEffect(() => {
        const url = baseUrl + `api/influencer/service/get?account_id=${account_id}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch services");
            }
            return response.json();
        })
        .then((data) => {
            setFeedPrice(data);
            if (feedContentProvider == "business") {
                setFeedTotalPrice((data.filter((entry) => {
                    return entry.content_provider === "business";
                })[0]?.price || 0) * feedDuration * numPosts);
            } else if (feedContentProvider == "influencer") {
                setFeedTotalPrice((data.filter((entry) => {
                    return entry.content_provider === "influencer";
                })[0]?.price || 0) * feedDuration * numPosts);
            }
        })
        .catch((error) => {});
    }, []);

    useEffect(() => {
        if (feedContentProvider == "business") {
            setFeedTotalPrice((feedPrice.filter((entry) => {
                return entry.content_provider === "business";
            })[0]?.price || 0) * feedDuration * numPosts);
        } else if (feedContentProvider == "influencer") {
            setFeedTotalPrice((feedPrice.filter((entry) => {
                return entry.content_provider === "influencer";
            })[0]?.price || 0) * feedDuration * numPosts);
        }
    }, [feedContentProvider, feedDuration, numPosts]);
    

    function addCampaignAddHandler() {
        console.log("service type: ", serviceType);
        console.log("pricing method: ", pricingMethod);
        selectedCampaigns.forEach((campaign) => {
            const url = baseUrl + `api/campaign/influencer/add?campaign_id=${campaign.id}&account_id=${account_id}&service_type=feed&pricing_method=daily&content_provider=${feedContentProvider}&amount=${feedDuration}&num_posts=${numPosts}`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add campaign");
                }
                return response.json()
            })
            .catch((error) => {});
            
        });
        
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
                        {showAddCampaignOverlay ? 
                            <div className="add-campaign-overlay not-visible">
                                <div className="add-campaign-overlay-header">
                                    <h2>Select Campaigns</h2>
                                </div>
                                <div className="campaigns">
                                    <div className="campaign-search">
                                        <input type="text" placeholder="Search Campaigns" onChange={(e) => setGlobalFilter(e.target.value)} value={globalFilter}/>
                                    </div>
                                    <div className="campaign-content">                                   
                                        <DataTable
                                            value={filteredCampaigns}
                                            selection={selectedCampaigns}
                                            onSelectionChange={(e) => setSelectedCampaigns(e.value)}
                                            dataKey="id"
                                            tableStyle={{ minWidth: "4rem" }}
                                        >
                                            <Column selectionMode="multiple" />
                                            <Column field="campaign" header="Campaign" />
                                            <Column field="date" header="Date" />
                                        </DataTable>

                                    </div>
                                </div>
                                <div className="campaign-selection-action">
                                    <button className="select-campaign-cancel-button" onClick={addCampaignCancelHandler}>Cancel</button>
                                    <button className="select-campaign-add-button" onClick={addCampaignAddHandler}>Add to Campaign</button>
                                </div>
                            </div>
                        : null}
                        
                        <div className="service reels-service">
                            <div className="service-header">
                                <h2>Feed</h2>
                            </div>
                            <div className="service-content">
                                <div className="content content-provider">
                                    <div className="content-header">
                                        <span>Content Provider</span>
                                    </div>
                                    <div className="content-providers content-content">
                                        <div className="provider content-selected" onClick={feedContentProviderHandler("business")} ref={reelBusinessContentProviderRef}>
                                            <span>Business</span>
                                        </div>
                                        <div className="provider" onClick={feedContentProviderHandler("influencer")} ref={reelInfluencerContentProviderRef}>
                                            <span>Influencer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content price">

                                    <span>Price per day:</span>
                                    {feedContentProvider == "business" && <span>$<span id="rate">{feedPrice?.filter((entry) => {
                                        return entry.content_provider === "business";
                                    })[0]?.price || "N/A"}</span></span>}

                                    {feedContentProvider == "influencer" && <span>$<span id="rate">{feedPrice?.filter((entry) => {
                                                                            return entry.content_provider === "influencer";
                                                                        })[0]?.price || "N/A"}</span></span>}
                                    
                                </div>
                                <div className="content duration">
                                    <label for="days">Select Duration:</label>
                                    <input type="number" id="days" min="1" value={feedDuration} onChange={(e) => {
                                        setFeedDuration(e.target.value);
                                    }}/>
                                </div>
                                <div className="content duration">
                                    <label for="posts">Num. Posts:</label>
                                    <input type="number" id="days" min="1" value={numPosts} onChange={(e) => {
                                        setNumPosts(e.target.value);
                                    }}/>
                                </div>
                                <div className="content price-display">
                                    Total: $<span id="total-price">{feedTotalPrice}</span>
                                </div>
                                {/* <div className="content pricing-method">
                                    <div className="content-header">
                                        <span>Pricing Method</span>
                                    </div>
                                    <div className="pricing-methods content-content">
                                        <div className="method content-selected" onClick={feedPricingMethodHandler("hourly")} ref={reelPostPricingRef}>
                                            <span className="method-header">Hourly</span>
                                            <span className="method-price">$100</span>
                                        </div>
                                        <div className="method" onClick={feedPricingMethodHandler("view")} ref={reelViewPricingRef}>
                                            <span className="method-header">View</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                        <div className="method" onClick={feedPricingMethodHandler("like")} ref={reelLikePricingRef}>
                                            <span className="method-header">Like</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                    </div>
                                    <div className="content-header pricing-amount-header">
                                        <span>Amount</span>
                                    </div>
                                    <div className="pricing-amount">
                                        <input type="number" placeholder="" value={feedAmount} onChange={(e) => {
                                            setFeedAmount(e.target.value);
                                        }}/>
                                    </div>
                                </div> */}
                                
                                <div className="content action">
                                    <button className="service-button reels-button" onClick={() => addToCampaignHandler("feed")}>Add to Campaign</button>
                                </div>
                            </div>
                        </div>
                        <div className="service story-service">
                            {/* <div className="coming-soon"></div> */}
                            <div className="service-header">
                                <h2>Story</h2>
                            </div>
                            {/* <div className="service-content">
                                <div className="content pricing-method">
                                    <div className="content-header">
                                        <span>Pricing Method</span>
                                    </div>
                                    <div className="pricing-methods content-content">
                                        <div className="method content-selected" onClick={storyPricingMethodHandler("hourly")} ref={storyPostPricingRef}>
                                            <span className="method-header">Hourly</span>
                                            <span className="method-price">$100</span>
                                        </div>
                                        <div className="method" onClick={storyPricingMethodHandler("view")} ref={storyViewPricingRef}>
                                            <span className="method-header">View</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                        <div className="method" onClick={storyPricingMethodHandler("like")} ref={storyLikePricingRef}>
                                            <span className="method-header">Like</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                    </div>
                                    <div className="content-header pricing-amount-header">
                                        <span>Amount</span>
                                    </div>
                                    <div className="pricing-amount">
                                        <input type="number" placeholder="" />
                                    </div>
                                </div>
                                <div className="content content-provider">
                                    <div className="content-header">
                                        <span>Content Provider</span>
                                    </div>
                                    <div className="content-providers content-content">
                                        <div className="provider content-selected" onClick={storyContentProviderHandler("business")} ref={storyBusinessContentProviderRef}>
                                            <span>Business</span>
                                        </div>
                                        <div className="provider" onClick={storyContentProviderHandler("influencer")} ref={storyInfluencerContentProviderRef}>
                                            <span>Influencer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content action">
                                    <button className="service-button story-button" onClick={() => addToCampaignHandler("story")} disabled>Add to Campaign</button>
                                </div>
                            </div> */}
                        </div>
                        <div className="service live-service">
                            {/* <div className="coming-soon"></div> */}
                            <div className="service-header">
                                <h2>Live</h2>
                            </div>
                            {/* <div className="service-content">
                                <div className="content pricing-method">
                                    <div className="content-header">
                                        <span>Pricing Method</span>
                                    </div>
                                    <div className="pricing-methods content-content">
                                        <div className="method content-selected" onClick={livePricingMethodHandler("hourly")} ref={livePostPricingRef}>
                                            <span className="method-header">Hourly</span>
                                            <span className="method-price">$100</span>
                                        </div>
                                        <div className="method" onClick={livePricingMethodHandler("view")} ref={liveViewPricingRef}>
                                            <span className="method-header">View</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                        <div className="method" onClick={livePricingMethodHandler("like")} ref={liveLikePricingRef}>
                                            <span className="method-header">Like</span>
                                            <span className="method-price">$0.09 CPT</span>
                                        </div>
                                    </div>
                                    <div className="content-header pricing-amount-header">
                                        <span>Amount</span>
                                    </div>
                                    <div className="pricing-amount">
                                        <input type="number" placeholder="" />
                                    </div>
                                </div>
                                <div className="content content-provider">
                                    <div className="content-header">
                                        <span>Content Provider</span>
                                    </div>
                                    <div className="content-providers content-content">
                                        <div className="provider content-selected" onClick={liveContentProviderHandler("business")} ref={liveBusinessContentProviderRef}>
                                            <span>Business</span>
                                        </div>
                                        <div className="provider" onClick={liveContentProviderHandler("influencer")} ref={liveInfluencerContentProviderRef}>
                                            <span>Influencer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content action">
                                    <button className="service-button reels-button" onClick={() => addToCampaignHandler("live")} disabled>Add to Campaign</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                ) : null}
                {page === "analytics" ? (<div className="influencer-analytics" onScroll={influencerAnalyticsScrollHandler}>
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
                                                <InfluencerChart data={phylloContentDataDaily.view_count} labels={phylloContentDataDaily.published_at} />
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
                                                <InfluencerChart data={phylloContentData.comment_count} labels={phylloContentDataDaily.content_id} />
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
                    </div>) : null}
            </div>
        </div>
    );
}
