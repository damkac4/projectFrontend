import React from "react";
import {Route, Routes} from "react-router-dom";

import Content from "./components/Content"
import Car from "./components/CarPage"


export default function Main(){

    return (
        <Routes> {/* The Routes decide which component to show based on the current URL.*/}
            <Route exact path='/' element={<Content/>}/>
            <Route exact path='/:carId'  element={<Car/>}/>
        </Routes>
    );
}

