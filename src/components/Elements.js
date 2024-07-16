import "./Elements.css";
import { useState, useRef, useEffect } from "react";
import { baseUrl } from "../shared";

export default function Elements(props) {
    const [elementsOpen, setElementsOpen] = useState(true);
    const [minimized, setMinimized] = useState(false);
    const [uploadDate, setUploadDate] = useState(props?.elementDetails?.file_upload_date?.split("T")[0]);
    const [fileUploadUser, setFileUploadUser] = useState(props?.elementDetails?.file_upload_user);
    const dateInputRef = useRef(null);
    const dateDisplaySpan = useRef(null);
    const fileUploadUserSpan = useRef(null);
    const fileUploadUserSelect = useRef(null);
    
    useEffect(() => {
        if (props.elementDetails) {
            setUploadDate(props?.elementDetails?.file_upload_date?.split("T")[0]);
            setFileUploadUser(props.elementDetails?.file_upload_user);
        }
    }, [props.elementDetails]);

    function insertElement(e) {}

    // function getElementDetails() {
    //     const url = baseUrl + `api/element/details?contract_id=${props.selectedContractID}&version_id=${props.selectedVersionID}`;

    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("access"),
    //         }
    //     })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log("Element details: ", data);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });
    // }



    return (
        <>
            {/* <span>Elements</span> */}

            {elementsOpen ? (
                <div
                    className={
                        minimized
                            ? "elements-container minimized"
                            : "elements-container"
                    }
                >
                    <div className="elements-header">
                        <p>Elements</p>

                        {minimized ? (
                            <span
                                className="material-symbols-outlined"
                                id="arrow-down"
                                onClick={() => {
                                    setMinimized(false);
                                }}
                            >
                                keyboard_arrow_down
                            </span>
                        ) : (
                            <span
                                className="material-symbols-outlined"
                                id="arrow-down"
                                onClick={() => {
                                    setMinimized(true);
                                }}
                            >
                                close_fullscreen
                                {/* minimize */}
                            </span>
                        )}
                    </div>
                    <div
                        className={
                            minimized
                                ? "elements-content display-none-property"
                                : "elements-content"
                        }
                    >
                        <div className="element business-name" onMouseDown={(e) => {
                            props.insertElement("business-name", document.getSelection().anchorNode.parentElement);
                        }}>
                            <div className="element-title">
                                <p>Business Name</p>
                            </div>
                            <div className="element-content">
                                <span className="element-text color1">{props.elementDetails.company_name}</span>
                            </div>
                        </div>
                        <div className="element influencer-name" onMouseDown={(e) => {
                            props.insertElement("influencer-name", document.getSelection().anchorNode.parentElement);
                        }}>
                            <div className="element-title">
                                <p>Influencer Name</p>
                            </div>
                            <div className="element-content">
                                <span className="element-text color2">{props.elementDetails.influencer_name}</span>
                            </div>
                        </div>
                        <div className="element influencer-username" onMouseDown={(e) => {
                            props.insertElement("influencer-username", document.getSelection().anchorNode.parentElement);
                        }}>
                            <div className="element-title">
                                <p>Influencer Username</p>
                            </div>
                            <div className="element-content">
                                <span className="element-text color3">{props.elementDetails.influencer_username}</span>
                            </div>
                        </div>
                        <div className="element content-post-date" onMouseDown={(e) => {
                            if (!e.target.classList.contains("calendar-icon")){
                                props.insertElement("content-post-date", document.getSelection().anchorNode.parentElement);
                            }
                                
                        }}>
                            <div className="element-title">
                                <p>Content Post Date</p>
                                <span className="material-symbols-outlined calendar-icon" onClick={() => {
                                    dateInputRef.current.classList.toggle("hidden");
                                    dateDisplaySpan.current.classList.toggle("hidden");
                                }}>calendar_today</span>
                            </div>
                            <div className="element-content">
                                <span className="element-text color4" ref={dateDisplaySpan}>{uploadDate}</span>
                                <input type="date" className="hidden" ref={dateInputRef} onChange={(e) => {
                                    setUploadDate(e.target.value);
                                    dateInputRef.current.classList.toggle("hidden");
                                    dateDisplaySpan.current.classList.toggle("hidden");
                                }}/>
                            </div>
                        </div>
                        <div className="element file-upload-user" onMouseDown={(e) => {
                            if(!e.target.classList.contains("edit-icon"))
                                props.insertElement("file-upload-user", document.getSelection().anchorNode.parentElement);
                        }}>
                            <div className="element-title">
                                <p>File Upload User</p>
                                <span className="material-symbols-outlined edit-icon" onClick={() => {
                                    fileUploadUserSpan.current.classList.toggle("hidden");
                                    fileUploadUserSelect.current.classList.toggle("hidden");
                                }}>edit</span>
                            </div>
                            <div className="element-content">
                                <span className="element-text color5" ref={fileUploadUserSpan}>{fileUploadUser}</span>
                                <select className="hidden" ref={fileUploadUserSelect} onChange={(e) => {
                                    setFileUploadUser(e.target.value);
                                    fileUploadUserSpan.current.classList.toggle("hidden");
                                    fileUploadUserSelect.current.classList.toggle("hidden");
                                }}>
                                    <option value="Influencer">Influencer</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
