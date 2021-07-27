import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listAllTables, listReservations, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function SeatReservation() {
    const history = useHistory();
    const params = useParams();

    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState("");
    const [res, setRes] = useState([]);
    const [resError, setResError] = useState("");
    const [currentRes, setCurrentRes] = useState({});
    const [formValue, setFormValue] = useState({});
    const [showAlert, setShowAlert] = useState("");

    function loadTables() {
        const abortController = new AbortController();
        setTablesError(null);
        listAllTables()
        .then(setTables)
        .catch(setTablesError);
        return () => abortController.abort();
      }

    function loadReservations() {
        const abortController = new AbortController();
        setResError(null);
        listReservations({ }, abortController.signal)
        .then(setRes)
        .catch(setResError);
        const current = res.find((res) => Number(res.reservation_id) === Number(params.reservation_id));
        setCurrentRes(current);
        return () => abortController.abort();
    }

    useEffect(loadTables, [res, params.reservation_id]);
    useEffect(loadReservations, [res, params.reservation_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert("");
        let valid = true;
        console.log(formValue)
        const tableObj = JSON.parse(formValue);
        console.log(tableObj);
        if (currentRes.people > tableObj.capacity) {
            setShowAlert("This table is too small for this reservation!");
            valid = false;
        }
        if (valid === true) {
            const updatedTable = {
                ...tableObj,
                reservation_id: Number(params.reservation_id),
            };
            console.log(updatedTable)
            updateTable(updatedTable)
            .then((response) => {
                console.log(response)
                history.push(`/dashboard`)
            });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    if (tables && currentRes) {
        return (
            <div>
                <ErrorAlert error={tablesError} />
                <ErrorAlert error={resError} />
                {showAlert && (
                        <p className="alert alert-danger">
                            {showAlert}
                        </p>
                    )}
                <h3>Reservation Seating for reservation ID: {params.reservation_id}</h3>
                <form onSubmit={handleSubmit} >
                    <label>Table Number:</label>
                    <br />
                    <select name="table_id" onChange={(e) => setFormValue(e.target.value)}>
                        <option value="">--Please Choose a Table--</option>
                        {tables && tables.map((table) => (
                            <option key={table.table_id}
                                    value={JSON.stringify(table)}
                                    required
                                    >
                                {table.table_name} - {table.capacity}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">SUBMIT</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default SeatReservation;