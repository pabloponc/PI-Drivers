import { setFilterByTeam, setFilterByOrigin, resetFilters, getAllDrivers, getAllTeams } from '../../redux/actions';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import "./Cards.css"
import Pagination from '../Pagination/Pagination';

function CardsContainer({ allDrivers, filteredDrivers, allTeams, setFilterByTeam, setFilterByOrigin, resetFilters }) {

    //TODO --- Manejo de filtros ---

    const [filterByTeam, setFilterByTeamState] = useState('');
    const [filterByOrigin, setFilterByOriginState] = useState('');
    const [orderCards, setOrderState] = useState("true");
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDrivers());
        dispatch(getAllTeams());
    }, [getAllTeams, getAllDrivers]);

    useEffect(() => {
        setFilterByTeam(filterByTeam);
    }, [filterByTeam, setFilterByTeam]);

    useEffect(() => {
        setFilterByOrigin(filterByOrigin);
    }, [filterByOrigin, setFilterByOrigin]);

    // useEffect(() => {
    //     setOrderState(orderCards);
    // }, [orderCards]);

    const handleFilterByTeam = (event) => {
        setCurrentPage(1)
        const filterValue = event.target.value;
        setFilterByTeam(filterValue);
    }

    const handleFilterByOrigin = (event) => {
        setCurrentPage(1)
        const filterValue = event.target.value;
        setFilterByOrigin(filterValue);
    }

    const handleResetFilters = () => {
        setFilterByTeamState('');
        setFilterByOriginState('');
        setOrderState("true");
        resetFilters();
    };

    const handleOrder = () => {
        setOrderState(!orderCards);
    }

   

    const drivers = [...(filteredDrivers.length === 0 ? allDrivers : filteredDrivers)].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (orderCards === "true") {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    return(

        <div className='Cards' >

            <div className='selectContainer'>
                
                {/* <select className='selects' onChange={handleOrder}>
                    <option value="true">A-Z</option>
                    <option value="false">Z-A</option>
                </select> */}
                <button onClick={handleOrder}>
                    {
                        orderCards ? "A-Z" : "Z-A"
                    }
                </button>

                <select className='selects' onChange={handleFilterByOrigin}>
                    <option value="">All</option>
                    <option value="false">API</option>
                    <option value="true">DataBase</option>
                </select>
                

                <select className='selects' onChange={handleFilterByTeam}>
                    <option value="">ALL TEAMS</option>
                    {
                        allTeams.map(team => {
                            return (
                                <option value={team.name}>{team.name.toUpperCase()}</option> 
                            )
                        })
                    }
                </select>

                <button onClick={handleResetFilters} >Reset Filters</button>
            </div>

            <div className='cards-organization'>

            {
                <Pagination drivers={drivers} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            }

            </div>




        </div>

    )

}

const mapStateToProps = (state) => {
    return {
      allTeams: state.allTeams,
      allDrivers: state.allDrivers,
      filteredDrivers: state.filteredDrivers,
      filterByTeam: state.filterByTeam,
      filterByOrigin: state.filterByOrigin
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDrivers: () => dispatch(getAllDrivers()),
        getAllTeams: () => dispatch(getAllTeams()),
        setFilterByTeam: (filterValue) => dispatch(setFilterByTeam(filterValue)),
        setFilterByOrigin: (filterValue) => dispatch(setFilterByOrigin(filterValue)),
        resetFilters: () => dispatch(resetFilters()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);