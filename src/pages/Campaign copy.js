import "./Campaign.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Steps } from "primereact/steps";
import { InputText } from "primereact/inputtext";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import CampaignHeader from "../components/CampaignHeader";

export default function Campaign() {
    const { campaign_id } = useParams();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const steps = [
        // { label: 'Edit Campaign', command: () => console.log('Step 1 Selected') },
        { label: 'Add Influencer', command: () => console.log('Step 2 Selected') },
        { label: 'Contract', command: () => console.log('Step 3 Selected') },
        { label: 'Content File', command: () => console.log('Step 4 Selected') },
        { label: 'Payment', command: () => console.log('Step 4 Selected') },
        { label: 'Analytics', command: () => console.log('Step 4 Selected') },
        { label: 'Retargeting', command: () => console.log('Step 4 Selected') },
    ];


    const influencers = [
        { id: 1, username: "James Butt", platform: "Instagram", followers: 12000, engagement: "4.5%", views: 1500, likes: 340, location: "Algeria"},
        { id: 2, username: "Josephine Darakjy", platform: "YouTube", followers: 54000, engagement: "8.2%", views: 8400, likes: 1200, location: "Egypt" },
        { id: 3, username: "Art Venere", platform: "TikTok", followers: 30000, engagement: "7.0%", views: 3200, likes: 800, location: "Panama" },
        { id: 4, username: "Lenna Paprocki", platform: "Instagram", followers: 45000, engagement: "5.1%", views: 5000, likes: 1500, location: "Slovenia" },
        { id: 5, username: "Donette Foller", platform: "Facebook", followers: 20000, engagement: "3.3%", views: 2800, likes: 400, location: "South Africa" },
        { id: 6, username: "Simona Morasca", platform: "YouTube", followers: 34000, engagement: "6.4%", views: 6700, likes: 900, location: "Egypt" },
        { id: 7, username: "Mitsue Tollner", platform: "TikTok", followers: 15000, engagement: "5.0%", views: 1900, likes: 600, location: "Paraguay" },
        { id: 8, username: "Leota Dilliard", platform: "Instagram", followers: 60000, engagement: "10.2%", views: 10200, likes: 2100, location: "Serbia" },
        { id: 9, username: "Sage Wieser", platform: "Facebook", followers: 25000, engagement: "4.2%", views: 3200, likes: 500, location: "South Africa" },
        { id: 10, username: "Kris Marrier", platform: "YouTube", followers: 40000, engagement: "7.5%", views: 7800, likes: 1100, location: "Egypt" },
        { id: 11, username: "Minna Amigon", platform: "TikTok", followers: 18000, engagement: "4.8%", views: 2200, likes: 700, location: "Panama" },
        { id: 12, username: "Abel Maclead", platform: "Instagram", followers: 50000, engagement: "6.3%", views: 6000, likes: 1800, location: "Slovenia" },
        { id: 13, username: "Kiley Caldarera", platform: "Facebook", followers: 22000, engagement: "3.8%", views: 2600, likes: 300, location: "South Africa" },
        { id: 14, username: "Graciela Ruta", platform: "YouTube", followers: 37000, engagement: "6.8%", views: 7200, likes: 1000, location: "Egypt" },
        { id: 15, username: "Cammy Albares", platform: "TikTok", followers: 16000, engagement: "4.5%", views: 1800, likes: 500, location: "Panama" },
        { id: 16, username: "Mattie Poquette", platform: "Instagram", followers: 55000, engagement: "8.5%", views: 9500, likes: 2000, location  : "Serbia" },
        { id: 17, username: "Meaghan Garufi", platform: "Facebook", followers: 23000, engagement: "4.0%", views: 3000, likes: 400, location: "South Africa" },
        { id: 18, username: "Gladys Rim", platform: "YouTube", followers: 38000, engagement: "7.0%", views: 7400, likes: 900, location: "Egypt" },
        { id: 19, username: "Yuki Whobrey", platform: "TikTok", followers: 17000, engagement: "4.2%", views: 2000, likes: 600, location: "Panama" },
        { id: 20, username: "Fletcher Flosi", platform: "Instagram", followers: 65000, engagement: "9.2%", views: 11200, likes: 2300, location: "Serbia" },
        { id: 21, username: "Bette Nicka", platform: "Facebook", followers: 24000, engagement: "4.1%", views: 3200, likes: 500, location: "South Africa" },
        { id: 22, username: "Veronika Inouye", platform: "YouTube", followers: 39000, engagement: "7.2%", views: 7600, likes: 1000, location: "Egypt" },
        { id: 23, username: "Willard Kolmetz", platform: "TikTok", followers: 19000, engagement: "4.5%", views: 2100, likes: 700, location: "Panama" },
        { id: 24, username: "Maryann Royster", platform: "Instagram", followers: 60000, engagement: "9.5%", views: 10200, likes: 2200, location: "Serbia" },
        { id: 25, username: "Alisha Slusarski", platform: "Facebook", followers: 26000, engagement: "4.3%", views: 3400, likes: 600, location: "South Africa" },
        { id: 26, username: "Allene Iturbide", platform: "YouTube", followers: 40000, engagement: "7.5%", views: 7800, likes: 1100, location: "Egypt" },
        { id: 27, username: "Chanel Caudy", platform: "TikTok", followers: 18000, engagement: "4.8%", views: 2200, likes: 700, location: "Panama" },
        { id: 28, username: "Ezekiel Chui", platform: "Instagram", followers: 50000, engagement: "6.3%", views: 6000, likes: 1800, location: "Slovenia" },
        { id: 29, username: "Willow Kusko", platform: "Facebook", followers: 22000, engagement: "3.8%", views: 2600, likes: 300, location: "South Africa" },

    ];
    
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        platform: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        followers: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    
    const [loading, setLoading] = useState(false); // Loading state



    const contracts = [
    ];
    
    const [contractFilters, setContractFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        platform: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        followers: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    
    const [contractLoading, setContractLoading] = useState(false); // Loading state


    // Files Table 
    const files = [];
    const [fileFilters, setFileFIlters] = useState();
    const [fileLoading, setFileLoading] = useState(false);

    const [visible, setVisible] = useState(false);

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
    

    

    function handleRowClick(e) {
        // console.log("ROW clicked", e);
        navigate(`/profile/${e.data.platform.toLowerCase()}/${e.data.id}`);

    }

    function addInfluencerButtonClickHandler (event) {
        navigate("/discovery");
    }

    return (
        <>
            <div className="campaign-container">
            {/* <Splitter style={{ height: '95vh' }}>
                <SplitterPanel className="flex align-items-center justify-content-center" size={25}>Panel 1</SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={75}>Panel 2</SplitterPanel>
            </Splitter> */}
                <div className="campaign-sidebar">
                    <Steps
                        model={steps}
                        activeIndex={activeIndex}
                        onSelect={(e) => setActiveIndex(e.index)}
                        readOnly={false}
                    />
                </div>
                <div className="campaign-main">
                    {/* {(activeIndex === 0) &&<div className="campaign-main-edit-campaign">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Username" />
                        </div>
                        </div>} */}
                    {/* <div className="campaign-main-header">
                        <div className="left">
                            <h2>Fitness Campaign</h2>
                            <i class="pi pi-pencil"></i>
                        </div>
                        <div className="right">
                            <button
                                onClick={addInfluencerButtonClickHandler}
                            >
                                <i className="pi pi-plus"></i>
                                <span>Add Influencer</span>
                            </button>
                        </div>                       
                    </div> */}
                    {(activeIndex === 0) &&<div className="campaign-main-add-influencer">
                        {/* <div className="campaign-main-header">
                            <div className="left">
                                <h2>Fitness Campaign</h2>
                                <i class="pi pi-pencil"></i>
                            </div>
                            <div className="right">
                                <button
                                    onClick={addInfluencerButtonClickHandler}
                                >
                                    <i className="pi pi-plus"></i>
                                    <span>Add Influencer</span>
                                </button>
                            </div>                       
                        </div> */}

                        <CampaignHeader showButton={true} buttonLink="/discovery"/>
                        <DataTable
                        value={influencers}
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
                        </div>}
                    {(activeIndex === 1) &&<div className="campaign-main-contract">
                            <CampaignHeader showButton={false}/>
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
                                onRowClick={handleRowClick}
                            >
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
                                    body={platformTemplate}
                                />
                                <Column
                                    field="contract"
                                    header="Contract"
                                    // filter
                                    style={{ minWidth: '4rem'}}
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
                        </div>}
                    {(activeIndex === 2) &&<div className="campaign-main-content-file">
                            <CampaignHeader showButton={false} />
                            <DataTable
                                value={files}
                                paginator
                                showGridlines
                                rows={15}
                                loading={fileLoading}
                                dataKey="id"
                                filters={fileFilters}
                                globalFilterFields={['username', 'platform', 'followers', 'engagement', 'views', 'likes', 'location']}
                                // header="Customer Table"
                                // header={header}
                                emptyMessage="No ongoing contracts found"
                                onFilter={(e) => setFilters(e.filters)}
                                onRowClick={handleRowClick}
                            >
                                <Column
                                    field="influencer"
                                    header="Influencer"
                                    // filter
                                    filterPlaceholder="Search by Influencer"
                                    style={{ minWidth: '7rem' }}
                                />
                                <Column
                                    field="influencer"
                                    header="Influencer"
                                    // filter
                                    filterPlaceholder="Search by Influencer"
                                    style={{ minWidth: '4rem'}}
                                    body={platformTemplate}
                                />
                                <Column
                                    field="contract"
                                    header="Contract"
                                    // filter
                                    style={{ minWidth: '4rem'}}
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
                            
                        </div>}
                    {(activeIndex === 3) &&<div className="campaign-main-payment">
                            <CampaignHeader showButton={false} />   
                            <div className="card flex justify-content-center">
                                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                                    <h2>Sidebar</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </Sidebar>
                                <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
                            </div>
                        </div>}
                    {(activeIndex === 4) &&<div className="campaign-main-analytics">
                            <CampaignHeader showButton={false} />
                        </div>}
                    {(activeIndex === 5) &&<div className="campaign-main-retargeting">
                            <CampaignHeader showButton={false} />
                        </div>}
                </div>
            </div>
        </>
    );
}