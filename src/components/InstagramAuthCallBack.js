import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function InstagramAuthCallBack() {
    const location = useLocation();
    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const code = url.get("code");

        const facebook_url = "https://graph.facebook.com/v12.0/oauth/access_token";
        const APP_ID = "953649116498281";
        const REDIRECT_URI = "https://361e3dbcf910367999535abb1896389c.loophole.site/authenticate/instagram";
        const CLIENT_SECRET = "ade8f07908a46a420330640d9fd857fd";

        if (code) {
            const params = new URLSearchParams({
                "client_id": APP_ID, 
                "redirect_uri": REDIRECT_URI,
                "client_secret": CLIENT_SECRET,
                "code": code,
            });
            fetch(`https://graph.facebook.com/v12.0/oauth/access_token?${params.toString()}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.access_token) {
                    fetch(`https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${CLIENT_SECRET}&fb_exchange_token=${data.access_token}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                    });
                } 
            });
        }
    }, []);
    return (
        <div>
            <h1>Instagram Auth CallBack</h1>
        </div>
    );
}