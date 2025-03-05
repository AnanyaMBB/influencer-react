import "./Campaign.css";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { Splitter, SplitterPanel } from 'primereact/splitter';
    

import { Steps } from "primereact/steps";
import { InputText } from "primereact/inputtext";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import CampaignHeader from "../components/CampaignHeader";

import { FileUpload } from "primereact/fileupload";

import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { baseUrl } from "../shared";

import Payment from "../components/Payment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import InfluencerChart from "../components/InfluencerChart";

export default function Campaign() {
    const { campaign_id } = useParams();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }

        console.log("CAMPAIGN ID: ", campaign_id);
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const steps = [
        // { label: 'Edit Campaign', command: () => console.log('Step 1 Selected') },
        // { label: 'Add Influencer', command: () => console.log('Step 2 Selected') },
        { label: 'Creatives', command: () => {} },
        // { label: 'Contract', command: () => {} },
        { label: 'Payment', command: () => {} },
        { label: 'Analytics', command: () => {} },
        { label: 'Retargeting', command: () => {} },
    ];

    const [acceptedInfluencers, setAcceptedInfluencers] = useState([]);
    const [pendingInfluencers, setPendingInfluencers] = useState([]);   
    
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        platform: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        followers: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    
    const [loading, setLoading] = useState(false); // Loading state



    const [contracts, setContracts] = useState([]);
    
    const [contractFilters, setContractFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        platform: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        followers: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    
    const [contractLoading, setContractLoading] = useState(false); // Loading state


    // Files Table 
    // const files = [];
    const [fileFilters, setFileFIlters] = useState();
    const [fileLoading, setFileLoading] = useState(false);

    const [visible, setVisible] = useState(false);

    const sidebarRef = useRef(null);

    const [showSteps, setShowSteps] = useState(false);

    const [caption, setCaption] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");


    const platformTemplate = (rowData) => {
        if (rowData.platform === "Instagram") {
            return <span class="platform-icon-container"><i class="pi pi-instagram platform-icon"></i></span>;
        }
        else if (rowData.platform === "YouTube") {
            return <span class="platform-icon-container"><i class="pi pi-youtube platform-icon"></i></span>;
        }
        else if (rowData.platform === "TikTok") {
            return <span class="platform-icon-container"><i class="pi pi-tiktok platform-icon"></i></span>;
        }
        else if (rowData.platform === "Facebook") {
            return <span class="platform-icon-container"><i class="pi pi-facebook platform-icon"></i></span>;
        }
    };

    const actionTemplate = (rowData) => {
        // return <span dangerouslySetInnerHTML={{ __html: rowData.action }} />;
        console.log("ROW DATA", rowData);
        return <span><i class="pi pi-trash"></i></span>;
    };


    const [audienceDemographicsNavButton, setAudienceDemographicsNavButton] = useState(0);
    const audienceLocationNavRef = useRef(null);
    const audienceGenderAgeNavRef = useRef(null);


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

    const chartCountryData = {
        labels: ['New York City', 'Greater London', 'Los Angeles', 'Moscow', 'São Paulo', 'Tokyo', 'Shanghai', 'Paris', 'Istanbul', 'Dubai', 'Mumbai', 'Sydney', 'Toronto', 'Berlin', 'Barcelona'],
        datasets: [
            {
                label: '% of Data',
                data: [1.7, 1.6, 1.5, 1.4, 1.3, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
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
        labels: ['New York City', 'Greater London', 'Los Angeles', 'Moscow', 'São Paulo'],
        datasets: [
            {
                label: '% of Data',
                data: [1.7, 1.3, 1.2, 0.9, 0.6],
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
                data: [55.4, 39.6, 5.0],
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
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [
            {
                label: '% of Data',
                data: [15, 25, 20, 10, 15, 15],
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
    

    
    const [totalPrice, setTotalPrice] = useState();
    const [selectedInfluencerAccount, setSelectedInfluencerAccount] = useState();
    const [campaignInfluencerTimestamp, setCampaignInfluencerTimestamp] = useState();
    const [campaignDetails, setCampaignDetails] = useState();
    function handleRowClick(e) {
        // navigate(`/profile/${e.data.platform.toLowerCase()}/${e.data.id}`);

        if (activeIndex === 0) {
            sidebarRef.current.classList.toggle("width-0"); 
            sidebarRef.current.classList.toggle("width-15");
            setActiveIndex(0);
            setShowSteps(true);
        }
        setSelectedInfluencerAccount(e.data.account_id);    
        console.log("****** ", e.data);
        setCampaignInfluencerTimestamp(e.data.timestamp);
        const url = baseUrl + `api/contract/version/get/account?username=${localStorage.getItem("username")}&account_id=${e.data.account_id}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get contracts");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Contract Data ", data.phyllo_added_account);
            // setContracts([{
            //     contract_id: data?.contract_id,
            //     contract_name: data?.contract_name, 
            //     business: data?.business,
            //     influencer: data?.phyllo_added_account, 
            //     business_status: "pending", 
            //     influencer_status: "pending",
            // }]);

            setContracts([]);
            data.map((item) => {
                setContracts((prevState) => {
                    return [...prevState, 
                        {
                            contract_id: item?.contract,
                            contract_version: item?.contract_version, 
                            business: item?.business_name,
                            influencer: item?.influencer, 
                            business_status: "pending", 
                            influencer_status: "pending",
                        }
                    ];
                });
            });
        })
        .catch((error) => {})

        const campaignDetailsUrl = baseUrl + `api/campaign/details/get?campaign_id=${campaign_id}&account_id=${e.data.account_id}`;
        fetch(campaignDetailsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) 
                throw new Error("Failed to get campagin details");
            return response.json();
        })
        .then((data) => {
            console.log("data.final_price", data.final_price);
            console.log("data.amount", data.amount);
            setTotalPrice(data.final_price * data.amount);
            setCampaignDetails(data);
            console.log("Campaign Details: ", data);
        })
        .catch((error) => {
            console.log("DETAIL GET ERROR: ", error);
        });
        

    }

    function handleContractTableRowClick(e) {
        navigate(`/contract/${e.data.contract_id}/${e.data.contract_version}`);
    }

    function addInfluencerButtonClickHandler (event) {
        navigate("/discovery");
    }

    function handleInfluencerButtonClick (event) {
        setActiveIndex(0);
        setShowSteps(false);
        sidebarRef.current.classList.toggle("width-0");
        sidebarRef.current.classList.toggle("width-15");
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch('http://localhost:8000/api/upload/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            const data = await response.json();
            alert(`File uploaded successfully! File URL: ${data.file_url}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed!");
        }
    };

    const filesContent = () => {
        return (
            <>
                <div className="files-container">         
                    <div className="file">
                        <video src="/"></video>
                    </div>
                    <div className="file"></div>
                    <div className="file"></div>
                    <div className="file"></div>
                    <div className="file">
                        <video src="/"></video>
                    </div>
                    <div className="file"></div>
                    <div className="file"></div>
                    <div className="file"></div>
                    <div className="file">
                        <video src="/"></video>
                    </div>
                    <div className="file"></div>
                    <div className="file"></div>
                    <div className="file"></div>
                </div>
            </>
        );
    };

    function onUpload (event) {

    }

    useEffect(() => {
        // { id: 1, username: "James Butt", platform: "Instagram", followers: 12000, engagement: "4.5%", views: 1500, likes: 340, location: "Algeria"},
        const url = baseUrl + `api/campaign/influencer/get?campaign_id=${campaign_id}&username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get the influencer list");
            }
            return response.json();
        })
        .then((data) => {
            setAcceptedInfluencers([]);
            setPendingInfluencers([]);
            data.accepted.map((aInfluencers) => {
                setAcceptedInfluencers((prevState) => {
                    return [...prevState, 
                        {
                            id: aInfluencers.latest_phyllo_profile.id,
                            username: aInfluencers.latest_phyllo_profile.phyllo_account_platform_username, 
                            platform: aInfluencers.latest_phyllo_profile.phyllo_work_platform_name,      
                            followers: aInfluencers.latest_phyllo_profile.phyllo_reputation_follower_count, 
                            engagement: aInfluencers.latest_phyllo_profile.engagement_rate, 
                            views: aInfluencers.latest_phyllo_profile.avg_view_count, 
                            likes: aInfluencers.latest_phyllo_profile.avg_like_count,
                            location: aInfluencers.latest_phyllo_profile.phyllo_country,
                            account_id: aInfluencers.latest_phyllo_profile.phyllo_accountid,
                            timestamp: aInfluencers.campaign_influencer.timestamp,
                        }                        
                    ];
                });
            });

            data.pending.map((pInfluencers) => {
                setPendingInfluencers((prevState) => {
                    return [...prevState, 
                        {
                            id: pInfluencers.latest_phyllo_profile.id,
                            username: pInfluencers.latest_phyllo_profile.phyllo_account_platform_username, 
                            platform: pInfluencers.latest_phyllo_profile.phyllo_work_platform_name,      
                            followers: pInfluencers.latest_phyllo_profile.phyllo_reputation_follower_count, 
                            engagement: pInfluencers.latest_phyllo_profile.engagement_rate, 
                            views: pInfluencers.latest_phyllo_profile.avg_view_count, 
                            likes: pInfluencers.latest_phyllo_profile.avg_like_count,
                            location: pInfluencers.latest_phyllo_profile.phyllo_country,
                            account_id: pInfluencers.latest_phyllo_profile.phyllo_accountid,
                            timestamp: pInfluencers.campaign_influencer.timestamp,
                        }                        
                    ];
                });
            });            
        })
        .catch((error) => {})
    }, []);

    function handleInfluencerTableRowClick(event) {

    }

    function fileClickHandler() {

    }

    const [files, setFiles] = useState([]);
    useEffect(() => {
        const url = baseUrl + `api/campaign/file/get/all?campaign=${campaign_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get the file list");
            }
            return response.json();
        })
        .then((data) => {
            setFiles(data);
        })
        .catch((error) => {});

    }, []);

    const [selectedFile, setSelectedFile] = useState();

    const [scheduleRequestBtnState, setScheduleRequestBtnState] = useState();

    function getScheduledDetail (campaign_id, file_id) {    
        if (file_id && campaign_id)
        {   
            const url = baseUrl + `api/campaign/scheduled/details?username=${localStorage.getItem("username")}&campaign_id=${campaign_id}&file_id=${file_id}&account_id=${selectedInfluencerAccount}`;
            fetch(url, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                }
            })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Getting Details Failed");
                return response.json();
            })
            .then((data) => {
                setScheduleRequestBtnState(data);
            })
            .catch((error) => {});
        }
    }

    function scheduleRequestHandler() {
        const url = baseUrl + `api/campaign/post/scheduler?account_id=${selectedInfluencerAccount}&caption=${caption}&media_url=${selectedFile.file_url}&scheduled_time=${scheduledDate}&campaign_id=${campaign_id}&timestamp=${campaignInfluencerTimestamp}&username=${localStorage.getItem("username")}&file_id=${selectedFile.file_id}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .catch((error) => {});
    }

    function acceptScheduleRequestHandler (scheduled_id) {
        const url = baseUrl + `api/campaign/scheduled/accept?scheduled_post_id=${scheduled_id}&username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok)
                throw new Error("Accepting request failed");
            return response.json();
        })
        .catch((error) => {});
    }

    function removeScheduledHandler (scheduled_id) {
        const url = baseUrl + `api/campaign/scheduled/remove?scheduled_post_id=${scheduled_id}&username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => {
            if (!response.ok)
                throw new Error("Failed to remove scheduled post");
        })
        .catch((error) => {});
    }

    const initialOptions = {
        clientId: "AZK_m7FsxCJ1rZXNQNH5CizyZm_TU9lf7RWgrZWgnB-yPL8is5j2ztyBFzyXaEZjIHmTgHtdXEbA3k7a",
        currency: "USD",
        intent: "capture",
    };

    const [campaignAnalytics, setCampaignAnalytics] = useState();

    useEffect(() => {
        let url = baseUrl + `api/campaign/scheduled/get?account_id=${selectedInfluencerAccount}&file_id=${selectedFile?.file_id}`;
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (!response.ok)
                throw new Error("Failed to get scheduled posts");
            return response.json();
        })
        .then((data) => {
            url = baseUrl + `api/campaign/published/content_data?scheduled_post_id=${data.id}`;
            fetch(url, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                }
            })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Failed to get published content data");
                return response.json();
            })
            .then((contentData) => {
                setCampaignAnalytics(contentData);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
        })
        .catch((error) => console.log("Error: ", error));
    }, [selectedFile]);

    return (
        <>
            <div className="campaign-container">
                <div className="campaign-sidebar width-0" ref={sidebarRef}>
                    <div className="sidebar-button-action">
                        <button>
                            <span class="material-symbols-outlined">
                                reply
                            </span>
                            
                            <span class="sidebar-button-text" onClick={handleInfluencerButtonClick}>Influencers</span>
                        </button>
                    </div>
                    <div className="sidebar-steps-action">
                        <Steps
                            model={steps}
                            activeIndex={activeIndex}
                            onSelect={(e) => setActiveIndex(e.index)}
                            readOnly={false}
                        />
                    </div>
                </div>
                <div className="campaign-main">
                    {/* {(activeIndex === 0) && */}
                    {(!showSteps) && <div className="campaign-main-add-influencer">
                        <CampaignHeader showButton={true} buttonLink="/discovery" buttonText="Add Influencer" isFileUpload={false} campaignName={campaignDetails?.campaign}/>
                        <div className="table-header">
                            <h2>Accepted Influencers</h2>
                        </div>
                        <DataTable
                        value={acceptedInfluencers}
                        paginator
                        showGridlines
                        rows={15}
                        loading={loading}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={['username', 'platform', 'followers', 'engagement', 'views', 'likes', 'location']}
                        // header="Customer Table"
                        // header={header}
                        emptyMessage="No accounts found"
                        onFilter={(e) => setFilters(e.filters)}
                        onRowClick={handleRowClick}
                    >
                        <Column
                            field="username"
                            header="Username"
                            // filter
                            filterPlaceholder="Search by Username"
                            style={{ minWidth: '7rem' }}
                        />
                        <Column
                            field="platform"
                            header="Platform"
                            // filter
                            filterPlaceholder="Search by Platform"
                            style={{ minWidth: '4rem'}}
                            body={platformTemplate}
                        />
                        <Column
                            field="followers"
                            header="Followers"
                            // filter
                            style={{ minWidth: '4rem'}}
                        />
                        <Column
                            field="engagement"
                            header="Engagement"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="views"
                            header="Views"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="likes"
                            header="Likes"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="location"
                            header="Audience Location"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <column 
                            field="action"
                            header=""
                            style={{ minWidth: '4rem' }}
                            body={actionTemplate}
                        />
                        </DataTable>
                        
                        <div className="table-header">
                            <h2>Pending Influencers</h2>
                        </div>
                    <DataTable
                        value={pendingInfluencers}
                        paginator
                        showGridlines
                        rows={15}
                        loading={loading}
                        dataKey="id"
                        filters={filters}
                        globalFilterFields={['username', 'platform', 'followers', 'engagement', 'views', 'likes', 'location']}
                        // header="Customer Table"
                        // header={header}
                        emptyMessage="No accounts found"
                        onFilter={(e) => setFilters(e.filters)}
                        // onRowClick={handleRowClick}
                        
                    >
                        <Column
                            field="username"
                            header="Username"
                            // filter
                            filterPlaceholder="Search by Username"
                            style={{ minWidth: '7rem' }}
                        />
                        <Column
                            field="platform"
                            header="Platform"
                            // filter
                            filterPlaceholder="Search by Platform"
                            style={{ minWidth: '4rem'}}
                            body={platformTemplate}
                        />
                        <Column
                            field="followers"
                            header="Followers"
                            // filter
                            style={{ minWidth: '4rem'}}
                        />
                        <Column
                            field="engagement"
                            header="Engagement"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="views"
                            header="Views"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="likes"
                            header="Likes"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <Column
                            field="location"
                            header="Audience Location"
                            // filter
                            style={{ minWidth: '4rem' }}
                        />
                        <column 
                            field="action"
                            header=""
                            style={{ minWidth: '4rem' }}
                            body={actionTemplate}
                        />
                    </DataTable>
                        </div> }
                        {/* } */}
                    {/* {(activeIndex === 1 && showSteps) &&<div className="campaign-main-contract">
                            <CampaignHeader showButton={false} isFileUpload={false} />
                            <DataTable
                                value={contracts}
                                paginator
                                showGridlines
                                rows={15}
                                loading={contractLoading}
                                dataKey="id"
                                filters={contractFilters}
                                globalFilterFields={['username', 'platform', 'followers', 'engagement', 'views', 'likes', 'location']}
                                // header="Customer Table"
                                // header={header}
                                emptyMessage="No ongoing contracts found"
                                onFilter={(e) => setFilters(e.filters)}
                                onRowClick={handleContractTableRowClick}
                            >
                                <Column
                                    field="contract_id"
                                    header="Contract ID"
                                    // filter
                                    style={{ minWidth: '4rem'}}
                                />
                                <Column
                                    field="contract_version"
                                    header="Contract Version"
                                    // filter
                                    style={{ minWidth: '4rem'}}
                                />
                                <Column
                                    field="business"
                                    header="Business"
                                    // filter
                                    filterPlaceholder="Search by Business"
                                    style={{ minWidth: '7rem' }}
                                />
                                <Column
                                    field="influencer"
                                    header="Influencer"
                                    // filter
                                    filterPlaceholder="Search by Influencer"
                                    style={{ minWidth: '4rem'}}
                                    // body={platformTemplate}
                                />
                                <Column
                                    field="business_status"
                                    header="Business Status"
                                    // filter
                                    style={{ minWidth: '4rem' }}
                                />
                                <Column
                                    field="influencer_status"
                                    header="Influencer Status"
                                    // filter
                                    style={{ minWidth: '4rem' }}
                                />
                            </DataTable>
                        </div>} */}
                    {(activeIndex === 0 && showSteps) &&<div className="campaign-main-content-file">
                            <CampaignHeader showButton={true} buttonLink="" buttonText="Upload" isFileUpload={true} campaignId={campaign_id} campaignName={campaignDetails?.campaign}/>
                            <div className="post-preparation">
                                <div className="files-container files-container-width-70">         
                                    {files.map((file) => {
                                        return (
                                            <div className="file" onClick={() => {
                                                getScheduledDetail(file.campaign, file.id);
                                                setSelectedFile({
                                                    file_name: file.file_name, 
                                                    file_url: file.file_url,
                                                    file_id: file.id, 
                                                    campaign_id: file.campaign, 
                                                    file_size: file.file_size
                                                })
                                            }}>
                                                <video src={file.file_url}></video>
                                                <div className="file-actions">
                                                    <div class="file-name">
                                                        <p>{file.file_name}</p>
                                                    </div>
                                                    <div class="file-buttons">
                                                        {/* <button onClick={() => {
                                                            getScheduledDetail(file.campaign, file.id);
                                                            setSelectedFile({
                                                                file_name: file.file_name, 
                                                                file_url: file.file_url,
                                                                file_id: file.id, 
                                                                campaign_id: file.campaign, 
                                                                file_size: file.file_size
                                                            })
                                                        }}>Select</button> */}
                                                        <i class="pi pi-trash"></i>  
                                                    </div>                                            
                                                </div>
                                                {/* <div className="caption-container">
                                                    <label for="caption">Caption</label>
                                                    <input type="text" id="caption" name="caption" />
                                                </div> */}
                                            </div>
                                        );
                                    })}
                                    
                                </div>                          
                                <div className="post-info">
                                    <div className="video-container">
                                        <video src={selectedFile?.file_url} controls></video>
                                    </div>
                                    <div className="post-detail-container">
                                        <div className="caption-container">
                                            <label>Caption</label>
                                            {/* <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} /> */}
                                            <textarea value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                                        </div>
                                        <div className="schedule-container">
                                            <label>Post Date</label>
                                            <input type="datetime-local" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)}/>
                                        </div>
                                        <div className="action-container">
                                            {scheduleRequestBtnState?.state == null ? 
                                                <button onClick={scheduleRequestHandler}>Schedule Request</button>
                                            : null}
                                            {scheduleRequestBtnState?.state == "pending" ? 
                                                <button disabled>Pending</button>
                                            : null}

                                            {scheduleRequestBtnState?.state == "request" ? 
                                                <button onClick={() => acceptScheduleRequestHandler(scheduleRequestBtnState?.scheduled_post_id)}>Accept Request</button>
                                            : null}

                                            {scheduleRequestBtnState?.state == "accepted" ? 
                                                <button onClick={() => removeScheduledHandler(scheduleRequestBtnState?.scheduled_post_id)}>Remove</button>
                                            : null}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>}
                    {(activeIndex === 1 && showSteps) &&<div className="campaign-main-payment">
                            <CampaignHeader showButton={false} buttonText="" isFileUpload={false} campaignName={campaignDetails?.campaign}/>   
                            {/* <div className="payment-container-container"> */}
                                <div className="payment-container">
                                    <div className="secure-badge">✔ Secure Payment via PayPal Escrow</div>
                                    <div className="payment-header">Complete Your Payment</div>
                                    <div className="campaign-details">
                                        <div className="labels">
                                            <span>Campaign</span>
                                            <span>Influencer</span>
                                            <span>Post Type</span>
                                            <span>Duration</span>
                                            <span>Payment Handling</span>
                                        </div>
                                        <div className="values">
                                            <span>{campaignDetails?.campaign}</span>
                                            <span>{campaignDetails?.influencer}</span>
                                            <span>{campaignDetails?.service} Post x {campaignDetails?.num_posts} Posts</span>
                                            <span>{campaignDetails.amount} Days</span>
                                            <span>Funds are securely processed and held by PayPal as a third-party escrow service.</span>                                            
                                        </div>

                                        {/* <strong>Campaign:</strong> Fitness Campaign <br>
                                        <strong>Influencer:</strong> [Influencer Name] <br>
                                        <strong>Post Type:</strong> TikTok Feed Post <br>
                                        <strong>Duration:</strong> 7 Days <br>
                                        <strong>Payment Handling:</strong> Funds are securely processed and held by PayPal as a third-party escrow service. <br> */}
                                    </div>
                                    <div className="total"></div>
                                    <div className="paypal-integration">
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${totalPrice}`,
                                                                }
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then((details) => {
                                                        const url = baseUrl + `api/campaign/scheduled/paid?campaign_id=${campaign_id}&account_id=${selectedInfluencerAccount}`;
                                                        fetch(url, {
                                                            method: "GET",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                Authorization: "Bearer " + localStorage.getItem("access"),
                                                            }
                                                        })
                                                        .then((response) => {
                                                            if (!response.ok)
                                                                throw new Error("Payment Failed");
                                                        })
                                                        .catch((error) => {});
                                                    })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        console.log("Payment update response:", data);
                                                    })
                                                    .catch(error => console.error("Error updating payment:", error));
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                    <div className="payment-system-trust">
                                        Payments are securely handled via PayPal's escrow system. Funds are only released once the influencer successfully keeps the post live for the agreed duration.
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>}
                    {(activeIndex === 2 && showSteps) &&<div className="campaign-main-analytics">
                            <CampaignHeader showButton={false} campaignName={campaignDetails?.campaign}/>
                            <div className="campaign-analytics-container">
                                <div className="engagement-metrics">
                                    <div className="header">
                                        <h2>Engagement Metrics</h2>
                                    </div>
                                    <div className="content">
                                        <div className="chart-container">
                                            <div className="chart impressions">
                                                <div className="chart-title">
                                                    <p>Impressions</p>
                                                    <div className="total impressions">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.impression_organic_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart reach">
                                                <div className="chart-title">
                                                    <p>Reach</p>
                                                    <div className="total reach">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.reach_organic_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart likes">
                                                <div className="chart-title">
                                                    <p>Likes</p>
                                                    <div className="total likes">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.like_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart views">
                                                <div className="chart-title">
                                                    <p>Views</p>
                                                    <div className="total views">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.view_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart shares">
                                                <div className="chart-title">
                                                    <p>Shares</p>
                                                    <div className="total shares">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.share_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart comments">
                                                <div className="chart-title">
                                                    <p>Comments</p>
                                                    <div className="total comments">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.comment_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart paid-impressions">
                                                <div className="chart-title">
                                                    <p>Paid Impressions</p>
                                                    <div className="total paid-impressions">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.impression_paid_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            <div className="chart comments">
                                                <div className="chart-title">
                                                    <p>Paid Reach</p>
                                                    <div className="total comments">
                                                        <span>100k</span>
                                                    </div>
                                                </div>
                                                <div className="chart-chart">
                                                    <InfluencerChart data={campaignAnalytics?.reach_paid_count} labels={campaignAnalytics?.timestamp}/>
                                                </div>
                                            </div>
                                            
                                        </div>
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
                            </div>
                        </div>}
                    {(activeIndex === 3 && showSteps) &&<div className="campaign-main-retargeting">
                            <CampaignHeader showButton={false} campaignName={campaignDetails?.campaign}/>
                        </div>}
                </div>
            </div>
        </>
    );
}