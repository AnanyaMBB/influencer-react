import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl } from '../shared';

export default function TikTokRedirect() {

    const location= useLocation();
    const queryParams = new URLSearchParams(location.search);
    const access_token = queryParams.get('access_token');
    const scope = queryParams.get('scope');

    console.log("access_token", access_token);
    console.log("scope", scope);

    useEffect(() => {
        fetch(baseUrl + 'api/tiktok/account/add',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                },
                body: JSON.stringify({
                    user: localStorage.getItem("username"),
                    tiktok_access_token: access_token, 
                    tiktok_access_scope: scope
                }),
            }
        )
        .then ((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("DATA SAVED");
            if (window.opener) {
                window.opener.postMessage("closePopupAndRefresh", window.location.origin);
            }
        })

    }, []);
    return (
        <></>
    );
}