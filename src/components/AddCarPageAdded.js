import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
export default function AddCarPageAdded(props){

    useEffect(function () {
        axios.post(`http://localhost:8080/mail?id=${props.id}&imie=${props.imie}&mail=${props.mail}`)
            .then()},[props.id]);


    return(
        <div className="addedCar">
            <h1>Ogłoszenie zostało dodane!</h1>
            <div>
            <Link to={"/"} className="text-link">
            <button className="addcar-button" >Strona główna</button>
            </Link>
        <Link to={`/${props.id}`} className="text-link">
            <button className="addcar-button" >Pokaż ogłoszenie</button>
        </Link>
            </div>
        </div>
    )
}