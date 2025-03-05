import "./InfluencerAccountManagement.css";
import { useState, useEffect, useContext } from "react";
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);


    useEffect(() => {
        const url =
            baseUrl +
            `api/influencer/instagram/get?username=${localStorage.getItem(
                "username"
            )}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Instagram Information: ", data);
                setInstagramData(data.accounts_info);
                console.log("Instagram Data: ", instagramData);
            });
    }, []);

    useEffect(() => {
        const url =
            baseUrl +
            `api/influencer/youtube/get?username=${localStorage.getItem(
                "username"
            )}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setYoutubeData(data.channel_info);
                console.log("YouTube Data: ", youtubeData);
                console.log("YouTube Data: ", data);
            });
    }, []);

    function linkInstagramAccount() {
        const APP_ID = "953649116498281";
        const REDIRECT_URI =
            "https://93c301590d5dd7f37ad0e33c7f196edf.loophole.site/authenticate/instagram";
        const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=instagram_basic,instagram_manage_insights,ads_management,ads_read,business_management,pages_read_engagement,pages_show_list,read_insights,email`;

        window.location.href = url;
        // navigate(url);
        // fetch(url)
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //     }
        //     return response.json();
        // })
        // .catch((error) => {
        //     console.error("Error:", error);
        // });
    }

    useEffect(() => {
        const url = baseUrl + 'api/tiktok/account/get?username=' + localStorage.getItem("username");
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setTiktokData(data.tiktok_accounts);
            console.log("Tiktok Accounts", data.tiktok_accounts);
        })
    }, []);

    function getInstagramServices() {
        const url =
            baseUrl +
            `api/instagram/service/get?instagram_id=${localStorage.getItem(
                "instagram_id"
            )}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Services data: ", data);
                setServices(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function getYoutubeServices() {
        const url =
            baseUrl +
            `api/youtube/service/get?channel_id=${localStorage.getItem(
                "channel_id"
            )}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Services data: ", data);
                setServices(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        flow: "auth-code", // Request an authorization code
        onSuccess: (codeResponse) => {
            console.log("Code Response:", codeResponse);
            // Send the authorization code to the backend
            axios
                .post("http://localhost:8000/api/youtube-analytics", {
                    auth_code: codeResponse.code,
                    username: localStorage.getItem("username"),
                })
                .then((res) => {
                    console.log("YouTube Analytics Data: ", res.data);
                })
                .catch((err) => console.log(err));
        },
        onFailure: (error) => console.log("Login Failed", error),
        scope: "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
        access_type: "offline",
        prompt: "consent",
    });


    function linkTiktokAccount() {
        const link = `https://tikapi.io/account/authorize?client_id=${process.env.REACT_APP_TIKAPI_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TIKAPI_REDIRECT_URI}&scope=view_profile+view_followers+view_notifications+view_analytics+view_collections+view_messages+view_coins+edit_profile+send_messages+conversation_requests+media_actions+follow_actions+live+explore`
        const popup = window.open(link, "Login", "width=400,height=600,scrollbars=no,resizable=no");


        window.addEventListener("message", (event) => {
            // if (event.origin !== new URL(process.env.REACT_APP_TIKAPI_REDIRECT_URI).origin) {
            //     return; // Ignore messages from unknown origins
            // }
    
            if (event.data === "closePopupAndRefresh") {
                // alert("here");
                popup.close();
                window.location.reload(); // Refresh the parent page
            }
        });
    }

    

    return (
        <div className="account-container">
            <div className="header">
                <div className="title">
                    <p>Your Connected Accounts</p>
                </div>
                <div className="add-container">
                    <button className="tiktok-add-button" onClick={linkTiktokAccount}>
                        <img src={tiktokLogo} />
                        <span>Add TikTok</span>
                    </button>
                    {/* <button className="youtube-add-button" onClick={login}>
                        <img src={youtubeLogo} />
                        <span>Add Youtube</span>
                    </button>
                    <button
                        className="instagram-add-button"
                        onClick={linkInstagramAccount}
                        disabled
                    >
                        <img src={instagramLogo} />
                        <span>Add Instagram</span>
                    </button> */}
                </div>
            </div>
            <div className="connected-accounts">
                {tiktokData ? tiktokData.map((tiktokAccount) => {
                    return (
                        <>
                            <div
                                className="account"
                                // onClick={() => {
                                //     localStorage.setItem(
                                //         "instagram_id",
                                //         account.instagram_id
                                //     );
                                //     getInstagramServices();
                                // }}
                            >
                                <div className="icon">
                                    <img
                                        src={tiktokAccount.information.tiktok_avatar}
                                        alt="profile"
                                    />
                                </div>
                                <div className="text">
                                    <div className="username">
                                        <p>{tiktokAccount.information.tiktok_unique_id}</p>
                                    </div>
                                    <div className="followers">
                                        <p>{tiktokAccount.information.tiktok_follower_count}</p>
                                    </div>
                                    {/* <div className="instagram-id">
                                        {account.instagram_id}
                                    </div> */}
                                </div>
                            </div>
                        </>
                    );
                }) : null}
                
                {/* {instagramData
                    ? instagramData.map((account) => {
                          return (
                              <>
                                  <div
                                      className="account"
                                      onClick={() => {
                                          localStorage.setItem(
                                              "instagram_id",
                                              account.instagram_id
                                          );
                                          //   getServices();
                                          getInstagramServices();
                                      }}
                                  >
                                      <div className="icon">
                                          <img
                                              src={account.profile_picture_url}
                                              alt="profile"
                                          />
                                      </div>
                                      <div className="text">
                                          <div className="username">
                                              <p>{account.username}</p>
                                          </div>
                                          <div className="followers">
                                              <p>{account.followers}</p>
                                          </div>
                                          <div className="instagram-id">
                                              {account.instagram_id}
                                          </div>
                                      </div>
                                  </div>
                              </>
                          );
                      })
                    : null} */}

                {/* {youtubeData
                    ? youtubeData.map((account) => {
                          return (
                              <>
                                  <div
                                      className="account"
                                      onClick={() => {
                                          localStorage.setItem(
                                              "channel_id",
                                              account.channel_id
                                          );
                                          getYoutubeServices();
                                      }}
                                  >
                                      <div className="icon">
                                          <img
                                              src={account.thumbnail_url}
                                              alt="profile"
                                          />
                                      </div>
                                      <div className="text">
                                          <div className="username">
                                              <p>{account.title}</p>
                                          </div>
                                          <div className="followers">
                                              <p>{account.subscriber_count}</p>
                                          </div>
                                      </div>
                                  </div>
                              </>
                          );
                      })
                    : null} */}
            </div>

            <div className="services">
                {/* <div className="navigation">
                    <div
                        className={
                            page == "feed-post"
                                ? "feed-post selected-navigation"
                                : "feed-post"
                        }
                        onClick={() => {
                            setPage("feed-post");
                        }}
                    >
                        Feed Post
                    </div>
                    <div
                        className={
                            page == "reel-post"
                                ? "reel-post selected-navigation"
                                : "reel-post"
                        }
                        onClick={() => {
                            setPage("reel-post");
                        }}
                    >
                        Reel Post
                    </div>
                    <div
                        className={
                            page == "story-post"
                                ? "story-post selected-navigation"
                                : "story-post"
                        }
                        onClick={() => {
                            setPage("story-post");
                        }}
                    >
                        Story Post
                    </div>
                </div> */}

                <div className="navigation">
                    <div
                        className={
                            page == "FULL"
                                ? "full selected-navigation"
                                : "full"
                        }
                        onClick={() => {
                            setPage("FULL");
                        }}
                    >
                        FULL VIDEO
                    </div>
                    <div
                        className={
                            page == "SHORTS"
                                ? "shorts selected-navigation"
                                : "shorts"
                        }
                        onClick={() => {
                            setPage("SHORTS");
                        }}
                    >
                        SHORTS VIDEO
                    </div>
                </div>
                {page == "FULL" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                {/* <AddService page={page} /> */}
                                <AddService />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-righ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Content Provider
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hourly Pricing
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View Pricing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type == "FULL"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
                {page == "SHORTS" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                {/* <AddService page={page} /> */}
                                <AddYoutubeService />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-righ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Content Provider
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hourly Pricing
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View Pricing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type == "SHORTS"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
                {page == "ugc" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                {/* <AddService page={page} /> */}
                                <AddYoutubeService />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-left rtl:text-right">
                                <thead class="text-xs uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Description
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / Post
                                        </th>
                                        <th scope="col" class="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicesData && servicesData["ugc"]
                                        ? servicesData["ugc"].map((service) => {
                                              return (
                                                  <>
                                                      <tr class="bg-white border-b">
                                                          <td class="px-6 py-4">
                                                              {
                                                                  service.service_name
                                                              }
                                                          </td>
                                                          <td class="px-6 py-4">
                                                              {
                                                                  service.service_description
                                                              }
                                                          </td>
                                                          <td class="px-6 py-4">
                                                              {
                                                                  service.post_type
                                                              }
                                                          </td>
                                                          <td class="px-6 py-4">
                                                              {
                                                                  service.post_length
                                                              }
                                                          </td>
                                                          <td class="px-6 py-4">
                                                              {service.price}
                                                          </td>
                                                          <td class="px-6 py-4"></td>
                                                      </tr>
                                                  </>
                                              );
                                          })
                                        : null}

                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type == "ugc"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "feed-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService page={page} />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-righ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Content Provider
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hourly Pricing
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View Pricing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type == "feed"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "reel-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService page={page} />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Content Provider
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hourly Pricing
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View Pricing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type == "reel"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "story-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService page={page} />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Service Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Content Provider
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hourly Pricing
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View Pricing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        ? services.map((service) => {
                                              if (
                                                  service.service_type ==
                                                  "story"
                                              ) {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.content_provider
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[0]
                                                                          .price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service
                                                                          .pricing[1]
                                                                          .price
                                                                  }
                                                              </td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {page == "other-post" ? (
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <p>Services</p>
                            </div>
                            <div className="add-service">
                                <AddService page={page} />
                                {/* <button className="add-service-button">
                                    Add Service
                                </button> */}
                            </div>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Service Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Post Length
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price / hour
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicesData && servicesData["other-post"]
                                        ? servicesData["other-post"].map(
                                              (service) => {
                                                  return (
                                                      <>
                                                          <tr class="bg-white border-b">
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_name
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.service_description
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_type
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_length
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4">
                                                                  {
                                                                      service.post_price
                                                                  }
                                                              </td>
                                                              <td class="px-6 py-4"></td>
                                                          </tr>
                                                      </>
                                                  );
                                              }
                                          )
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* <div className="services">
                <div className="services-title">
                    <p>Feed</p>
                </div>
                <div className="services-container">
                    <div className="service">
                        <div className="service-title-delete">
                            <div className="service-title">
                                <p>Title</p>
                            </div>
                            <div className="delete-button">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        </div>
                        <div className="service-description">
                            <p>dfkfkj d jkdjdkf jkd kjd jkdfj kdjk fjdkf jdfk  jdfkdj kf</p>
                        </div>
                        <div className="service-price">
                            <p>24$/hr</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
