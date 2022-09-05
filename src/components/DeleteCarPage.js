import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function DeleteCarPage(){


    let params = useParams();
    useEffect(function () {
        axios.post(`http://localhost:8080/delete?id=${params.carId}`)
            .then(
                alert("File deleted successfully.")
            )
    },[]);


}