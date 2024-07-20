import "./AddService.css";
import { useState } from "react";
import { baseUrl } from "../shared";

export default function AddService(props) {
    const [closed, setClosed] = useState(true);
    const [serviceName, setServiceName] = useState();
    const [serviceType, setServiceType] = useState("feed");
    const [postType, setPostType] = useState("Image");
    const [postLength, setPostLength] = useState();
    const [hourlyPrice, setHourlyPrice] = useState();
    const [viewPrice, setViewPrice] = useState();
    const [contentProvider, setContentProvider] = useState("influencer");

    // function CreateService(e) {
    //     e.preventDefault();
    //     let url = "";
    //     if (props.page == "ugc") url = baseUrl + "api/instagram/ugc/add";
    //     else if (props.page == "feed-post")
    //         url = baseUrl + "api/instagram/feed/add";
    //     else if (props.page == "reel-post")
    //         url = baseUrl + "api/instagram/reel/add";
    //     else if (props.page == "story-post")
    //         url = baseUrl + "api/instagram/story/add";
    //     else if (props.page == "other-post")
    //         url = baseUrl + "api/instagram/other/add";

    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("access"),
    //         },
    //         body: JSON.stringify({
    //             instagram_id: localStorage.getItem("instagram_id"),
    //             service_name: serviceName,
    //             post_type: serviceType,
    //             post_length: postLength,
    //             hourly_price: hourlyPrice,
    //             view_price: viewPrice,
    //         }),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Error in adding service");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    function addInstagramService(e) {
        e.preventDefault();
        const url = baseUrl + "api/instagram/service/add";
        fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }, 
            body: JSON.stringify({
                instagram_id: localStorage.getItem("instagram_id"),
                service_name: serviceName,
                service_type: serviceType,
                post_type: postType,
                post_length: postLength,
                content_provider: contentProvider,
                pricing: [
                    {pricing_type: "hourly", price: hourlyPrice},
                    {pricing_type: "view", price: viewPrice}
                ],
            })
        })
        .then((response) => {
            if (!response.ok) 
                throw new Error("Error in adding service");
            setClosed(true);
        })
        .then()
        .catch((error) => {
            console.error("Error: ", error);
        });
    }

    return (
        <>
            {/* <div className="overlay-trigger"></div> */}
            <button
                className="overlay-trigger"
                onClick={() => {
                    setClosed(!closed);
                }}
            >
                Add Service
            </button>
            <div
                className={
                    closed == false
                        ? "new-service-form"
                        : "new-service-form display-none-property"
                }
            >
                <div className="header">
                    <div className="title">
                        <p>Add Service</p>
                    </div>
                    <div
                        className="close"
                        onClick={() => {
                            setClosed(true);
                        }}
                    >
                        <span class="material-symbols-outlined">close</span>
                    </div>
                </div>
                <div className="body" onSu>
                    <form id="service-form" onSubmit={addInstagramService}>
                        <div className="form-item">
                            <label for="service-name">Service Name</label>
                            <input
                                id="service-name"
                                type="text"
                                placeholder="Service Name"
                                value={serviceName}
                                onChange={(e) => {
                                    setServiceName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-item">
                            <label for="service-type">Service Type</label>
                            {/* <input
                                id="service-type"
                                type="text"
                                placeholder="Service Type"
                                value={serviceType}
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                }}
                            /> */}
                            <select
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                }}
                            >
                                {/* <option value="ugc">UGC</option> */}
                                <option value="feed">Feed Post</option>
                                <option value="reel">Reel Post</option>
                                <option value="story">Story Post</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <label for="service-type">Post Type</label>
                            <select
                                onChange={(e) => {
                                    setPostType(e.target.value);
                                }}
                            >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        {postType == "video" ? (
                            <div className="form-item">
                                <label for="post-length">Post Length</label>
                                <input
                                    id="post-length"
                                    type="number"
                                    placeholder="Post Length"
                                    value={postLength}
                                    onChange={(e) => {
                                        setPostLength(e.target.value);
                                    }}
                                />
                            </div>
                        ) : null}
                        <div className="form-item">
                            <label for="service-type">Content Provider</label>
                            <select
                                onChange={(e) => {
                                    setContentProvider(e.target.value);
                                }}
                            >
                                <option value="influencer">Influencer</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <label for="price">
                                {/* {props.page == "ugc" ? "Price" : "Price/Hour"} */}
                                Hourly Price
                            </label>
                            <input
                                id="hourly-price"
                                type="number"
                                placeholder="Price"
                                value={hourlyPrice}
                                onChange={(e) => {
                                    setHourlyPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-item">
                            <label for="price">
                                {/* {props.page == "ugc" ? "Price" : "Price/Hour"} */}
                                Per View Price
                            </label>
                            <input
                                id="view-price"
                                type="number"
                                placeholder="Price"
                                value={viewPrice}
                                onChange={(e) => {
                                    setViewPrice(e.target.value);
                                }}
                            />
                        </div>

                        <div className="form-item">
                            <button
                                type="submit"
                                className="submit-service"
                                form="service-form"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
