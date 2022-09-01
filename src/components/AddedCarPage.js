
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
export default function AddedCarPage(){

    let params = useParams();

    return(
        <div className="addedCar">
            <h1>Ogłoszenie zostało dodane!</h1>
            <div>
            <Link to={"/"} className="text-link">
            <button className="addcar-button" >Strona główna</button>
            </Link>
        <Link to={`/${params.carId}`} className="text-link">
            <button className="addcar-button" >Pokaż ogłoszenie</button>
        </Link>
            </div>

        </div>
    )
}