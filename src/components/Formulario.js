import React, { Fragment, useState } from 'react'
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => { // (props) = props.crearCita || desctructuring {crearCita} 

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // Crear State errores 
    const [error, actualizarError] = useState(false);


    // Función que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita, 
            [e.target.name]: e.target.value
        });
    }

    // Extraer Valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();        

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() ==='' || 
           hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }        
        // Eliminar el mensaje previo
        actualizarError(false);


        // Asignar un ID
        cita.id = uuid();
        console.log(cita);

        // Crear la Cita
        crearCita(cita);

        // Reiniciar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los Campos son Obligatorios</p>: null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"  
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota} 
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"  
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"  
                    className="u-full-width"                    
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"  
                    className="u-full-width"                    
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width btn"                    
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired 
}

export default Formulario;