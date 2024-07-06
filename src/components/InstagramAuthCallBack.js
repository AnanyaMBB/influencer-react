import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from '../shared';
import { LoginContext } from "../App";


export default function InstagramAuthCallBack() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const code = url.get("code");

        const facebook_url = "https://graph.facebook.com/v12.0/oauth/access_token";
        const APP_ID = "953649116498281";
        const REDIRECT_URI = "https://93c301590d5dd7f37ad0e33c7f196edf.loophole.site/authenticate/instagram";
        const CLIENT_SECRET = "ade8f07908a46a420330640d9fd857fd";

        // Get long access token
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
                    .then((accessData) => {
                        localStorage.setItem("long_access_token", accessData.access_token);
                        localStorage.setItem("token_type", accessData.token_type);
                        localStorage.setItem("expires_in", accessData.expires_in);
                        
                        console.log("Access data: ", accessData);
                        // Get instagram user information
                        if(accessData.access_token) {
                            fetch(`https://graph.facebook.com/v12.0/me/accounts?access_token=${accessData.access_token}`)
                            .then((response) => {
                                return response.json();
                            })
                            .then((account_data) => {
                                const page_id = account_data.data[0].id;
                                fetch(`https://graph.facebook.com/v18.0/${page_id}?fields=connected_instagram_account&access_token=${accessData.access_token}`)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    const instagram_account_id = data.connected_instagram_account.id;
                                    fetch(`https://graph.facebook.com/v18.0/${instagram_account_id}?fields=name,username,profile_picture_url,biography,followers_count,follows_count,media_count,website&access_token=${accessData.access_token}`)
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((data) => {
                                        console.log("Instagram user data: ", data);
                                        // Store instagram information into dB 
                                        if (data) {
                                            const url = baseUrl + "api/influencer/instagram";
                                            fetch(url, {
                                                method:"POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    "user": localStorage.username,
                                                    "instagram_id": data.id,
                                                    // "name": data.name,
                                                    // "username": data.username,
                                                    // "profile_picture_url": data.profile_picture_url, 
                                                    // "biography": data.biography,
                                                    // "followers": data.followers_count,
                                                    // "following": data.follows_count,
                                                    // "posts": data.media_count,
                                                    // "website": data.website,
                                                    "long_access_token": accessData.access_token
                                                })
                                            })
                                            .then((response) => {
                                                console.log(response);
                                                if (!response.ok) {
                                                    throw new Error("Error in storing data");
                                                }
                                                
                                                navigate('/account');
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                        }
                                    });
                                });
                            });
                        }
                    });
                } 
            });
        }
    }, []);
    return (
        <div>
            <h1>Authenticating</h1>
        </div>
    );
}