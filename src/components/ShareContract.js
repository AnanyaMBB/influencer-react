import React, { useState } from "react";
import "./ShareContract.css";

export default function ShareContract(props) {
    const [shareContractOverlayOpen, setShareContractOverlayOpen] =
        useState(false);

    return (
        <>
            <div
                className="share-contract-btn"
                onClick={() => {
                    setShareContractOverlayOpen(!shareContractOverlayOpen);
                }}
            >
                <span class="material-symbols-outlined">{props.icon}</span>
            </div>
            {shareContractOverlayOpen ? (
                <div className="share-contract-container">
                    <div className="share-contract-header">
                        <p>Share Contract</p>
                        <span
                            class="material-symbols-outlined"
                            onClick={() => {
                                setShareContractOverlayOpen(false);
                            }}
                        >
                            close
                        </span>
                    </div>
                </div>
            ) : null}
        </>
    );
}
