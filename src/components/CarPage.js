
import {useParams} from "react-router-dom";
import navlogo from "../images/nav.png"
import React, {useEffect, useState} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
// import required modules
import {FreeMode, Pagination, Navigation, Thumbs } from "swiper";
import axios from "axios";


export default function CarPage(){

    const [dataCar, setdataCar] = useState({
        cena: 0,
        generacja: {id: 0, nazwa: ''},
        id: 0,
        marka: {id: 0, nazwa: '', kraj:''},
        model: {id: 0, nazwa: ''},
        nadwozie: {id: 0, typ: ''},
        paliwo: {id: 0, rodzaj: ''},
        pojemnosc: 0,
        przebieg: 0,
        rok: 0,
        wlasciciel: {id:0, mail:'', telefon:'', imie:'',miejscowosc:'', wojewodztwo:''},
        moc:0,
        kolor:'',
        stan:'',
        skrzynia:'',
        spalanie:0,
        bezwypadkowy:'',
        data:'',
        godzina:'',
        naped:''
    })

    let params = useParams();
    useEffect(function () {
        axios.post(`http://localhost:8080/sid?id=${params.carId}`)
            .then(data => setdataCar(data.data))
    },[]);


    const images = []
    for (let i = 1; i<=6;i++){
        images.push(
        <SwiperSlide key ={`slide-${i}`}>
            <img src={require(`../images/ogloszenia/${params.carId}/${i}.png`)} />
        </SwiperSlide>
        )
    }

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const thumbImages = []
    for (let i = 1; i<=6;i++){
        thumbImages.push(
            <SwiperSlide key ={`slide-${i}`}>
                <img src={require(`../images/ogloszenia/${params.carId}/${i}.png`)} />
            </SwiperSlide>
        )
    }
    return (
        <div >
            <h1 className="upper-h1">Ogłoszenie</h1>
        <div className="upper">

        <div className="swipers">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs,Pagination]}
                className="mySwiper2">{images}</Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper">{thumbImages}</Swiper>

            <span className="span-dodano">Dodano: {JSON.parse(JSON.stringify(dataCar.godzina))}, {JSON.parse(JSON.stringify(dataCar.data))}  ID:
                {JSON.parse(JSON.stringify(dataCar.id))}
            </span>
            <span> </span>
        </div>
            <div className="upper-data-upper">
                <div>
                <h1>{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))} { JSON.parse(JSON.stringify(dataCar.model.nazwa))}</h1>
                    <p> {JSON.parse(JSON.stringify(dataCar.rok))} • { JSON.parse(JSON.stringify(dataCar.przebieg))} km • {JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))} • {JSON.parse(JSON.stringify(dataCar.nadwozie.typ))} </p>

                </div>
                <h1 className="cena">{ JSON.parse(JSON.stringify(dataCar.cena))} PLN</h1>
                <hr />
                <div className="upper-data-lower">
                    <h2>{JSON.parse(JSON.stringify(dataCar.wlasciciel.imie))}</h2>
                    <p>{JSON.parse(JSON.stringify(dataCar.wlasciciel.mail))}</p>
                    <p>{JSON.parse(JSON.stringify(dataCar.wlasciciel.telefon))}</p>
                    <img src={navlogo} width="20px"/>
                    <span> { JSON.parse(JSON.stringify(dataCar.wlasciciel.miejscowosc))}, { JSON.parse(JSON.stringify(dataCar.wlasciciel.wojewodztwo))}</span>
                    <p></p>
                </div>

            </div>
        </div>



            <hr className="hr-lower"/>
            <h1 className="lower-h1">Szczegóły</h1>
        <div className="lower">


            <div className="lower-data">

                    <p>Nadwozie: {JSON.parse(JSON.stringify(dataCar.nadwozie.typ))}</p>
                    <p>Kraj pochodzenia: { JSON.parse(JSON.stringify(dataCar.marka.kraj))}  </p>
                    <p>Bezwypadkowy: { JSON.parse(JSON.stringify(dataCar.bezwypadkowy))}</p>
                    <p>Skrzynia biegów: { JSON.parse(JSON.stringify(dataCar.skrzynia))}</p>


                    <p>Marka: { JSON.parse(JSON.stringify(dataCar.marka.nazwa))}</p>
                    <p>Kolor: { JSON.parse(JSON.stringify(dataCar.kolor))}</p>
                    <p>Moc: { JSON.parse(JSON.stringify(dataCar.moc))} KM</p>
                    <p>Spalanie: { JSON.parse(JSON.stringify(dataCar.spalanie))} l/100km</p>




                    <p>Model: { JSON.parse(JSON.stringify(dataCar.model.nazwa))}</p>
                    <p>Przebieg: { JSON.parse(JSON.stringify(dataCar.przebieg))} km</p>
                    <p>Pojemność: {JSON.parse(JSON.stringify(dataCar.pojemnosc))} cm3</p>
                    <p>Stan: {JSON.parse(JSON.stringify(dataCar.stan))}</p>



                    <p>Generacja: { JSON.parse(JSON.stringify(dataCar.generacja.nazwa))}</p>
                    <p>Rodzaj paliwa: {JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</p>
                    <p>Rok produkcji: {JSON.parse(JSON.stringify(dataCar.rok))}</p>
                    <p>Napęd: {JSON.parse(JSON.stringify(dataCar.naped))}</p>


        </div>
        </div>
        </div>
    )

}