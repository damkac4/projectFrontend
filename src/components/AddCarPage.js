
import React, {useState} from "react";
import axios from "axios";

export default function AddCarPage(){

    const [files, setfiles] = useState([])
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

    function onFileChangeHandler(e) {
        const name = e.target.name
        e.preventDefault();
        if (name == 'zdjecie1') {
            setfiles(prevState =>({
                ...prevState,
                image1: e.target.files[0]
            }));
        }
        if (name == 'zdjecie2') {
            setfiles(prevState =>({
                ...prevState,
                image2: e.target.files[0]
            }));
        }
        if (name == 'zdjecie3') {
            setfiles(prevState =>({
                ...prevState,
                image3: e.target.files[0]
            }));
        }
        if (name == 'zdjecie4') {
            setfiles(prevState =>({
                ...prevState,
                image4: e.target.files[0]
            }));
        }
        if (name == 'zdjecie5') {
            setfiles(prevState =>({
                ...prevState,
                image5: e.target.files[0]
            }));
        }
        if (name == 'zdjecie6') {
            setfiles(prevState =>({
                ...prevState,
                image6: e.target.files[0]
            }));
        }
    }
    function onClickHandler(){
        const formData = new FormData();
        formData.append('images', files.image1);
        formData.append('images', files.image2);
        formData.append('images', files.image3);
        formData.append('images', files.image4);
        formData.append('images', files.image5);
        formData.append('images', files.image6);
        axios.post("http://localhost:8080/upload", formData)
            .then(res => {
                console.log(res.data);
                alert("File uploaded successfully.")
            })}

    return(
        <div>
            <form >
                <div>

                    <input type="file" name="zdjecie1" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input type="file" name="zdjecie2" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input type="file" name="zdjecie3" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input type="file" name="zdjecie4" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input type="file" name="zdjecie5" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <input type="file" name="zdjecie6" accept="image/png, image/jpeg" onChange={onFileChangeHandler}/>
                    <button type="submit" onClick={onClickHandler}>Upload</button>
                </div>
            </form>
        </div>
    )



}