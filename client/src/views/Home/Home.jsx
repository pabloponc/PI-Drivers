import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css"
import "../../redux/reducer";


const Home = ({drivers}) => {

    return(
        <div className={style.container}>
            <CardsContainer drivers={drivers}/>
        </div>
    )
};

export default Home;