import React,{ useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllDrivers,postDriver } from "../../redux/actions";
import { toArray} from "./helpers";
import style from "./Form.css";

const Form = () => {

    const dispatch = useDispatch();

    const allDrivers = useSelector(state => state.allDrivers);
    const allTeams = useSelector(state => state.allTeams);

    const [driverTeams, setDrvierTeams] = useState([]);

    const teamsToArray = toArray(driverTeams);


    const [input,setInput] = useState({
        name:"",
        surname:"",
        description:"",
        image:"",
        nationality:"",
        birthDate:"",
    });

    const [errors,setErrors] = useState({
        name:"",
        surname:"",
        description:"",
        image:"",
        nationality:"",
        birthDate:"",
                       
    });



    const validate = (input) => {
        const errorsCopy = { ...errors };

        // Validación del nombre
    if (!/^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/.test(input.name)) {
        errorsCopy.name = "Invalid forename";
      } else {
        errorsCopy.name = "";
      }
  
      // Validación del apellido
      if (!/^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/.test(input.surname)) {
        errorsCopy.surname = "Invalid surname";
      } else {
        errorsCopy.surname = "";
      }
  
      // Validación de la descripción
      if (input.description.length < 15) {
        errorsCopy.description =  "The description must be at least 15 characters";
      } else {
        errorsCopy.description = "";
      }
      // Validación de la imagen
      if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errorsCopy.image = "The image must be a valid URL";
      } else {
        errorsCopy.image = "";
      }

      // Validación de la dob
      if (!/^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(input.birthDate)) {
        errorsCopy.birthDate = "Invalid birthdate format";
      } else {
        errorsCopy.birthDate = "";
      }


      setErrors(errorsCopy);
  
        
      };
      const handleTeams = (event) => {
        if (event.target.checked) {
          setDrvierTeams([...driverTeams, event.target.value]);
        } else {
          setDrvierTeams(driverTeams.filter(team => team !== event.target.value));
        }
      };

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({...input, [property]:value})
        setInput({...input, [property]:value})
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const driverToAdd = {
            name:input.name,
            surname:input.surname,
            description:input.description,
            image:input.image,
            nationality:input.nationality,
            birthDate:input.birthDate,
            teams:teamsToArray,
        };
        alert("Usuario posteado");
       
        dispatch(postDriver(driverToAdd));
    };
    const teamsError = driverTeams.length > 0 ? "" : "You must select at least one team."

    const isSubmitButtonEnabled = driverTeams.length > 0 && Object.values(errors).every((error) => error === '');



    return(
                <div className="createContainer">
                    <div className="createForm">

    

                    <form onSubmit={submitHandler}>
                        <div>
                        
                            <div>
                                <label>Name </label>
                                <input type="text" placeholder="e.g. `Pablo Martin`" value={input.value} onChange={changeHandler} name="name"/>
                                <dvi>{errors.name && <span>{errors.name}</span>}</dvi>
                            </div>

                            <div>
                                <label>Surname </label>
                                <input type="text" placeholder="e.g. `Ponce`" value={input.value} onChange={changeHandler} name="surname"/>
                                <dvi>{errors.surname && <span>{errors.surname}</span>}</dvi>
                            </div>

                            <div>
                                <label>Description </label>
                                <input type="textarea" placeholder="Enter a description" value={input.value} onChange={changeHandler} name="description"/>
                                <div>{errors.description && <span>{errors.description}</span>}</div>
                            </div>

                            <div>
                                <label>Image </label>
                                <input type="text" placeholder="Enter the URL of your image"value={input.value} onChange={changeHandler} name="image"/>
                                <dvi>{errors.image && <span>{errors.image}</span>}</dvi>
                            </div>

                            <div>
                                <label>Nationality </label>
                                <input type="text" placeholder="Enter a nationality" value={input.value} onChange={changeHandler} name="nationality"/>
                                <dvi>{errors.nationality && <span>{errors.nationality}</span>}</dvi>
                            </div>

                            <div>
                                <label>BirthDate </label>
                                <input type="text" placeholder="e.g. 2000-08-22"value={input.value} onChange={changeHandler} name="birthDate"/>
                                <dvi>{errors.birthDate && <span>{errors.birthDate}</span>}</dvi>
                            </div>

                            <div className="selectContainer">

                                <label className="teams">TEAMS</label>
                                    <div className="teamsContainer">
                                        
                                        <div className="teams-list">

                                                {allTeams?.map(team => (
                                                    <label className='team-name' key={team.name}>
                                                    <input 
                                                        type='checkbox'
                                                        className='team-input'
                                                        name={team.name}
                                                        value={team.name}
                                                        onChange={event => handleTeams(event)}
                                                        />
                                                    {team.name.toUpperCase()}
                                                    </label>
                                                ))}
                                        </div>
                                    </div>

                                    <div className='error'><span>{teamsError}</span></div>
                            
                            </div>


                    </div>

                    
                    <button className='boton' type='submit' disabled={!isSubmitButtonEnabled}>SUBMIT</button>


                    </form>
                </div>


                </div>
       
    )
};

export default Form;

