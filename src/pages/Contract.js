import { useState } from "react";
import "./Contract.css";

export default function Contract() {
    const [historyOpen, setHistoryOpen] = useState(false);

    return (
        <div className="contract-container">
            <div className="menubar">
                <div className="text-tools">
                    <div className="bold">
                        <span class="material-symbols-outlined selected">
                            format_bold
                        </span>
                    </div>
                    <div className="italic">
                        <span class="material-symbols-outlined">
                            format_italic
                        </span>
                    </div>
                    <div className="underline">
                        <span class="material-symbols-outlined">
                            format_underlined
                        </span>
                    </div>
                    <div className="font-size">
                        <select>
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
                        <span class="material-symbols-outlined">comment</span>
                    </div>
                    <div className="new-version">
                        <span class="material-symbols-outlined">add</span>
                    </div>
                    <div className="save">
                        <span class="material-symbols-outlined">save</span>
                    </div>
                    <div className="upload">
                        <span class="material-symbols-outlined">upload</span>
                    </div>
                    <div className="share">
                        <span class="material-symbols-outlined">share</span>
                    </div>
                </div>
            </div>
            <div className="content" contentEditable></div>
            <div className="sign"></div>
            <div className="versions">
                <div className="version-list">
                    <div className="version selected">
                        <p>Version 1</p>
                    </div>
                    <div className="version">
                        <p>Version 2</p>
                    </div>
                    <div className="version">
                        <p>Version 3</p>
                    </div>
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
                        <span class="material-symbols-outlined close" onClick={() => {
                            setHistoryOpen(false);
                        }}>close</span>
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
                        <div className="row">
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
                        <div className="row">
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
                        <div className="row">
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
                        <div className="row">
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
                        <div className="row">
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
                        <div className="row">
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
                    </div>
                </div>
            ) : null}
            <div className="sidebar">
                <div className="contracts-list-container">
                    <div className="title">
                        <p>Contracts</p>
                    </div>
                    <div className="contracts">
                        <div className="contract">
                            <div className="contract-id">
                                <p>#1001</p>
                            </div>
                            <div className="contract-title">
                                <p>My contract</p>
                            </div>
                            <div className="between">
                                <span className="business">Amazon</span>
                                <span class="material-symbols-outlined icon">
                                    link
                                </span>
                                <span className="influencer">Ananya</span>
                            </div>
                            <div className="contract-date">
                                <p>10/10/2024 9:30AM</p>
                            </div>
                        </div>

                        <div className="contract">
                            <div className="contract-id">
                                <p>#1001</p>
                            </div>
                            <div className="contract-title">
                                <p>My contract</p>
                            </div>
                            <div className="between">
                                <span className="business">Amazon</span>
                                <span class="material-symbols-outlined icon">
                                    link
                                </span>
                                <span className="influencer">Ananya</span>
                            </div>
                            <div className="contract-date">
                                <p>10/10/2024 9:30AM</p>
                            </div>
                        </div>

                        <div className="contract">
                            <div className="contract-id">
                                <p>#1001</p>
                            </div>
                            <div className="contract-title">
                                <p>My contract</p>
                            </div>
                            <div className="between">
                                <span className="business">Amazon</span>
                                <span class="material-symbols-outlined icon">
                                    link
                                </span>
                                <span className="influencer">Ananya</span>
                            </div>
                            <div className="contract-date">
                                <p>10/10/2024 9:30AM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="elements-container"></div>
            </div>
        </div>
    );
}
