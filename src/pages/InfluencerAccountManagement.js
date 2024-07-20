import "./InfluencerAccountManagement.css";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddService from "../components/AddService";
import { baseUrl } from "../shared";

export default function InfluencerAccountManagement() {
    const [page, setPage] = useState("ugc");
    const [show, setShow] = useState(false);
    const [instagramData, setInstagramData] = useState(null);

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

    useEffect(() => {
        const url = baseUrl + "api/influencer/instagram/get";
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

    // function getServices() {
    //     const ugcUrl = baseUrl + "api/instagram/ugc/get";
    //     const feedPostUrl = baseUrl + "api/instagram/feed/get";
    //     const reelPostUrl = baseUrl + "api/instagram/reel/get";
    //     const storyPostUrl = baseUrl + "api/instagram/story/get";
    //     const otherPostUrl = baseUrl + "api/instagram/other/get";
    //     const urls = [
    //         [ugcUrl, "ugc_services", "ugc"],
    //         [feedPostUrl, "feed_post_services", "feed-post"],
    //         [reelPostUrl, "reel_post_services", "reel-post"],
    //         [storyPostUrl, "story_post_services", "story-post"],
    //         [otherPostUrl, "other_post_services", "other-post"],
    //     ];

    //     urls.forEach((url) => {
    //         fetch(url[0], {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + localStorage.getItem("access"),
    //             },
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error("Network response was not ok");
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 data = data[url[1]];
    //                 // setServicesData({...servicesData, [url[2]]: data});
    //                 setServicesData((prevState) => ({
    //                     ...prevState,
    //                     [url[2]]: data,
    //                 }));
    //             })
    //             .catch((error) => {
    //                 console.error("Error:", error);
    //             });
    //     });
    // }

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

    return (
        <div className="account-container">
            <div className="header">
                <div className="title">
                    <p>Your Connected Accounts</p>
                </div>
                <div className="add-container">
                    <button
                        className="add-button"
                        onClick={linkInstagramAccount}
                    >
                        Add Account
                    </button>
                </div>
            </div>
            <div className="connected-accounts">
                {instagramData
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
                    : null}
            </div>

            <div className="services">
                <div className="navigation">
                    {/* <div
                        className={
                            page == "ugc" ? "ugc selected-navigation" : "ugc"
                        }
                        onClick={() => {
                            setPage("ugc");
                        }}
                    >
                        UGC
                    </div> */}
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
                    {/* <div
                        className={
                            page == "other-post"
                                ? "other-post selected-navigation"
                                : "other-post"
                        }
                        onClick={() => {
                            setPage("other-post");
                        }}
                    >
                        Other Post
                    </div> */}
                </div>
                {page == "ugc" ? (
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
