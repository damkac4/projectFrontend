
import {useParams} from "react-router-dom";
import navlogo from "../images/nav.png"
import phone from "../images/phone.png"
import email from "../images/email.png"
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

            <span className="span-dodano">Dodano: {(JSON.parse(JSON.stringify(dataCar.godzina))).toString().slice(0, 5)}, {JSON.parse(JSON.stringify(dataCar.data))} ⠀ ID: {JSON.parse(JSON.stringify(dataCar.id))}
            </span>
            <span> </span>
        </div>
            <div className="upper-data-upper">
                <div>
                <h1>{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))} { JSON.parse(JSON.stringify(dataCar.model.nazwa))}</h1>
                    <p className="upper-details"> {JSON.parse(JSON.stringify(dataCar.rok))} • { (JSON.parse(JSON.stringify(dataCar.przebieg))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km • {JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))} • {JSON.parse(JSON.stringify(dataCar.nadwozie.typ))} </p>

                </div>
                <h1 className="cena">{ (JSON.parse(JSON.stringify(dataCar.cena))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} PLN</h1>
                <hr />
                <div className="upper-data-lower">
                    <div className="person">
                    <h2>{JSON.parse(JSON.stringify(dataCar.wlasciciel.imie))}</h2>
                    </div>
                    <div className="email">
                        <img src={email} width="30px"/><p>⠀{JSON.parse(JSON.stringify(dataCar.wlasciciel.mail))}</p>
                    </div>

                    <div className="phone">
                    <img src={phone} width="30px"/>⠀{(JSON.parse(JSON.stringify(dataCar.wlasciciel.telefon))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </div>

                    <div className="tag">
                        ‏‏‎ ‎‏‏‎ <img src={navlogo} width="25px"/>
                    <p> ‏‏‎ ‎‏‏‎ ‎{ JSON.parse(JSON.stringify(dataCar.wlasciciel.miejscowosc))}, { JSON.parse(JSON.stringify(dataCar.wlasciciel.wojewodztwo))}</p>
                    </div>


                </div>

            </div>
        </div>



            <hr className="hr-lower"/>
            <h1 className="lower-h1">Szczegóły</h1>
        <div className="lower">


            <div className="lower-data">

                <p>Nadwozie: <span className="span-lower">{JSON.parse(JSON.stringify(dataCar.nadwozie.typ))}</span></p>
                    <p>Kraj pochodzenia:<span className="span-lower"> { JSON.parse(JSON.stringify(dataCar.marka.kraj))}</span>  </p>
                    <p>Bezwypadkowy: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.bezwypadkowy))}</span></p>
                    <p>Skrzynia biegów: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.skrzynia))}</span></p>


                    <p>Marka: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.marka.nazwa))}</span></p>
                    <p>Kolor: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.kolor))}</span></p>
                    <p>Moc: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.moc))} KM</span></p>
                    <p>Spalanie: <span className="span-lower">{ JSON.parse(JSON.stringify(dataCar.spalanie))} l/100km</span></p>




                    <p>Model:<span className="span-lower"> { JSON.parse(JSON.stringify(dataCar.model.nazwa))}</span></p>
                    <p>Przebieg: <span className="span-lower">{ (JSON.parse(JSON.stringify(dataCar.przebieg))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km</span></p>
                    <p>Pojemność: <span className="span-lower">{JSON.parse(JSON.stringify(dataCar.pojemnosc))} cm3</span></p>
                    <p>Stan: <span className="span-lower">{JSON.parse(JSON.stringify(dataCar.stan))}</span></p>



                    <p>Generacja:<span className="span-lower"> { JSON.parse(JSON.stringify(dataCar.generacja.nazwa))}</span></p>
                    <p>Rodzaj paliwa:<span className="span-lower"> {JSON.parse(JSON.stringify(dataCar.paliwo.rodzaj))}</span></p>
                    <p>Rok produkcji:<span className="span-lower"> {JSON.parse(JSON.stringify(dataCar.rok))}</span></p>
                    <p>Napęd: <span className="span-lower">{JSON.parse(JSON.stringify(dataCar.naped))}</span></p>


        </div>
        </div>
        </div>
    )

}