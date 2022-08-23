
import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
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

    const [dataCar, setdataCar] = useState({ nadwozie:null,
        cena: 0,
        generacja: {id: 0, nazwa: ''},
        id: 0,
        marka: {id: 0, nazwa: ''},
        miejscowosc: "",
        model: {id: 0, nazwa: ''},
        nadwozie: {id: 0, typ: ''},
        paliwo: {id: 0, rodzaj: ''},
        pojemnosc: 0,
        przebieg: 0,
        rok: 0,
    })

    let params = useParams();
    useEffect(function () {
        axios.post(`http://localhost:8080/sid?id=${params.carId}`)
            .then(data => setdataCar(data.data))
    },[]);

    console.log(dataCar)
    function data(dataCar){
        if(dataCar){
            return JSON.parse(JSON.stringify(dataCar.marka.nazwa))
        }
    }
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
            <div className="upper-data">
                <p>DANE</p>
                <p>DANE</p>
                <p>DANE</p>
                <p>DANE</p>
                <p>DANE</p>
                <p>DANE</p>
                <p>DANE</p>
            </div>
        </div>

            <hr/>
            <h1 className="lower-h1">Szczegóły</h1>
        <div className="lower">
            <div className="lower-data">
                <div className="lower-left">
                    <p>Przebieg:{ JSON.parse(JSON.stringify(dataCar.przebieg))}</p>
                    <p>Generacja:{ JSON.parse(JSON.stringify(dataCar.generacja.nazwa))}</p>
                    <p>Marka:{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))}</p>
                    <p>Miejscowość:{ JSON.parse(JSON.stringify(dataCar.miejscowosc))}</p>
                    <p>Model:{ JSON.parse(JSON.stringify(dataCar.model.nazwa))}</p>

                </div>

                <div className="lower-right">

                    <p>Nadwozie:{JSON.parse(JSON.stringify(dataCar.nadwozie.typ))}</p>
                    <p>Rodzaj paliwa:{JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</p>
                    <p>Pojemność:{JSON.parse(JSON.stringify(dataCar.pojemnosc))}</p>
                    <p>Przebieg:{JSON.parse(JSON.stringify(dataCar.przebieg))}</p>
                    <p>Rok produkcji:{JSON.parse(JSON.stringify(dataCar.rok))}</p>
                </div>
        </div>
        </div>
        </div>
    )

}