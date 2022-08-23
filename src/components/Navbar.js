import React from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
export default function Navbar(){


    return(
        <nav>
            <img src ={logo} className="nav-logo"/>
            <Link to="/" className="text-link">
            <span>CarHub</span>
            </Link>
        </nav>
    )



}