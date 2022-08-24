
import {useParams} from "react-router-dom";
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
        miejscowosc: "",
        model: {id: 0, nazwa: ''},
        nadwozie: {id: 0, typ: ''},
        paliwo: {id: 0, rodzaj: ''},
        pojemnosc: 0,
        przebieg: 0,
        rok: 0,
        wlasciciel: {id:0, mail:'', telefon:'', imie:''},
        moc:0,
        kolor:'',
        stan:'',
        spalanie:0
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

        </div>
            <div className="upper-data-upper">
                <div>
                <h2>{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))} { JSON.parse(JSON.stringify(dataCar.model.nazwa))}</h2>
                <ul>
                    <li>{JSON.parse(JSON.stringify(dataCar.rok))}</li>
                    <li>{ JSON.parse(JSON.stringify(dataCar.przebieg))} km</li>
                    <li>{JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</li>
                    <li>{JSON.parse(JSON.stringify(dataCar.nadwozie.typ))}</li>
                </ul>
                </div>
                <h1>{ JSON.parse(JSON.stringify(dataCar.cena))} zł</h1>
                <hr />
                <div className="upper-data-lower">
                    <p>{JSON.parse(JSON.stringify(dataCar.wlasciciel.imie))}</p>
                    <p>{JSON.parse(JSON.stringify(dataCar.wlasciciel.mail))}</p>
                    <p>{JSON.parse(JSON.stringify(dataCar.wlasciciel.telefon))}</p>
                    <p>{ JSON.parse(JSON.stringify(dataCar.miejscowosc))}</p>
                </div>
            </div>
        </div>



            <hr className="hr-lower"/>
            <h1 className="lower-h1">Szczegóły</h1>
        <div className="lower">


            <div className="lower-data">
                <div>

                    <p>Generacja:{ JSON.parse(JSON.stringify(dataCar.generacja.nazwa))}</p>
                    <p>Marka:{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))}</p>
                    <p>Nadwozie:{JSON.parse(JSON.stringify(dataCar.nadwozie.typ))}</p>
                    <p>Model:{ JSON.parse(JSON.stringify(dataCar.model.nazwa))}</p>
                </div>
                <div>
                    <p>Kolor: { JSON.parse(JSON.stringify(dataCar.kolor))}</p>
                    <p>Moc: { JSON.parse(JSON.stringify(dataCar.moc))} KM</p>
                    <p>Paliwo: {JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</p>
                    <p>Spalanie:{ JSON.parse(JSON.stringify(dataCar.spalanie))}l/100km</p>

                </div>
                <div>
                    <p>Przebieg:{ JSON.parse(JSON.stringify(dataCar.przebieg))}</p>
                    <p>Generacja:{ JSON.parse(JSON.stringify(dataCar.generacja.nazwa))}</p>
                    <p>Pojemność:{JSON.parse(JSON.stringify(dataCar.pojemnosc))}</p>
                    <p>Stan: {JSON.parse(JSON.stringify(dataCar.stan))}</p>

                </div>

                <div >
                    <p>Kraj pochodzenia:{ JSON.parse(JSON.stringify(dataCar.marka.kraj))}  </p>
                    <p>Rodzaj paliwa:{JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</p>
                    <p>Przebieg:{ JSON.parse(JSON.stringify(dataCar.przebieg))}</p>
                    <p>Rok produkcji: {JSON.parse(JSON.stringify(dataCar.rok))}</p>

                </div>
        </div>
        </div>
        </div>
    )

}