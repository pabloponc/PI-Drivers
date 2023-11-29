import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, onSearch } from 'react-router-dom';
import style from './SearchBar.module.css';
import "./SuggestionList.css";

function SearchBar ({onSearch}) {

    const drivers = useSelector(state => state.allDrivers);
    // console.log("estos son los driver",drivers);

    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchText(value.toUpperCase());
        setShowSuggestions(value !=="");

        if(searchText === "") setShowSuggestions(false)

        const filtered = drivers.filter((driver) => driver.fullName.toUpperCase().includes(value.toUpperCase()));

        setSuggestions(filtered.slice(0,10));

    };

    const handleSuggestionClick = (driver) => {
        setSearchText("");
        setSuggestions([]);
        setShowSuggestions(false);
        onSearch(driver);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter" ) {
            if(suggestions.length > 0) {
                handleSuggestionClick(suggestions[0]);
            };
        };
    };

    const handleBuscar = (event) => {
        if (suggestions.length>0) {
            handleSuggestionClick(suggestions[0]);
        };
    };
    

    return (
        <div className={style.container}>

            <div className={style.containerSB}>

                <div className={style.inputContainer} >
                    <input className={style.input} type='search' value={searchText} onChange={handleInputChange} onKeyPress={handleEnterPress} placeholder='Find a driver'/>

                    <button className={style.searchButton} onClick={handleBuscar} disabled={suggestions.length===0}>Search</button>
                    <ul className={`suggestion-list ${showSuggestions ? 'showSuggestions' : ''}`}>
                        {suggestions.map((driver, index) => (
                            <li className='suggestionItem' key={index} onClick={() => handleSuggestionClick(driver)}>
                                {driver.fullName.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </div>


                <div>
                    <Link to='/create'>
                        <button className={style.createButton} > Create your drivers! </button>
                    </Link>
                </div>

                <div>
                    <Link to='/'>
                        <button className={style.searchButton} > LogOut </button>
                    </Link>
                </div>


            </div>


        </div>
    )

    


};
const mapStateToProps = (state) => {
    return {
        teams: state.teams,
        drivers: state.drivers
    }
};

export default connect (
    mapStateToProps
) (SearchBar);