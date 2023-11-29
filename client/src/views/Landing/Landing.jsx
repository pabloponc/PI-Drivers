import {Link} from "react-router-dom";
import React from "react";
import style from "./Landing.module.css";


const Landing = () => {
    return (
      <div className={style.container}>
          <div className={style.landingContent}>
            <div className={style.text}>
              <h1 className={style.title}>DRIVERS APP</h1>
              <h2 className={style.subtitle}>HOME OF FORMULA 1</h2>
            </div>
            <div>
              <Link to="/home">
               <button className={style.button} >HOME</button>
             </Link>
            </div>
          </div>
      </div>
    );
  };
  


export default Landing;