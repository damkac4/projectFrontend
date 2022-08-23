import React, {useEffect, useState} from "react";
import {Multiselect} from "multiselect-react-dropdown";
import axios from "axios";
import Card from "./Card";


export default function Content(){

    const years = []
    for(let i = 1970;i < 2023;i++) years.push(i)
    const prices = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000,
        50000, 65000, 80000, 100000, 200000, 500000, 1000000]


    const [dataCar, setdataCar] = useState([])

    const cards = dataCar.map(item =>{
        return (<Card
            key = {item.id}
            id = {item.id}
            nadwozie = {item.nadwozie}
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
        przebiegDo:1000000
    })



    useEffect(function () {
        axios.post("http://localhost:8080/s", formData)
            .then(data => setdataCar(data.data))
    },[formData]);



    const [dataNadwozie, setdataNadwozie] = useState([])

    useEffect(function () {
        axios.get("http://localhost:8080/n")
            .then(data => setdataNadwozie(data.data))},[]);


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
            singleSelect={true}

        />
        <Multiselect
            displayValue="nazwa"
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
            singleSelect={true}
            showCheckbox
            placeholder="Marka pojazdu"
        />

        <Multiselect
            displayValue="nazwa"
            onRemove={function noRefCheck(e){
                setdataModelSelected(e);
                setFormData(prevState =>({
                    ...prevState,
                    model: null,
                    generacja: null
                }) )
                setIsDisabledGeneracja(true)

            }}
            onSelect={function noRefCheck(e){
                setdataModelSelected(e);
                setFormData(prevState =>({
                    ...prevState,
                    model: e[0]
                }) )
                setIsDisabledGeneracja(false)
            }}
            options={dataModel}
            disable={isDisabledModel}
            singleSelect={true}
            placeholder="Model pojazdu"
        />
        <Multiselect
            displayValue="nazwa"
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    generacja: null
                }) )
            }}
            onSelect={function noRefCheck(e){
                setFormData(prevState =>({
                    ...prevState,
                    generacja:e[0]
                }) )

            }}
            options={dataGeneracja}
            disable={isDisabledGeneracja}
            showCheckbox
            singleSelect={true}
            placeholder="Generacja"
        />
        <Multiselect
            isObject={false}

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
            singleSelect={true}
        />
        <Multiselect
            isObject={false}
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
            singleSelect={true}
        />

        <Multiselect
            isObject={false}
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
            singleSelect={true}
        />
        <Multiselect
            isObject={false}
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
            singleSelect={true}
        />

        <Multiselect
            displayValue="rodzaj"
            onRemove={function noRefCheck(){
                setFormData(prevState =>({
                    ...prevState,
                    paliwo: null
                }) )
            }}
            onSelect={function noRefCheck(e){
                console.log(e[0])
                setFormData(prevState =>({
                    ...prevState,
                    paliwo: e[0]
                }) )
            }}
            options={dataPaliwo}
            placeholder="Rodzaj paliwa"
            singleSelect={true}
        />

        <Multiselect
            isObject={false}
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
            options={["1","2","3"]}
            placeholder="Przebieg od"
            singleSelect={true}

        />
        <Multiselect
            isObject={false}
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
            options={["1","2","3"]}
            placeholder="Przebieg do"
            singleSelect={true}

        />
    </form>
        <p className="amount-cards">Znaleziono - {dataCar.length}</p>
        <section className="car-list">
            {cards}
        </section>
    </div>

)
}