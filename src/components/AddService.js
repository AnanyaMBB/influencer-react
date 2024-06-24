import "./AddService.css";
import { useState } from "react";
import { baseUrl } from "../shared";

export default function AddService(props) {
    const [closed, setClosed] = useState(true);
    const [serviceName, setServiceName] = useState();
    const [serviceType, setServiceType] = useState();
    const [postLength, setPostLength] = useState();
    const [price, setPrice] = useState();

    function CreateService(e) {
        e.preventDefault();
        let url = "";
        if (props.page == "ugc") 
            url = baseUrl + "api/instagram/ugc/add";
        else if (props.page == "feed-post")
            url = baseUrl + "api/instagram/feed/add";
        else if (props.page == "reel-post")
            url = baseUrl + "api/instagram/reel/add";
        else if (props.page == "story-post")
            url = baseUrl + "api/instagram/story/add";
        else if (props.page == "other-post")
            url = baseUrl + "api/instagram/other/add";

            
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({
                "instagram_id": localStorage.getItem("instagram_id"),
                "service_name": serviceName, 
                "post_type": serviceType,
                "post_length": postLength,
                "price": price,
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Error in adding service");
            }
        })
        .catch((error) => {
            console.error(error);
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
                    <form id="service-form" onSubmit={CreateService}>
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
                            <input
                                id="service-type"
                                type="text"
                                placeholder="Service Type"
                                value={serviceType}
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-item">
                            <label for="post-length">Post Length</label>
                            <input
                                id="post-length"
                                type="text"
                                placeholder="Post Length"
                                value={postLength}
                                onChange={(e) => {
                                    setPostLength(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-item">
                            <label for="price">
                                {props.page == "ugc" ? "Price" : "Price/Hour"}
                            </label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
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
