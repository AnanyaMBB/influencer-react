import "./Chat.css";
import FileUpload from "../components/FileUpload";
import { useState } from "react";

export default function Chat() {
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [searchText, setSearchText] = useState("");

    return (
        <div className="chat-page-container">
            <div className="chat-title">
                <p>All Messages</p>
            </div>
            <div className="chat-search">
                <div className="search">
                    <div className="search-icon">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                    <div className="search-input">
                        <input type="text" placeholder="Search" value={searchText} onChange={(e) => {
                            setSearchText(e.target.value);
                        }} />
                    </div>
                </div>
            </div>
            <div className="chats">
                <div className="chat selected">
                    <div className="chat-profile-img">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="profile-img"
                        />
                    </div>
                    <div className="chat-user">
                        <p>Ananya</p>
                    </div>
                    <div className="chat-last-message">
                        <p>Hey, how are you?</p>
                    </div>
                    <div className="chat-time">
                        <div className="icon">
                            <span class="material-symbols-outlined">
                                schedule
                            </span>
                        </div>
                        <div className="date">
                            <p>Today</p>
                        </div>
                        <div className="time">9:30 A.M</div>
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-profile-img">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="profile-img"
                        />
                    </div>
                    <div className="chat-user">
                        <p>Ananya</p>
                    </div>
                    <div className="chat-last-message">
                        <p>Hey, how are you?</p>
                    </div>
                    <div className="chat-time">
                        <div className="icon">
                            <span class="material-symbols-outlined">
                                schedule
                            </span>
                        </div>
                        <div className="date">
                            <p>Today</p>
                        </div>
                        <div className="time">9:30 A.M</div>
                    </div>
                </div>
            </div>
            <div className="messages-user">
                <div className="user">
                    <div className="profile-img">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="profile-img"
                        />
                    </div>
                    <div className="name">
                        <p>Ananya</p>
                    </div>
                </div>
                <div className="action">
                    <div className="search">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                </div>
            </div>
            <div className="messages">
                <div className="message user">
                    <div className="text">
                        <p>Hello how are you user</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>
                <div className="message user">
                    <div className="text">
                        <p>Hello how are you user</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>
                <div className="message other">
                    <div className="text">
                        <p>Hello how are youdkslllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>

                <div className="message other">
                    <div className="text">
                        <p>Hello how are youdkslllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>

                <div className="message other">
                    <div className="text">
                        <p>Hello how are youdkslllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>

                <div className="message other">
                    <div className="text">
                        <p>Hello how are youdkslllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                    </div>
                    <div className="timestamp">
                        <p>9:30AM</p>
                    </div>
                </div>
            </div>
            <div className="message-action">
                <div className="message-input">
                    <input type="text" placeholder="Type a message" value={message} onChange={(e) => {
                        setMessage(e.target.value);
                    }}/>
                </div>
                <div className="message-send">
                    <span class="material-symbols-outlined">send</span>
                </div>
                {/* <div className="message-attach">
                    <span class="material-symbols-outlined">attach_file</span>
                </div> */}
                <FileUpload />
            </div>
            <div className="files">
                <div className="file">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            description
                        </span>
                    </div>
                    <div className="action">
                        <span class="material-symbols-outlined">more_vert</span>
                    </div>
                    <div className="file-name">
                        <p>Video_file_1.mp4</p>
                    </div>
                    <div className="file-size">1 MB</div>
                    <div className="view">
                        <p>Click to view</p>
                    </div>
                </div>

                <div className="file">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            description
                        </span>
                    </div>
                    <div className="action">
                        <span class="material-symbols-outlined">more_vert</span>
                    </div>
                    <div className="file-name">
                        <p>Video_file_1.mp4</p>
                    </div>
                    <div className="file-size">1 MB</div>
                    <div className="view">
                        <p>Click to view</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
