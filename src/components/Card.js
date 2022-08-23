import { Link } from "react-router-dom";
export default function Card(props){

    return(
        <Link to={`/${props.id}`} target="_blank" rel="noopener noreferrer" className="text-link">
        <div className="card">
            <img src={require(`../images/ogloszenia/${props.id}/1.png`)}className="card-image"/>
            <div className="card-description">
                <p>Nadwozie: {props.nadwozie.typ}</p>
                <p>Rok produkcji: {props.rok}</p>
                <p>Model: {props.model.nazwa}</p>
                <p>Marka: {props.marka.nazwa}</p>
                <p>Generacja: {props.generacja.nazwa}</p>
                <p>Cena: {props.cena}</p>
                <p>Paliwo: {props.paliwo.rodzaj}</p>
                {/*<p>Pojemność: {props.pojemnosc}</p>*/}
            </div>
        </div>
        </Link>
    )
}