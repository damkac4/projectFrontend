import React, {useEffect, useState} from "react";
import axios from "axios";
import {Multiselect} from "multiselect-react-dropdown";
import AddCarPageAdded from "./AddCarPageAdded";

export default function AddCarPage(){

    const [files, setfiles] = useState([])
    const [added, setAdded] = useState(false)
    const [DataCar, setDataCar] = useState({
        cena: 0,
        id:0,
        generacja: {id: 1, nazwa: ''},
        marka: {id: 1, nazwa: '', kraj:''},
        model: {id: 1, nazwa: ''},
        nadwozie: {id: 1, typ: ''},
        paliwo: {id: 1, rodzaj: ''},
        pojemnosc: 0,
        przebieg: 0,
        rok: 0,
        wlasciciel: {id:0, mail:'', telefon:'', imie:'', miejscowosc: '', wojewodztwo: ''},
        moc:0,
        kolor:'',
        stan:'',
        skrzynia:'',
        spalanie:0,
        bezwypadkowy:'',
        naped:''
    })
    const [dataNadwozie, setdataNadwozie] = useState([])
    useEffect(function () {
        axios.get("http://localhost:8080/n")
            .then(data => setdataNadwozie(data.data))},[]);

    const [isDisabledMarka, setIsDisabledMarka] = useState(false);
    const [dataMarka, setdataMarka] = useState([])

    useEffect(function () {
        axios.get("http://localhost:8080/mr")
            .then(data => setdataMarka(data.data))},[]);


    const [dataPaliwo, setdataPaliwo] = useState([])
    useEffect(function () {
        axios.get("http://localhost:8080/p")
            .then(data => setdataPaliwo(data.data))},[]);

    const [isDisabledModel, setIsDisabledModel] = useState(true);
    const [dataMarkaSelected, setdataMarkaSelected] = useState([])
    const [dataModel, setdataModel] = useState([])
    useEffect(function () {
        axios.post("http://localhost:8080/m", dataMarkaSelected
        )
            .then(function (response) {
                setdataModel(response.data)
            })},[dataMarkaSelected]);

    const [isDisabledGeneracja, setIsDisabledGeneracja] = useState(true);
    const [dataModelSelected, setdataModelSelected] = useState([])
    const [dataGeneracja, setdataGeneracja] = useState([])
    useEffect(function () {
        axios.post("http://localhost:8080/g", dataModelSelected)
            .then(function (response) {
                setdataGeneracja(response.data)
            })},[dataModelSelected])


    function onFileChangeHandler(e) {
        const name = e.target.name

        if (name === 'zdjecie1') {
            setfiles(prevState =>({
                ...prevState,
                image1: e.target.files[0]
            }));
        }
        if (name === 'zdjecie2') {
            setfiles(prevState =>({
                ...prevState,
                image2: e.target.files[0]
            }));
        }
        if (name === 'zdjecie3') {
            setfiles(prevState =>({
                ...prevState,
                image3: e.target.files[0]
            }));
        }
        if (name === 'zdjecie4') {
            setfiles(prevState =>({
                ...prevState,
                image4: e.target.files[0]
            }));
        }
        if (name === 'zdjecie5') {
            setfiles(prevState =>({
                ...prevState,
                image5: e.target.files[0]
            }));
        }
        if (name === 'zdjecie6') {
            setfiles(prevState =>({
                ...prevState,
                image6: e.target.files[0]
            }));
        }
        if(name ==='przebieg'){
            setDataCar(prevState =>({
                ...prevState,
                przebieg: e.target.value
            }))
        }
        if(name ==='rok'){
            setDataCar(prevState =>({
                ...prevState,
                rok: e.target.value
            }))
        }
        if(name ==='pojemnosc'){
            setDataCar(prevState =>({
                ...prevState,
                pojemnosc: e.target.value
            }))
        }

        if(name ==='cena'){
            setDataCar(prevState =>({
                ...prevState,
                cena: e.target.value
            }))
        }
        if(name ==='moc'){
            setDataCar(prevState =>({
                ...prevState,
                moc: e.target.value
            }))
        }
        if(name ==='kolor'){
            setDataCar(prevState =>({
                ...prevState,
                kolor: e.target.value
            }))
        }
        if(name ==='spalanie'){
            setDataCar(prevState =>({
                ...prevState,
                spalanie: e.target.value
            }))
        }
        if(name ==='miejscowosc'){
            setDataCar(prevState =>({
                ...prevState,
                wlasciciel:{
                    wojewodztwo: prevState.wlasciciel.wojewodztwo,
                    miejscowosc: e.target.value,
                    telefon: prevState.wlasciciel.telefon,
                    mail: prevState.wlasciciel.mail,
                    imie: prevState.wlasciciel.imie}
            }))
        }
        if(name ==='wlasciciel'){
            setDataCar(prevState =>({
                ...prevState,
                wlasciciel:{
                    wojewodztwo: prevState.wlasciciel.wojewodztwo,
                    miejscowosc: prevState.wlasciciel.miejscowosc,
                    telefon: prevState.wlasciciel.telefon,
                    mail: prevState.wlasciciel.mail,
                    imie: e.target.value}
            }))
        }
        if(name ==='mail'){
            setDataCar(prevState =>({
                ...prevState,
                wlasciciel:{
                    wojewodztwo: prevState.wlasciciel.wojewodztwo,
                    miejscowosc: prevState.wlasciciel.miejscowosc,
                    imie:prevState.wlasciciel.imie,
                    telefon: prevState.wlasciciel.telefon,
                    mail: e.target.value}
            }))
        }
        if(name ==='telefon'){
            setDataCar(prevState =>({
                ...prevState,
                wlasciciel:{
                    wojewodztwo: prevState.wlasciciel.wojewodztwo,
                    miejscowosc: prevState.wlasciciel.miejscowosc,
                    imie:prevState.wlasciciel.imie,
                    mail:prevState.wlasciciel.mail,
                    telefon: e.target.value

                }
            }))
        }
    }
    const [pol, setpol] = useState("Wymagane wszystkie pola!");

    function disable(){
        if(files.image1 && files.image2 && files.image3 && files.image4 && files.image5 && files.image6
            && DataCar.przebieg && DataCar.rok && DataCar.pojemnosc &&  DataCar.cena
            && DataCar.moc && DataCar.kolor && DataCar.spalanie && DataCar.wlasciciel.imie && DataCar.wlasciciel.mail &&
            DataCar.wlasciciel.telefon && DataCar.wlasciciel.miejscowosc && DataCar.wlasciciel.wojewodztwo &&
            DataCar.stan && DataCar.marka.nazwa && DataCar.paliwo.rodzaj && DataCar.model.nazwa
            && DataCar.generacja.nazwa && DataCar.nadwozie.typ && DataCar.skrzynia && DataCar.bezwypadkowy && DataCar.naped) {
            if(pol==="Wymagane wszystkie pola!") setpol("")
            return false
        }
        else{
            if(pol==="")setpol("Wymagane wszystkie pola!");
            return true
        }
    }

    const [id, setid] = useState()
    function onClickHandler(){

        const formData = new FormData();
        formData.append('images', files.image1);
        formData.append('images', files.image2);
        formData.append('images', files.image3);
        formData.append('images', files.image4);
        formData.append('images', files.image5);
        formData.append('images', files.image6);
        formData.append('ogloszenie', JSON.stringify(DataCar))

        axios.post("http://localhost:8080/upload", formData)
            .then(res => {
                console.log(res.data);
                setid(res.data)
                alert("File uploaded successfully.")
            })
        setAdded(true);
    }


    if(added) {
        return <AddCarPageAdded
            id = {id}
        />
    }
    return(
        <div className="addcar">
            <form>
                <div>
                    <h2>Zdjęcia</h2>
                    <div className="addcar-photos">
                    <input className="input" type="file" name="zdjecie1" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input className="input" type="file" name="zdjecie2" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input className="input" type="file" name="zdjecie3" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input className="input" type="file" name="zdjecie4" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input className="input" type="file" name="zdjecie5" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input className="input" type="file" name="zdjecie6" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div>
                    <h2>Dane pojazdu</h2>
                    <div className="addcar-details">
                        <Multiselect
                            displayValue="typ"
                            onRemove={function noRefCheck(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    nadwozie: null}) )}}
                            onSelect={function handleSelect(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    nadwozie: e[0]}))}}
                            options={dataNadwozie}
                            placeholder="Typ nadwozia"
                            singleSelect={true}/>

                        <Multiselect
                            displayValue="nazwa"
                            onRemove={function noRefCheck(e){
                                setdataMarkaSelected(e)
                                setDataCar(prevState =>({
                                    ...prevState,
                                    marka: null,
                                    model: null,
                                    generacja: null}) )
                                setIsDisabledModel(true)
                                setIsDisabledGeneracja(true)}}
                            onSelect={function noRefCheck(e){
                                setdataMarkaSelected(e)
                                setDataCar(prevState =>({
                                    ...prevState,
                                    marka: e[0]}) )
                                setIsDisabledModel(false)}}
                            options={dataMarka}
                            singleSelect={true}
                            disable={isDisabledMarka}
                            showCheckbox
                            placeholder="Marka pojazdu"/>

                        <Multiselect
                            displayValue="nazwa"
                            onRemove={function noRefCheck(e){
                                setdataModelSelected(e);
                                setIsDisabledMarka(false);
                                setDataCar(prevState =>({
                                    ...prevState,
                                    model: null,
                                    generacja: null}) )
                                setIsDisabledGeneracja(true)}}
                            onSelect={function noRefCheck(e){
                                setdataModelSelected(e);
                                setIsDisabledMarka(true);
                                setDataCar(prevState =>({
                                    ...prevState,
                                    model: e[0]}))
                                setIsDisabledGeneracja(false)}}
                            options={dataModel}
                            disable={isDisabledModel}
                            singleSelect={true}
                            placeholder="Model pojazdu"/>

                        <Multiselect
                            displayValue="nazwa"
                            onRemove={function noRefCheck(){
                                setIsDisabledModel(false)
                                setDataCar(prevState =>({
                                    ...prevState,
                                    generacja: null}))}}
                            onSelect={function noRefCheck(e){
                                setIsDisabledModel(true)
                                setDataCar(prevState =>({
                                    ...prevState,
                                    generacja:e[0]
                                }) )}}
                            options={dataGeneracja}
                            disable={isDisabledGeneracja}
                            showCheckbox
                            singleSelect={true}
                            placeholder="Generacja"/>

                        <Multiselect
                            isObject={false}
                            onRemove={function noRefCheck(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    bezwypadkowy: null}) )}}
                            onSelect={function handleSelect(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    bezwypadkowy: e[0]}))}}
                            options={["Tak","Nie"]}
                            placeholder="Bezwypadkowy"
                            singleSelect={true}/>
                    <Multiselect
                        isObject={false}
                        onRemove={function noRefCheck(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                stan: null}) )}}
                        onSelect={function handleSelect(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                stan: e[0]}))}}
                        options={["Nowy","Używany","Uszkodzony"]}
                        placeholder="Stan"
                        singleSelect={true}/>

                    <Multiselect
                        isObject={false}
                        onRemove={function noRefCheck(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                kolor: null}) )}}
                        onSelect={function handleSelect(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                kolor: e[0]}))}}
                        options={["Biały","Czarny","Granatowy", "Czerwony", "Szary", "Srebrny"]}
                        placeholder="Kolor"
                        singleSelect={true}/>

                    <Multiselect
                        isObject={false}
                        onRemove={function noRefCheck(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                skrzynia: null}) )}}
                        onSelect={function handleSelect(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                skrzynia: e[0]}))}}
                        options={["Manualna","Automatyczna"]}
                        placeholder="Skrzynia biegów"
                        singleSelect={true}/>
                    <Multiselect
                        displayValue="rodzaj"
                        onRemove={function noRefCheck(){
                            setDataCar(prevState =>({
                                ...prevState,
                                paliwo: null}))}}
                        onSelect={function noRefCheck(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                paliwo: e[0]}))}}
                        options={dataPaliwo}
                        placeholder="Rodzaj paliwa"
                        singleSelect={true}/>

                        <Multiselect
                            isObject={false}
                            onRemove={function noRefCheck(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    naped: null}) )}}
                            onSelect={function handleSelect(e){
                                setDataCar(prevState =>({
                                    ...prevState,
                                    naped: e[0]}))}}
                            options={["Na przednie koła","Na tylne koła","4x4"]}
                            placeholder="Napęd"
                            singleSelect={true}/>

                        <input type="number" name="przebieg" placeholder="Przebieg"  size="10" onChange={onFileChangeHandler} />
                        <input type="number" name="rok" placeholder="Rok" size="10" onChange={onFileChangeHandler}/>
                        <input type="number" name="pojemnosc" placeholder="Pojemność [cm3]" size="10" onChange={onFileChangeHandler}/>
                        <input type="number" name="cena" placeholder="Cena" size="10" onChange={onFileChangeHandler}/>
                        <input type="number" name="moc" placeholder="Moc [KM]" size="10" onChange={onFileChangeHandler}/>
                        <input type="number" name="spalanie" placeholder="Spalanie [l/100km]" size="10" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div>
                    <h2>Dane właściciela</h2>
                <div className="addcar-owner">
                    <input type="text" name="wlasciciel" placeholder="Osoba kontaktowa" size="10" onChange={onFileChangeHandler}/>
                    <input type="text" name="mail" placeholder="Adres mail"  size="10" onChange={onFileChangeHandler}/>
                    <input type="number" name="telefon" placeholder="Telefon"  size="10" onChange={onFileChangeHandler}/>
                    <input type="text" name="miejscowosc" placeholder="Miejscowość" size="10" onChange={onFileChangeHandler}/>
                    <Multiselect
                        isObject={false}
                        onRemove={function noRefCheck(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                wlasciciel:{
                                    wojewodztwo: null,
                                    miejscowosc: prevState.wlasciciel.miejscowosc,
                                    telefon: prevState.wlasciciel.telefon,
                                    mail: prevState.wlasciciel.mail,
                                    imie: prevState.wlasciciel.imie}
                            }))}}
                        onSelect={function handleSelect(e){
                            setDataCar(prevState =>({
                                ...prevState,
                                wlasciciel:{
                                    wojewodztwo:e[0] ,
                                    miejscowosc: prevState.wlasciciel.miejscowosc,
                                    telefon: prevState.wlasciciel.telefon,
                                    mail: prevState.wlasciciel.mail,
                                    imie: prevState.wlasciciel.imie}
                            }))}}
                        options={["Dolnośląskie","Kujawsko-pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                            "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                            "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie"]}
                        placeholder="Województwo"
                        singleSelect={true}/>
                </div>
                </div>
                    <button type="submit " className="addcar-button" disabled={disable()} onClick={onClickHandler}>Dodaj ogłoszenie</button>
                <span className="span">{pol}</span>
            </form>
        </div>
    )
}