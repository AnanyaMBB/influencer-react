import "./App.css";
import Core from "./components/Core";
import NotFound from "./components/NotFound";
import Discovery from "./pages/Discovery";
import Login from "./pages/Login";
import BusinessRegister from "./pages/BusinessRegister";
import InfluencerRegister from "./pages/InfluencerRegister";
import InfluencerAccountManagement from "./pages/InfluencerAccountManagement";
import InfluencerProfile from "./pages/InfluencerProfile";
import Contract from "./pages/Contract";
import Chat from "./pages/Chat";
import CampaignManagement from "./pages/CampaignManagement";
import Requests from "./pages/Requests";
import Earnings from "./pages/Earnings";
import Research from "./pages/Research";
import BusinessLanding from "./pages/BusinessLanding";
import Wallet from "./pages/Wallet";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { baseUrl } from "./shared";
import InstagramAuthCallBack from "./components/InstagramAuthCallBack";

export const LoginContext = createContext();
export const LONG_ACCESS_TOKEN = createContext();

function App() {
    useEffect(() => {
        function refreshTokens() {
            if (localStorage.refresh) {
                const url = baseUrl + "api/token/refresh";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: localStorage.refresh,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        localStorage.setItem("access", data.access);
                        localStorage.setItem("refresh", data.refresh);
                        setLoggedIn(true);
                    });
            }
        }
        const minuites = 1000 * 60;
        refreshTokens();
        setInterval(refreshTokens, 3 * minuites);
    }, []);

    const [loggedIn, setLoggedIn] = useState(
        localStorage.access ? true : false
    );

    function changeLoggedIn(value) {
        setLoggedIn(value);
        if (value == false) {
            localStorage.clear();
        }
    }

    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/bregister" element={<BusinessRegister />} />
                    <Route path="/iregister" element={<InfluencerRegister />} />
                    <Route path="/landing" element={<BusinessLanding />} />
                    <Route element={<Core title="Discovery" />}>
                        <Route path="/discovery" element={<Discovery />} />
                    </Route>
                    <Route element={<Core title="Account Management" />}>
                        <Route
                            path="/account"
                            element={<InfluencerAccountManagement />}
                        />
                    </Route>
                    <Route element={<Core title="Profile" />}>
                        <Route
                            path="/profile"
                            element={<InfluencerProfile />}
                        />
                    </Route>
                    <Route element={<Core title="Profile" />}>
                        <Route
                            path="/profile/:account_type/:account_id"
                            element={<InfluencerProfile />}
                        />
                    </Route>
                    <Route element={<Core title="Contract" />}>
                        <Route path="/contract" element={<Contract />} />
                    </Route>

                    <Route element={<Core title="Contract" />}>
                        <Route path="/contract/:contract_id/:version_id" element={<Contract />} />
                    </Route>

                    <Route element={<Core title="Chat" />}>
                        <Route path="/chat" element={<Chat />} />
                    </Route>

                    <Route element={<Core title="Campaign Management" />}>
                        <Route path="/campaigns" element={<CampaignManagement />} />
                    </Route>

                    <Route element={<Core title="Requests" />}>
                        <Route path="/requests" element={<Requests />} />
                    </Route>

                    <Route element={<Core title="Earnings" />}>
                        <Route path="/earnings" element={<Earnings />} />   
                    </Route>

                    <Route element={<Core title="Wallet" />}>
                        <Route path="/wallet" element={<Wallet />} />   
                    </Route>

                    <Route element={<Core title="Research" />}>
                        <Route path="/research" element={<Research />} />   
                    </Route>

                    <Route
                        path="/authenticate/instagram"
                        element={<InstagramAuthCallBack />}
                    />

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
