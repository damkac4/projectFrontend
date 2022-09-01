import { Link } from "react-router-dom";
import React from "react";
export default function AddCarPageAdded(props){

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