import "./Requests.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../shared";

export default function Requests() {
    const [requests, setRequests] = useState([]);

    function fetchRequests() {
        const url =
            baseUrl +
            `api/requests/get?username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setRequests(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    function updateState(state, request_id, request) {
        console.log("STATE", state);
        const url = baseUrl + `api/requests/state/update`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                state: state,
                request_id: request_id,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                fetchRequests();
            })
            .catch((error) => {});
    }

    return (
        <div className="requests-container">
            <div className="requests">
                <div className="request title">
                    <div className="column">
                        <p>Name</p>
                    </div>
                    <div className="column">
                        <p>Business Name</p>
                    </div>
                    <div className="column">
                        <p>Business Industry</p>
                    </div>
                    <div className="column">
                        <p>Business Website</p>
                    </div>
                    <div className="column">
                        <p>Location</p>
                    </div>
                    <div className="column">
                        <p>Selected Service</p>
                    </div>
                    <div className="column">
                        <p>Service Price</p>
                    </div>
                    <div className="column action">
                        <p></p>
                    </div>
                </div>
                <div className="scroll-container">
                    {requests
                        ? requests.map((request) => {
                              return (
                                  <div className="request">
                                      <div className="column">
                                          <p>{request.business_username}</p>
                                      </div>
                                      <div className="column">
                                          <p>{request.business_name}</p>
                                      </div>
                                      <div className="column">
                                          <p>{request.business_industry}</p>
                                      </div>
                                      <div
                                          className="column website"
                                          onClick={() => {
                                              window.open(
                                                  request.business_website,
                                                  "_blank"
                                              );
                                          }}
                                      >
                                          <p>{request.business_industry}</p>
                                      </div>
                                      <div className="column">
                                          <p>{request.business_location}</p>
                                      </div>
                                      <div className="column service">
                                          <p>{request.service_name}</p>
                                      </div>
                                      <div className="column">
                                          <p>{request.service_price}</p>
                                      </div>
                                      <div className="column action">
                                          {request.state === "requested" ? (
                                              <>
                                                  <button
                                                      className="accept"
                                                      type="button"
                                                      onClick={() => {
                                                          updateState(
                                                              "accepted",
                                                              request.id,
                                                              request
                                                          );
                                                      }}
                                                  >
                                                      Accept
                                                  </button>
                                                  <button
                                                      className="decline"
                                                      type="button"
                                                      onClick={() => {
                                                          updateState(
                                                              "declined",
                                                              request.id
                                                          );
                                                      }}
                                                  >
                                                      Decline
                                                  </button>
                                              </>
                                          ) : request.state === "accepted" ? (
                                              <button
                                                  type="button"
                                                  className="accepted"
                                              >
                                                  Accepted
                                              </button>
                                          ) : (
                                              <button
                                                  type="button"
                                                  className="declined"
                                              >
                                                  Declined
                                              </button>
                                          )}
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}
