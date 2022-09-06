import React, {useEffect, useState} from "react";
import {Multiselect} from "multiselect-react-dropdown";
import axios from "axios";
import MainPageCardCar from "./MainPageCardCar";


export default function MainPage(){

    const years = []
    for(let i = 1970;i < 2023;i++) years.push(i)
    const prices = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000,
        50000, 65000, 80000, 100000, 200000, 500000, 1000000]
    const kms = [20000, 35000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000 ]
    const sortOptions = ["Najnowsze", "Cena: od najniższej", "Cena: od najwyższej", "Przebieg: od najniższego", "Przebieg: od najwyższego"]

    const [dataCar, setdataCar] = useState([])
    const [pages, setPages] = useState([])
    const [pageSelected, setPageSelected] = useState(["1"])

    const cards = dataCar.map(item =>{
        return (<MainPageCardCar
            key = {item.id}
            id = {item.id}
            wlasciciel = {item.wlasciciel}
            marka = {item.marka}
            model = {item.model}
            generacja = {item.generacja}
            rok = {item.rok}
            przebieg = {item.przebieg}
            paliwo = {item.paliwo}
            pojemnosc = {item.pojemnosc}
            cena = {item.cena}
        />)})



    const [formData, setFormData] = useState({
        nadwozie:null,
        marka:null,
        model:null,
        generacja:null,
        cenaOd:0,
        cenaDo:10000000,
        rokOd:0,
        rokDo:2022,
        paliwo:null,
        przebiegOd:0,
        przebiegDo:1000000,
        sort:"Najnowsze"
    })

    useEffect(function () {
        axios.post("http://localhost:8080/s", formData)
            .then(data => {
                if(formData.sort === "Najnowsze") setdataCar(data.data.sort((a, b) => b.id - a.id))
                else if(formData.sort === "Cena: od najniższej") setdataCar(data.data.sort((a, b) => a.cena - b.cena))
                else if(formData.sort === "Cena: od najwyższej") setdataCar(data.data.sort((a, b) => b.cena - a.cena))
                else if(formData.sort === "Przebieg: od najniższego") setdataCar(data.data.sort((a, b) => a.przebieg - b.przebieg))
                else if(formData.sort === "Przebieg: od najwyższego") setdataCar(data.data.sort((a, b) => b.przebieg - a.przebieg))

                const page = [];
                for(let i = 1; i<=Math.ceil(data.data.length / 10); i++){
                    page.push(i)
                }
                setPages(page)
                setPageSelected("1")

            })
    },[formData]);



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

return(
    <div className="div-form">
    <form className="form">
        <Multiselect
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            displayValue="typ"
            onRemove={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    nadwozie: null

                }) )
            }}
            onSelect={function handleSelect(e){

                setFormData(prevState =>({
                    ...prevState,
                    nadwozie: e[0]
                }) )


            }}
            options={dataNadwozie}
            placeholder="Typ nadwozia"

        />
        <Multiselect
            displayValue="nazwa"
            singleSelect={true}
            onRemove={function noRefCheck(e){
                setdataMarkaSelected(e)
                setFormData(prevState =>({
                    ...prevState,
                    marka: null,
                    model: null,
                    generacja: null
                }) )
                setIsDisabledModel(true)
                setIsDisabledGeneracja(true)
            }}
            onSelect={function noRefCheck(e){
                setdataMarkaSelected(e)
                setFormData(prevState =>({
                    ...prevState,
                    marka: e[0]
                }) )
                setIsDisabledModel(false)
            }
            }
            options={dataMarka}
            disable={isDisabledMarka}
            placeholder="Marka pojazdu"
        />

        <Multiselect
            displayValue="nazwa"
            singleSelect={true}
            onRemove={function noRefCheck(e){
                setdataModelSelected(e);
                setIsDisabledMarka(false);
                setFormData(prevState =>({
                    ...prevState,
                    model: null,
                    generacja: null
                }) )
                setIsDisabledGeneracja(true)

            }}
            onSelect={function noRefCheck(e){
                setdataModelSelected(e);
                setIsDisabledMarka(true);
                setFormData(prevState =>({
                    ...prevState,
                    model: e[0]
                }) )
                setIsDisabledGeneracja(false)
            }}
            options={dataModel}
            disable={isDisabledModel}
            placeholder="Model pojazdu"
        />
        <Multiselect
            displayValue="nazwa"
            singleSelect={true}
            onRemove={function noRefCheck(){
                setIsDisabledModel(false)
                setFormData(prevState =>({
                    ...prevState,
                    generacja: null
                }) )
            }}
            onSelect={function noRefCheck(e){
                setIsDisabledModel(true)
                setFormData(prevState =>({
                    ...prevState,
                    generacja:e[0]
                }) )

            }}
            options={dataGeneracja}
            disable={isDisabledGeneracja}
            placeholder="Generacja"
        />
        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    cenaOd: 0
                }))
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    cenaOd: parseInt(e)
                }))
            }}
            options={prices}
            placeholder="Cena od"
        />
        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                }
            }}
            onRemove={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    cenaDo: 10000000
                }))}}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                ...prevState,
                cenaDo: parseInt(e)
            }))}}
            options={prices}
            placeholder="Cena do"
        />

        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(e){
                setFormData(prevState =>({
                ...prevState,
                rokOd: 0
            }))}}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                ...prevState,
                    rokOd: parseInt(e)
            }))}}
            options={years}
            placeholder="Rok produkcji od"
        />
        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    rokDo: 2022
                }))
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    rokDo: parseInt(e)
                }))
            }}
            options={years}
            placeholder="Rok produkcji do"

        />

        <Multiselect
            displayValue="rodzaj"
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    paliwo: null
                }) )
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    paliwo: e[0]
                }) )
            }}
            options={dataPaliwo}
            placeholder="Rodzaj paliwa"

        />

        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    przebiegOd: 0
                }))
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    przebiegOd: parseInt(e)
                }))
            }}
            options={kms}
            placeholder="Przebieg od"


        />
        <Multiselect
            isObject={false}
            selectionLimit={1}
            style={{
                chips: {
                    background: 'black'
                },
            }}
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    przebiegDo: 1000000
                }))
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    przebiegDo: parseInt(e)
                }))

            }}
            options={kms}
            placeholder="Przebieg do"


        />
    </form>
        <div className="div-form-sort">
        <Multiselect

            customCloseIcon={<>🍑</>}
            isObject={false}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    sort: e[0]
                }))
            }}
            selectedValues={["Najnowsze"]}
            options={sortOptions}
            singleSelect={true}

        />
        </div>
        <h3 className="amount-cards">Znaleziono - {dataCar.length}</h3>
        <section className="car-list">
            {cards.slice((pageSelected-1)*10, (pageSelected*10))}

        </section>

        <div className="strona">
            <p >Strona {pageSelected}</p>
            <div className="strona-select">
            <Multiselect
                customCloseIcon={<>🍑</>}
                isObject={false}
                onSelect={function noRefCheck(e){
                    setPageSelected(e[0])
                    window.scrollTo(0, 0)
                }}
                selectedValues={pageSelected}
                options={pages}
                singleSelect={true}
            />
            </div>
        </div>
    </div>

)
}