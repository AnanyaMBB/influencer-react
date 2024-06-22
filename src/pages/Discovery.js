import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Discovery() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn) {
            navigate("/login");
        }
    }, []);
    
    return (
        <>
            <p>Discovery</p>

        </>
        
    );
}