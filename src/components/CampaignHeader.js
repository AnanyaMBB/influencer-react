import './CampaignHeader.css';
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import { baseUrl } from '../shared';

export default function CampaignHeader(props) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Received campaignId in CampaignHeader:", props.campaignId);
    }, []);

    function buttonClickHandler(event) {
        navigate(props.buttonLink);
    }

    const onUpload = (event) => {
        console.log("Campaign ID : ", props.campaignId);
        const response = event.xhr.responseText;
        const data = JSON.parse(response);

        // const url = baseUrl + `api/campaign/post/schedule?account_id=${props.accountId}&caption=${props.caption}&media_url=${data.file_url}&scheduled_time=${props.scheduled_time}`;
        // fetch(url, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + localStorage.getItem("access"),
        //     }
        // })
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error("HTTP status " + response.status);
        //     }
        //     return response.json();
        // })
        // .catch((error) => {});
        // // alert(`File uploaded successfully! File URL: ${data.file_url}`);
    };

    return (
        <>
            <div className="campaign-header-container">
                <div className="left">
                    <h2>{props.campaignName}</h2>
                    <i class="pi pi-pencil"></i>
                </div>
                <div className="right">
                    {props.showButton &&
                        (props.isFileUpload ? (
                            // <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel={props.buttonText} />
                            <FileUpload
                                mode="basic"
                                name="file" // Ensure the name matches what your Django API expects
                                url={`http://localhost:8000/api/campaign/file/upload?campaign=${props.campaignId}`} // Your backend upload endpoint
                                // accept="image/*" // Allow only image files
                                maxFileSize={100000000} // Set maximum file size (1MB in this case)
                                onUpload={onUpload} // Event triggered after successful upload
                                auto
                                chooseLabel={props.buttonText} // Customize button label
                                // chooseOptions={{
                                //     icon: 'pi pi-cloud-upload', // Custom PrimeIcons icon
                                //     iconOnly: false, // Set to true if you want only the icon
                                //     className: 'custom-upload-button' // Optional: Apply additional styling
                                // }}
                            />
                        ) : (
                        <button
                            onClick={buttonClickHandler}
                        >
                            <i className="pi pi-plus"></i>
                            {/* <span>Add Influencer</span> */}
                            <span>{props.buttonText}</span>
                        </button>)
                        )
                    }
                    
                </div>                       
            </div>
        </>
    );
}