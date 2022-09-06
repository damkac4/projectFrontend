import {Link, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";

export default function DeleteCarPage(){


    let params = useParams();
    useEffect(function () {
        axios.post(`http://localhost:8080/delete?id=${params.carId}`)
            .then()
    },[]);
    return(
        <div className="addedCar">
            <h1>Ogłoszenie zostało usunięte!</h1>
            <div>
                <Link to={"/"} className="text-link">
                    <button className="addcar-button" >Strona główna</button>
                </Link>
            </div>
        </div>
    )

}