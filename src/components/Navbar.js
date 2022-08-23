import React from "react";
import logo from "../images/logo.png"
import { Link } from "react-router-dom";
export default function Navbar(){


    return(
        <nav>
            <div className="nav-left">
            <img src ={logo} className="nav-logo"/>
            <Link to="/" className="text-link">
            <span>CarHub</span>
            </Link>
            </div>
            <div className="nav-right">
            <Link style={{ textDecoration: 'none' }} to="/dashboard">
                <button className="nav-button" type="button">
                   Dodaj ogłoszenie
                </button>
            </Link>
            </div>
        </nav>
    )



}