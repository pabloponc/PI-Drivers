import {Link} from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx"
import logo from "../../R.png";

const NavBar = ({onSearch}) => {
    return(
        <nav>
            <div className={style.mainContainer}>

                <div className={style.sb}>
                <SearchBar onSearch={onSearch}/>

                </div>
                <div className={style.logoContainer}>
                    <Link to="/home">
                        <img className={style.logo} src={logo} alt="logo"/>
                    </Link>
                </div>

            </div>
        </nav>
    )
};

export default NavBar;