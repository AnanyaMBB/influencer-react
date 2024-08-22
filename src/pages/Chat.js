import "./Chat.css";
import FileUpload from "../components/FileUpload";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function Chat() {
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedChat, setSelectedChat] = useState("");
    const [selectedChatUser, setSelectedChatUser] = useState("");
    const [files, setFiles] = useState([]);
    

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);


    // let client;
    const [client, setClient] = useState();
    useEffect(() => {
        setClient(
            new W3CWebSocket(
                `ws://127.0.0.1:8000/ws/chat/${selectedChat}/?user=${localStorage.getItem(
                    "username"
                )}`
            )
        );
    }, [selectedChat]);

    if (client && client.readyState === client.OPEN) {
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log("message", dataFromServer);
            // setMessages([dataFromServer.message, ...messages]);
            setMessages((previousMessages) => [
                dataFromServer,
                ...previousMessages,
            ]);
            console.log("updated messages", messages);
        };
    }

    function messageSend() {
        console.log("Sending message...");
        console.log("SELECTED CHAT", selectedChat);
        console.log(client);
        if (client && selectedChat) {
            client.send(JSON.stringify({ message: message }));
        }
    }

    useEffect(() => {
        const url =
            baseUrl + `chat/get?username=${localStorage.getItem("username")}`;
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
                console.log(data);
                setChats(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    function fetchMessages(chatId) {
        const url = baseUrl + `chat/messages/get?chat_id=${chatId}`;
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
                console.log("MESSAGE", data);
                data = data.map((message) => {
                    return {
                        message: message.message,
                        timestamp: message.timestamp,
                        sender: message.sender,
                    };
                });
                setMessages(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleFileSelect = async (file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("username", localStorage.getItem("username"));

                const url = baseUrl + `api/file/upload`;
                fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access"),
                    },
                    body: formData,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                    })
                    .then((data) => {
                        const url =
                            baseUrl +
                            `api/files?username=${localStorage.getItem(
                                "username"
                            )}`;
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
                                    throw new Error(
                                        "Network response was not ok"
                                    );
                                }
                                return response.json();
                            })
                            .then((data) => {
                                setFiles(data.files);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error("Invalid file type");
        }
    };

    function getFiles() {
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
    }

    const scrollableRef = useRef(null);

    useEffect(() => {
        const handleWheel = (event) => {
            if (event.deltaY !== 0) {
                event.preventDefault(); // Prevent vertical scroll
                scrollableRef.current.scrollLeft += event.deltaY; // Scroll horizontally
            }
        };

        const scrollableDiv = scrollableRef.current;
        scrollableDiv.addEventListener("wheel", handleWheel);

        // Cleanup the event listener on component unmount
        return () => {
            scrollableDiv.removeEventListener("wheel", handleWheel);
        };
    }, []);

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
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="chats">
                {chats.map((chat) => {
                    return (
                        <div
                            className="chat"
                            onClick={() => {
                                setSelectedChat(chat.id);
                                setSelectedChatUser(
                                    localStorage.getItem("username") ==
                                        chat.user1
                                        ? chat.user2
                                        : chat.user1
                                );
                                fetchMessages(chat.id);
                                getFiles();
                            }}
                        >
                            <div className="chat-profile-img">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="profile-img"
                                />
                            </div>
                            <div className="chat-user">
                                <p>
                                    {localStorage.getItem("username") ==
                                    chat.user1
                                        ? chat.user2
                                        : chat.user1}
                                </p>
                            </div>
                            <div className="chat-last-message">
                                <p>{chat.last_message.substring(0, 20)}</p>
                            </div>
                            <div className="chat-time">
                                <div className="icon">
                                    <span class="material-symbols-outlined">
                                        schedule
                                    </span>
                                </div>
                                <div className="date">
                                    <p>
                                        {
                                            chat.last_message_timestamp.split(
                                                "T"
                                            )[0]
                                        }
                                    </p>
                                </div>
                                <div className="time">
                                    {
                                        chat.last_message_timestamp
                                            .split("T")[1]
                                            .split(".")[0]
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
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
                        <p>{selectedChatUser}</p>
                    </div>
                </div>
                <div className="action">
                    <div className="search">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                </div>
            </div>
            <div className="messages">
                {messages
                    ? messages.map((message) => {
                          if (
                              message.sender ===
                              localStorage.getItem("username")
                          ) {
                              return (
                                  <div className="message user">
                                      <div className="text">
                                          <p>{message.message}</p>
                                      </div>
                                      <div className="timestamp">
                                          <p>
                                              {
                                                  message?.timestamp?.split(
                                                      "T"
                                                  )[0]
                                              }{" "}
                                              {
                                                  message?.timestamp
                                                      ?.split("T")[1]
                                                      ?.split(".")[0]
                                              }
                                          </p>
                                      </div>
                                  </div>
                              );
                          } else {
                              return (
                                  <div className="message other">
                                      <div className="text">
                                          <p>{message.message}</p>
                                      </div>
                                      <div className="timestamp">
                                          <p>
                                              {
                                                  message?.timestamp?.split(
                                                      "T"
                                                  )[0]
                                              }{" "}
                                              {
                                                  message?.timestamp
                                                      ?.split("T")[1]
                                                      ?.split(".")[0]
                                              }
                                          </p>
                                      </div>
                                  </div>
                              );
                          }
                      })
                    : null}
            </div>
            <div className="message-action">
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                </div>
                <div
                    className="message-send"
                    onClick={() => {
                        messageSend();
                    }}
                >
                    <span class="material-symbols-outlined">send</span>
                </div>
                {/* <div className="message-attach">
                    <span class="material-symbols-outlined">attach_file</span>
                </div> */}
                <FileUpload
                    icon="attach_file"
                    onFileSelect={handleFileSelect}
                />
            </div>
            <div className="files" ref={scrollableRef}>
                {files
                    ? files.map((file) => {
                          return (
                              <div className="file">
                                  <div className="icon">
                                      <span class="material-symbols-outlined">
                                          description
                                      </span>
                                  </div>
                                  <div className="action">
                                      <span class="material-symbols-outlined">
                                          more_vert
                                      </span>
                                  </div>
                                  <div className="file-name">
                                      <p>{file.file_name.substring(0, 20)}</p>
                                  </div>
                                  <div className="file-size">
                                      {file.file_size}
                                  </div>
                                  <div className="view">
                                      <p
                                          onClick={() => {
                                              handleDownload(file.id);
                                          }}
                                      >
                                          Click to view
                                      </p>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
