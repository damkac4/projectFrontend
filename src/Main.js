import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage"
import Car from "./components/CarPage"
import AddCar from "./components/AddCarPage"


export default function Main(){

    return (
        <Routes> {/* The Routes decide which component to show based on the current URL.*/}
            <Route exact path='/' element={<MainPage/>}/>
            <Route exact path='/:carId'  element={<Car/>}/>
            <Route exact path='/add'  element={<AddCar/>}/>
        </Routes>
    );
}

