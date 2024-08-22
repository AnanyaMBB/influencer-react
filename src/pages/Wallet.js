import "./Wallet.css";
import { useState, useEffect, useContext } from "react";
import  { useNavigate } from "react-router-dom";
import PayPalButton from "../components/PayPalButton";
import { baseUrl } from "../shared";
// import PayoutButton from "../components/PayoutButton";
import { LoginContext } from "../App";

export default function Wallet() {
    const [showPaypal, setShowPaypal] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        let url =
            baseUrl +
            `api/wallet/get?username=${localStorage.getItem("username")}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setWalletBalance(data.balance);
                url =
                    baseUrl +
                    `api/transactions/get?username=${localStorage.getItem(
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
                            throw new Error("HTTP status " + response.status);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setTransactions(data);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    return (
        <div className="wallet-container">
            <div className="wallet-amount">
                <div className="amount">
                    <div className="title">
                        <h2>Wallet Amount</h2>
                    </div>
                    <div className="amount-value">${walletBalance}</div>
                    <div className="action">
                        <span
                            onClick={() => {
                                setShowPaypal(!showPaypal);
                            }}
                        >
                            Top up
                        </span>
                    </div>
                </div>
                {showPaypal ? (
                    <div className="paypal">
                        <div className="amount-input">
                            <input
                                type="number"
                                placeholder="Enter amount to top up"
                                value={topUpAmount}
                                onChange={(e) => {
                                    setTopUpAmount(e.target.value);
                                    console.log("Amount", topUpAmount); // Log to check the amount value
                                }}
                            />
                        </div>
                        <PayPalButton topUpAmount={topUpAmount} />
                    </div>
                ) : null}
            </div>
            <div className="wallet-history">
                <h2>Wallet History</h2>
                <div className="history">
                    <div className="row title-row">
                        <div className="column transaction-type">
                            <p>Transaction Type</p>
                        </div>
                        <div className="column amount">
                            <p>Amount</p>
                        </div>
                        <div className="column status">
                            <p>Status</p>
                        </div>
                        <div className="column created-at">
                            <p>Created at</p>
                        </div>
                    </div>
                    {transactions.map((transaction) => {
                        return (
                            <div className="row">
                                <div className="column transaction-type">
                                    <p>{transaction.transaction_type}</p>
                                </div>
                                <div className="column amount">
                                    <p>{transaction.amount}</p>
                                </div>
                                <div className="column status">
                                    <p>{transaction.status}</p>
                                </div>
                                <div className="column created-at">
                                    <p>{transaction.created_at.split("T")[0]}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
