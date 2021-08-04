import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listReservations } from "../utils/api";

function EditReservation() {
    const history = useHistory();
    //set default info as old info?
    
    //make a useEffect calling the reservations list and 
    //use params to get current res
    //only can edit if res.status is booked, backend validate
    const params = useParams();
    const [reservations, setReservations] = useState([])
    const [currentReservation, setCurrentReservation] = useState({})

    function loadReservations() {
        console.log(params)
        listReservations({})
        .then((response) => {
            console.log(response)
            setReservations(response)
        })
        .then(() => {
            //why is this not working??
            const current = reservations.find((res) => res.reservation_id === Number(params.reservation_id))
            console.log(current)
            setCurrentReservation(current)
            console.log(currentReservation);
        })
    }

    useEffect(loadReservations, [params])

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_number, setMobile_number] = useState("");
    const [reservation_date, setReservation_date] = useState("");
    const [reservation_time, setReservation_time] = useState("");
    const [people, setPeople] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();
        //update the reservation!

        //history.goBack();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div>
            EDIT FORM
            <form onSubmit={handleSubmit} >
                <label>First Name:</label>
                    <br />
                        <input
                        name="first_name"
                        type="text"
                        required
                        onChange={(e) => setFirst_name(e.target.value)}
                        value={first_name}
                        />
                    <br />
                    <label>Last Name:</label>
                    <br />
                        <input
                        name="last_name"
                        type="text"
                        required
                        onChange={(e) => setLast_name(e.target.value)}
                        value={last_name}
                        />
                    <br />
                    <label>Mobile Number:</label>
                    <br />
                        <input
                        name="mobile_number"
                        type="text"
                        required
                        onChange={(e) => setMobile_number(e.target.value)}
                        value={mobile_number}
                        />
                    <br />
                    <label>Reservation Date:</label>
                    <br />
                        <input
                        name="reservation_date"
                        type="date"
                        required
                        onChange={(e) => setReservation_date(e.target.value)}
                        value={reservation_date}
                        />
                    <br />
                    <label>Reservation Time:</label>
                    <br />
                        <input
                        name="reservation_time"
                        type="time"
                        required
                        onChange={(e) => setReservation_time(e.target.value)}
                        value={reservation_time}
                        />
                    <br />
                    <label>Amount of People:</label>
                    <br />
                        <input
                        name="people"
                        type="number"
                        required
                        onChange={(e) => setPeople(e.target.valueAsNumber)}
                        value={people}
                        />
                    <br />
                    <button type="submit">SUBMIT</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </form>
        </div>
    )
};

export default EditReservation;