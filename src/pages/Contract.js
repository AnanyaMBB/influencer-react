import { useState, useRef, useEffect } from "react";
import "./Contract.css";
import htmlToPdfmake from "html-to-pdfmake";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { baseUrl } from "../shared";
import FileUpload from "../components/FileUpload";

export default function Contract() {
    const [historyOpen, setHistoryOpen] = useState(false);
    const contentRef = useRef(null);
    const contractIDRef = useRef(null);
    const [contracts, setContracts] = useState([]);
    const [contractVersions, setContractVersions] = useState([]);
    const [selectedContractID, setSelectedContractID] = useState(null);
    const [selectedVersionID, setSelectedVersionID] = useState(null);
    const [versionHighlighted, setVersionHighlighted] = useState({});

    useEffect(() => {
        const url = baseUrl + `api/contract/get/all`;
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
                console.log("data", data);
                setContracts(data);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with your fetch operation:",
                    error
                );
            });
    }, []);

    const handleDownload = () => {
        const content = contentRef.current;
        html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: [canvas.width, canvas.height],
            });
            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            pdf.save("document.pdf");
        });
    };

    const applyCommand = (command) => {
        const selection = window.getSelection();

        console.log(selection.anchorNode.parentElement.nodeName);
        if (
            selection.toString() !== "" &&
            (selection.anchorNode.parentElement === contentRef.current ||
                selection.anchorNode.parentElement.nodeName === "DIV")
        ) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.classList.add(command);
            range.surroundContents(span);
        } else if (
            selection.toString() !== "" &&
            selection.anchorNode.parentElement.nodeName === "SPAN"
        ) {
            const range = selection.getRangeAt(0);
            const parentSpan = selection.anchorNode.parentElement;
            if (parentSpan.classList.contains(command)) {
                if (parentSpan.classList.length === 1) {
                    const startContainer = range.startContainer;
                    const endContainer = range.endContainer;
                    const startOffset = range.startOffset;
                    const endOffset = range.endOffset;

                    const beforeText = startContainer.textContent.substring(
                        0,
                        startOffset
                    );
                    const selectedText = startContainer.textContent.substring(
                        startOffset,
                        endOffset
                    );
                    const afterText =
                        endContainer.textContent.substring(endOffset);

                    const beforeNode = document.createTextNode(beforeText);
                    const selectedNode = document.createTextNode(selectedText);
                    const afterNode = document.createTextNode(afterText);

                    const parentElement = startContainer.parentElement;

                    if (beforeNode.textContent !== "") {
                        const beforeSpan = document.createElement("span");
                        beforeSpan.classList.add(command);
                        beforeSpan.appendChild(beforeNode);
                        parentElement.parentElement.insertBefore(
                            beforeSpan,
                            parentElement
                        );
                    }
                    if (selectedNode.textContent !== "") {
                        const selectedSpan = document.createElement("span");
                        selectedSpan.appendChild(selectedNode);
                        parentElement.parentElement.insertBefore(
                            selectedNode,
                            parentElement
                        );
                    }
                    if (afterNode.textContent !== "") {
                        const afterSpan = document.createElement("span");
                        afterSpan.classList.add(command);
                        afterSpan.appendChild(afterNode);
                        parentElement.parentElement.insertBefore(
                            afterSpan,
                            parentElement
                        );
                    }
                    parentSpan.parentElement.removeChild(parentSpan);
                } else {
                    const classList = parentSpan.classList
                        .toString()
                        .split(" ");

                    parentSpan.classList.remove(command);

                    const startContainer = range.startContainer;
                    const endContainer = range.endContainer;
                    const startOffset = range.startOffset;
                    const endOffset = range.endOffset;

                    const beforeText = startContainer.textContent.substring(
                        0,
                        startOffset
                    );
                    const selectedText = startContainer.textContent.substring(
                        startOffset,
                        endOffset
                    );
                    const afterText =
                        endContainer.textContent.substring(endOffset);

                    const beforeNode = document.createTextNode(beforeText);
                    const selectedNode = document.createTextNode(selectedText);
                    const afterNode = document.createTextNode(afterText);

                    const parentElement = startContainer.parentElement;

                    if (beforeNode.textContent !== "") {
                        const beforeSpan = document.createElement("span");
                        classList.forEach((item) => {
                            console.log(item);
                            beforeSpan.classList.add(item);
                        });
                        beforeSpan.appendChild(beforeNode);
                        parentElement.parentElement.insertBefore(
                            beforeSpan,
                            parentElement
                        );
                    }

                    if (selectedNode.textContent !== "") {
                        const selectedSpan = document.createElement("span");
                        classList.forEach((item) => {
                            if (item !== command)
                                selectedSpan.classList.add(item);
                        });
                        selectedSpan.appendChild(selectedNode);
                        parentElement.parentElement.insertBefore(
                            selectedSpan,
                            parentElement
                        );
                    }

                    if (afterNode.textContent !== "") {
                        const afterSpan = document.createElement("span");
                        classList.forEach((item) => {
                            afterSpan.classList.add(item);
                        });
                        afterSpan.appendChild(afterNode);
                        parentElement.parentElement.insertBefore(
                            afterSpan,
                            parentElement
                        );
                    }
                    parentSpan.parentElement.removeChild(parentSpan);
                }
            } else {
                const classList = parentSpan.classList.toString().split(" ");

                const startContainer = range.startContainer;
                const endContainer = range.endContainer;
                const startOffset = range.startOffset;
                const endOffset = range.endOffset;

                const beforeText = startContainer.textContent.substring(
                    0,
                    startOffset
                );
                const selectedText = startContainer.textContent.substring(
                    startOffset,
                    endOffset
                );
                const afterText = endContainer.textContent.substring(endOffset);

                const beforeNode = document.createTextNode(beforeText);
                const selectedNode = document.createTextNode(selectedText);
                const afterNode = document.createTextNode(afterText);

                const parentElement = startContainer.parentElement;

                if (beforeNode.textContent !== "") {
                    const beforeSpan = document.createElement("span");
                    classList.forEach((item) => {
                        beforeSpan.classList.add(item);
                    });
                    beforeSpan.appendChild(beforeNode);
                    parentElement.parentElement.insertBefore(
                        beforeSpan,
                        parentElement
                    );
                }
                if (selectedNode.textContent !== "") {
                    const selectedSpan = document.createElement("span");
                    classList.forEach((item) => {
                        selectedSpan.classList.add(item);
                    });
                    selectedSpan.classList.add(command);
                    selectedSpan.appendChild(selectedNode);
                    parentElement.parentElement.insertBefore(
                        selectedSpan,
                        parentElement
                    );
                }
                if (afterNode.textContent !== "") {
                    const afterSpan = document.createElement("span");
                    classList.forEach((item) => {
                        afterSpan.classList.add(item);
                    });
                    afterSpan.appendChild(afterNode);
                    parentElement.parentElement.insertBefore(
                        afterSpan,
                        parentElement
                    );
                }
                parentSpan.parentElement.removeChild(parentSpan);
            }
        }
    };

    function fetchVersions() {
        const contractID = contractIDRef.current.textContent.substring(
            1,
            contractIDRef.current.textContent.length
        );
        setSelectedContractID(contractID);
        const url =
            baseUrl + `api/contract/version/get?contract_id=${contractID}`;

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
                setContractVersions(data);
                data.forEach((version) => {
                   setVersionHighlighted((prev) => ({
                          ...prev,
                          [version.contract_version]: false
                   }))
                });
            })
            .catch((error) => {
                console.error(
                    "There was a problem with your fetch operation:",
                    error
                );
            });
    }

    console.log("Version Highlighted: ", versionHighlighted);

    function fetchVersion(version_id) {
        setSelectedVersionID(version_id);
        const url =
            baseUrl +
            `api/contract/version/text/get?contract_id=${selectedContractID}&version_id=${version_id}`;
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
                contentRef.current.innerHTML = data.contract_text;
            })
            .catch((error) => {
                console.error(
                    "There was a problem with your fetch operation:",
                    error
                );
            });
    }

    function createVersion() {
        const url = baseUrl + `api/contract/version/create`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({
                "contract_id": selectedContractID, 
                "username": localStorage.getItem("username"),
                "contract_text": contentRef.current.innerHTML,
                "isInfluencer": localStorage.getItem("accountType") === "influencer" ? true : false
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("New Version Data: ", data);
            setContractVersions([...contractVersions, data]);
        })
        .catch((error) => {
            console.error(
                "There was a problem with your fetch operation:",
                error
            );
        });
    }

    function updateContractVersion() {
        const url = baseUrl + "api/contract/version/update";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({
                "contract_id": selectedContractID,
                "version_id": selectedVersionID,
                "contract_text": contentRef.current.innerHTML,
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Update Response", data);
        })
        .catch((error) => {
            console.error(
                "There was a problem with your fetch operation:",
                error
            );
        });
    }
    
    return (
        <div className="contract-container">
            <div className="menubar">
                <div className="text-tools">
                    <div
                        className="bold"
                        onMouseDown={() => applyCommand("bold")}
                    >
                        <span class="material-symbols-outlined selected">
                            format_bold
                        </span>
                    </div>
                    <div
                        className="italic"
                        onMouseDown={() => applyCommand("italic")}
                    >
                        <span class="material-symbols-outlined">
                            format_italic
                        </span>
                    </div>
                    <div
                        className="underline"
                        onMouseDown={() => applyCommand("underline")}
                    >
                        <span class="material-symbols-outlined">
                            format_underlined
                        </span>
                    </div>
                    <div className="font-size">
                        <select onChange={(e) => applyCommand("size-" + e.target.value)}>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="22">22</option>
                            <option value="24">24</option>
                            <option value="26">26</option>
                            <option value="28">28</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                            <option value="72">72</option>
                        </select>
                    </div>
                </div>
                <div className="contract-tools">
                    <div className="comment">
                        <span
                            class="material-symbols-outlined"
                            onClick={handleDownload}
                        >
                            comment
                        </span>
                    </div>
                    <div className="new-version">
                        <span class="material-symbols-outlined" onClick={createVersion}>add</span>
                    </div>
                    <div className="save" onClick={updateContractVersion}>
                        <span class="material-symbols-outlined">save</span>
                    </div>
                    <div className="upload">
                        {/* <span class="material-symbols-outlined">upload</span> */}
                        <FileUpload icon="upload" />
                    </div>
                    <div className="share">
                        <span class="material-symbols-outlined">share</span>
                    </div>
                </div>
            </div>
            <div className="content" contentEditable ref={contentRef}></div>
            <div className="sign"></div>
            <div className="versions">
                <div className="version-list">
                    {contractVersions.map((version) => {
                        return (
                            <div
                                className={versionHighlighted[version.contract_version] ? "version selected" : "version"}
                                data-version-id={version.contract_version}
                                onClick={(e) => {
                                    if (
                                        e.target.classList.contains("version")
                                    ) {
                                        Object.keys(versionHighlighted).forEach((key) => {
                                            versionHighlighted[key] = (parseInt(key) === version.contract_version)
                                        });

                                        fetchVersion(
                                            e.target.getAttribute(
                                                "data-version-id"
                                            )
                                        );
                                    } else {
                                        Object.keys(versionHighlighted).forEach((key) => {
                                            versionHighlighted[key] = (parseInt(key) === version.contract_version)
                                        });

                                        fetchVersion(
                                            e.target.parentElement.getAttribute(
                                                "data-version-id"
                                            )
                                        );
                                    }
                                }}
                            >
                                <p>Version {version.contract_version}</p>
                            </div>
                        );
                    })}
                </div>
                <div
                    className="history"
                    onClick={(e) => {
                        setHistoryOpen(!historyOpen);
                    }}
                >
                    <span class="material-symbols-outlined">history</span>
                </div>
            </div>
            {historyOpen == true ? (
                <div className="history-overlay">
                    <div className="title">
                        <p>Version History</p>
                        <span
                            class="material-symbols-outlined close"
                            onClick={() => {
                                setHistoryOpen(false);
                            }}
                        >
                            close
                        </span>
                    </div>
                    <div className="content">
                        <div className="row title-row">
                            <div className="column version-id">
                                <p>Version ID</p>
                            </div>
                            <div className="column owner">
                                <p>Owner</p>
                            </div>
                            <div className="column created">
                                <p>Created</p>
                            </div>
                            <div className="column last-change">
                                <p>Last Change</p>
                            </div>
                        </div>
                        {contractVersions.map((version) => {
                            return (
                                <div className="row" onClick={(e) => {
                                    if (
                                        e.target.classList.contains("row")
                                    ) {
                                        Object.keys(versionHighlighted).forEach((key) => {
                                            versionHighlighted[key] = (parseInt(key) === parseInt(e.target.querySelector(
                                                ".version-id"
                                            ).textContent))
                                        });
                                        
                                        fetchVersion(
                                            e.target.querySelector(
                                                ".version-id"
                                            ).textContent
                                        );
                                    }
                                    else if (e.target.classList.contains(".version-id")) {
                                        Object.keys(versionHighlighted).forEach((key) => {
                                            versionHighlighted[key] = (parseInt(key) === parseInt(e.target.parentElement.querySelector(
                                                ".version-id"
                                            ).textContent))
                                        });
                                        fetchVersion(e.target.parentElement.querySelector(".version-id").textContent);
                                    }
                                    else {
                                        Object.keys(versionHighlighted).forEach((key) => {
                                            versionHighlighted[key] = (parseInt(key) === parseInt(e.target.parentElement.parentElement.querySelector(
                                                ".version-id"
                                            ).textContent))
                                        });
                                        fetchVersion(e.target.parentElement.parentElement.querySelector(".version-id").textContent);
                                    }
                                }}>
                                    <div className="column version-id">
                                        <p>{version.contract_version}</p>
                                    </div>
                                    <div className="column owner">
                                        <p>Owner</p>
                                    </div>
                                    <div className="column created">
                                        <p>
                                            {
                                                version.contract_date.split(
                                                    "T"
                                                )[0]
                                            }{" "}
                                            {
                                                version.contract_date
                                                    .split("T")[1]
                                                    .substring(
                                                        1,
                                                        version.contract_date.split(
                                                            "T"
                                                        )[1].length - 1
                                                    )
                                                    .split(".")[0]
                                            }
                                        </p>
                                    </div>
                                    <div className="column last-change">
                                        <p>Last Change</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
            <div className="sidebar">
                <div className="contracts-list-container">
                    <div className="title">
                        <p>Contracts</p>
                    </div>
                    <div className="contracts">
                        {contracts.map((contract) => {
                            return (
                                <div
                                    className="contract"
                                    onClick={fetchVersions}
                                >
                                    <div
                                        className="contract-id"
                                        ref={contractIDRef}
                                    >
                                        <p>#{contract.contract_id}</p>
                                    </div>
                                    <div className="contract-title">
                                        <p>{contract.contract_name}</p>
                                    </div>
                                    <div className="between">
                                        <span className="business">
                                            {contract.business}
                                        </span>
                                        <span class="material-symbols-outlined icon">
                                            link
                                        </span>
                                        <span className="influencer">
                                            {contract.influencer}
                                        </span>
                                    </div>
                                    <div className="contract-date">
                                        <p>
                                            {
                                                contract.contract_date.split(
                                                    "T"
                                                )[0]
                                            }{" "}
                                            {contract.contract_date
                                                .split("T")[1]
                                                .substring(
                                                    0,
                                                    contract.contract_date.split(
                                                        "T"
                                                    )[1].length - 1
                                                )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="elements-container"></div>
            </div>
        </div>
    );
}
