import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Error from "../../components/Error/Error.jsx";
import style from "./Detail.module.css";


const Detail = (props) => {

    const {id} = useParams();

    const [driverDetail, getDriver] = useState({});
    const [isValidID, setIsValidID] = useState(true);

    useEffect(()=> {
        const fetchDriver = async ()=> {
            try {
                const driver = (await axios.get(`http://localhost:3001/drivers/${id}`))
                .data;
                if (driver.name) {
                    console.log(driver);
                    getDriver(driver);
                    setIsValidID(true);
                } else {
                    setIsValidID(false);
                }
            } catch (error) {
                setIsValidID(false);
                console.error('Error al obtener el driver:', error);
            }
        };

        fetchDriver();
    },[id]);

    if (!isValidID) {
        return (
            <div><Error/></div>
        )
    }



    return(
        <div className={style.details}>
        
            <div>
                <h1>{driverDetail.name + ' ' + driverDetail.surname}</h1>
            </div>

            <div className={style.container}>
                <div className={style.infoContainer}>

                    <div className={style.imageContainer} >
                        <img src={driverDetail.image} alt={driverDetail.name} />
                    </div>
                    <article>
                        <h2 className={style.propiedad}>ID</h2>
                        <h2 className={style.propiedad2}>{driverDetail.id}</h2>
                    </article>
                    <article>
                        <h2 className={style.propiedad}>Nationality</h2>
                        <h2 className={style.propiedad2}>{driverDetail.nationality}</h2>
                    </article>
                    <article>
                        <h2 className={style.propiedad}>BirthDate</h2>
                        <h2 className={style.propiedad2}>{driverDetail.birthDate}</h2>
                    </article>
                    <article>
                        <h2 className={style.propiedad}>Teams</h2>
                        <h2 className={style.propiedad2}>{driverDetail.teams}</h2>
                    </article>
                </div>
                <div className='summary-container'>
                    <article>
                        <h2 className={style.propiedad}>Description</h2>
                        <h2 className={style.desc}>{driverDetail.description}</h2>
                    </article>
                </div>
            </div>

        </div>
    )
};

export default Detail;