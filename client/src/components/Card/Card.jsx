import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = (props) => {
    
    return(
        <div className={style.card}>

                <img src={props.image} alt='' className={style.cardImg} />
                
                <h2 className={style.nombre}>{props.name.toUpperCase()+ ' ' + props.surname.toUpperCase()}</h2>
                <article className={style.infoContainer}>
                    <h2 className={style.teamTitle}>TEAMS</h2>
                    <div className={style.teamsContainer}>
                        <h3 className={style.teamNames}>
                            {props.teams.map((team, index) => (
                            index === props.teams.length - 1 ? team.charAt(0).toUpperCase() + team.slice(1) : team.charAt(0).toUpperCase() + team.slice(1) + ', '
                            ))}
                        </h3>
                    </div>
                    <Link className={style.imgContainer} to={`/detail/${props.id}`}>
                        <button>DRIVER DETAIL</button>
                    </Link>
                </article>

        </div>


    )
}

export default Card;