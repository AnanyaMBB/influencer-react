import "./FileManager.css";
import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../shared";

export default function FileManager(props) {
    // const [fileDialogOpen, setFileDialogOpen] = useState(props.fileDialogOpen);
    const rowContainerRef = useRef(null);
    const [files, setFiles] = useState([]);
    useEffect(() => {
        const url =
            baseUrl + `api/files?username=${localStorage.getItem("username")}`;
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
                setFiles(data.files);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        if (props.selectedContractID && props.selectedVersionID) {
        }
    }, [props.fileDialogOpen]);

    const handleDownload = (file_id) => {
        const url = baseUrl + `api/file/download?file_id=${file_id}`;
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
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "filename"); // Set the filename here
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    };

    function updateCampaignFile(file_id) {
        const url = baseUrl + "api/campaign/file/update";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({
                contract_id: props.selectedContractID,
                version_id: props.selectedVersionID,
                file_id: file_id,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                const url =
                    baseUrl +
                    `api/contract/signed/get?contract_id=${props.selectedContractID}&version_id=${props.selectedVersionID}`;

                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("access"),
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Campaign File Data: ", data);
                        props.setSelectedCampaignFile(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    function uploadFile(e) {
        console.log("File Input: ", e.target.files[0]);

        const url = baseUrl + "api/file/upload";
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("username", localStorage.getItem("username"));

        fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const file_id = data.file_id;
                console.log("File ID: ", file_id);
                const url =
                    baseUrl +
                    `api/files?username=${localStorage.getItem("username")}`;
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("access"),
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setFiles(data.files);

                        const url = baseUrl + "api/campaign/file/update";

                        fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                    "Bearer " + localStorage.getItem("access"),
                            },
                            body: JSON.stringify({
                                contract_id: props.selectedContractID,
                                version_id: props.selectedVersionID,
                                file_id: file_id,
                            }),
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(
                                        "Network response was not ok"
                                    );
                                }
                            })
                            .then((data) => {
                                const url =
                                    baseUrl +
                                    `api/contract/signed/get?contract_id=${props.selectedContractID}&version_id=${props.selectedVersionID}`;

                                fetch(url, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                            "Bearer " +
                                            localStorage.getItem("access"),
                                    },
                                })
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error(
                                                "Network response was not ok"
                                            );
                                        }
                                        return response.json();
                                    })
                                    .then((data) => {
                                        console.log(
                                            "Campaign File Data: ",
                                            data
                                        );
                                        props.setSelectedCampaignFile(data);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            })
                            .catch((error) => {
                                console.error("Error: ", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    return (
        <>
            {props.fileDialogOpen ? (
                <div className="file-manager-container">
                    <div className="file-manager-header">
                        <p>Files</p>
                        <span
                            class="material-symbols-outlined"
                            onClick={(e) => {
                                props.setFileDialogOpen(false);
                            }}
                        >
                            close
                        </span>
                    </div>
                    <div className="file-manager-content">
                        <div className="file-table">
                            <div className="row title-row">
                                <div className="column">
                                    <p>File Name</p>
                                </div>
                                <div className="column">
                                    <p>File Size</p>
                                </div>
                                <div className="column">
                                    <p>Upload Date</p>
                                </div>
                                <div className="column">
                                    <p>Action</p>
                                </div>
                                <div className="column download"></div>
                            </div>
                            <div className="rows-container">
                                {props.selectedCampaignFile.id ? (
                                    <div
                                        className="row"
                                        data-file-id={
                                            props.selectedCampaignFile.id
                                        }
                                    >
                                        <div className="column file-name">
                                            <p>
                                                {
                                                    props.selectedCampaignFile
                                                        .file_name
                                                }
                                            </p>
                                        </div>
                                        <div className="column">
                                            <p>
                                                {
                                                    props.selectedCampaignFile
                                                        .file_size
                                                }
                                            </p>
                                        </div>
                                        <div className="column">
                                            <p>
                                                {
                                                    props.selectedCampaignFile.file_date.split(
                                                        "T"
                                                    )[0]
                                                }
                                            </p>
                                        </div>
                                        <div className="column">
                                            <button
                                                type="button"
                                                className="selected-btn"
                                            >
                                                Selected
                                            </button>
                                        </div>
                                        <div className="column download">
                                            <span
                                                class="material-symbols-outlined"
                                                onClick={() => {
                                                    handleDownload(
                                                        props
                                                            .selectedCampaignFile
                                                            .id
                                                    );
                                                }}
                                            >
                                                download
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                {files.map((file) => {
                                    return (
                                        <div
                                            className="row"
                                            data-file-id={file.id}
                                        >
                                            <div className="column file-name">
                                                <p>{file.file_name}</p>
                                            </div>
                                            <div className="column">
                                                <p>{file.file_size}</p>
                                            </div>
                                            <div className="column">
                                                <p>
                                                    {
                                                        file.file_date.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                </p>
                                            </div>
                                            <div className="column">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        updateCampaignFile(
                                                            file.id
                                                        );
                                                    }}
                                                >
                                                    Select
                                                </button>
                                            </div>
                                            <div className="column download">
                                                <span
                                                    class="material-symbols-outlined"
                                                    onClick={() => {
                                                        handleDownload(file.id);
                                                    }}
                                                >
                                                    download
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="file-upload">
                            <div className="title">
                                <p>Upload</p>
                            </div>
                            <div className="input-container">
                                <input
                                    type="file"
                                    onChange={(e) => uploadFile(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
