import './App.css';
import Core from './components/Core';
import NotFound from './components/NotFound';
import Discovery from './pages/Discovery';
import Login from './pages/Login';
import BusinessRegister from './pages/BusinessRegister';
import InfluencerRegister from './pages/InfluencerRegister';
import InfluencerAccountManagement from './pages/InfluencerAccountManagement';
import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { baseUrl } from './shared';

export const LoginContext = createContext();

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
        })
      }
    }    
    const minuites = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, 3 * minuites);
    
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  function changeLoggedIn(value) {
    setLoggedIn(value);
    if(value == false) {
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
          <Route element={<Core title="Discovery"/>}>
            <Route path="/discovery" element={<Discovery />} />
          </Route>
          <Route element={<Core title="Account Management"/>}>
            <Route path="/account" element={<InfluencerAccountManagement />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
