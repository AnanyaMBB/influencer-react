import "./AddService.css";
import { useState } from "react";

export default function AddService() {
    const [closed, setClosed] = useState(true);
    return (
        <>
            {/* <div className="overlay-trigger"></div> */}
            <button className="overlay-trigger" onClick={() => {
                setClosed(!closed);
            }}>Add Service</button>
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
                <div className="body">
                    <form>
                        <div className="form-item">
                            <label for="service-name">Service Name</label>
                            <input
                                id="service-name"
                                type="text"
                                placeholder="Service Name"
                            />
                        </div>
                        <div className="form-item">
                            <label for="service-type">Service Type</label>
                            <input
                                id="service-type"
                                type="text"
                                placeholder="Service Type"
                            />
                        </div>
                        <div className="form-item">
                            <label for="post-length">Post Length</label>
                            <input
                                id="post-length"
                                type="text"
                                placeholder="Post Length"
                            />
                        </div>
                        <div className="form-item">
                            <label for="price">Price</label>
                            <input id="price" type="text" placeholder="Price" />
                        </div>

                        <div className="form-item">
                            <button className="submit-service">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
