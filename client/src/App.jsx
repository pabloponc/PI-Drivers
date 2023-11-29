import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";


import { Route, useLocation,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTeams, getAllDrivers} from "./redux/actions";

import style from "./App.module.css";

function App() {

  const histoty = useHistory();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllDrivers());
    dispatch(getAllTeams());
},[dispatch]);

const [selectedDriver, setSelectedDriver] = useState(null);

const handleDriverSearch = (driver) => {
  setSelectedDriver(driver);

  histoty.push(`/detail/${driver.id}`);

}
  
  const location = useLocation();

  return (
    <div className={style.app}>
      {location.pathname !== "/" && <NavBar onSearch={handleDriverSearch} />}
      <Route exact path="/" render={() => <Landing />} />

      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/create" render={() => <Form />} />
      <Route exact path="/detail/:id" render={() => <Detail />} />
    </div>
  );
}

export default App;
