import { Link } from "react-router-dom";
import navlogo from "../images/nav.png"
export default function CardCar(props){

    return(
        <Link to={`/${props.id}`} target="_blank" rel="noopener noreferrer" className="text-link">
        <div className="card">
            <img src={require(`../images/ogloszenia/${props.id}/1.png`)}className="card-image"/>
            <div className="card-description">


                <h1>{props.marka.nazwa} {props.model.nazwa} {(props.generacja.nazwa).split('(')[0]}</h1>
                <h1 className="cena">{(props.cena).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} PLN</h1>
                <p> {props.rok} • {(props.przebieg).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km • {props.pojemnosc} cm3 • {props.paliwo.rodzaj}</p>

                <img src={navlogo} width="20px"/>
                <span> {props.wlasciciel.miejscowosc} ({props.wlasciciel.wojewodztwo})</span>


            </div>
        </div>
        </Link>
    )
}