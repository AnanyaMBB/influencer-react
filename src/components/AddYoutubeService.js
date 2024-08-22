import "./AddService.css";
import { useState } from "react";
import { baseUrl } from "../shared";

export default function AddService(props) {
    const [closed, setClosed] = useState(true);
    const [serviceName, setServiceName] = useState();
    const [serviceType, setServiceType] = useState("feed");
    const [postType, setPostType] = useState("VIDEO");
    const [postLength, setPostLength] = useState();
    const [fixedPrice, setFixedPrice] = useState();
    const [hourlyPrice, setHourlyPrice] = useState();
    const [viewPrice, setViewPrice] = useState();
    const [contentProvider, setContentProvider] = useState("influencer");


    function addYoutubeService(e) {
        e.preventDefault();
        const url = baseUrl + "api/youtube/service/add";
        fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }, 
            body: JSON.stringify({
                channel_id: localStorage.getItem("channel_id"),
                service_name: serviceName,
                service_type: serviceType,
                post_type: postType,
                post_length: postLength,
                content_provider: contentProvider,
                pricing: [
                    {pricing_type: "fixed", price: fixedPrice},
                    {pricing_type: "hourly", price: hourlyPrice},
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
                    <form id="service-form" onSubmit={addYoutubeService}>
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
                            <select
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                }}
                            >
                                <option value="FULL">FULL VIDEO</option>
                                <option value="SHORTS">SHORTS</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <label for="service-type">Post Type</label>
                            <select
                                onChange={(e) => {
                                    setPostType(e.target.value);
                                }}
                            >
                                <option value="VIDEO">VIDEO</option>
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
                                Fixed Price
                            </label>
                            <input
                                id="fixed-price"
                                type="number"
                                placeholder="Price"
                                value={fixedPrice}
                                onChange={(e) => {
                                    setFixedPrice(e.target.value);
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
