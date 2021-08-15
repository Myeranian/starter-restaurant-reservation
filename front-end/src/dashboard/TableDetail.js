import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteReservationId, updateReservationStatus } from "../utils/api";

function TableDetail( {table, reservations} ) {
    const history = useHistory();
    const [currentTable, setCurrentTable] = useState(table);
    const [tableStatus, setTableStatus] = useState("Free");
    const [currentReservation, setCurrentReservation] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentTable.reservation_id) {
            setTableStatus(`Occupied by reservation ID: ${currentTable.reservation_id}`);
            setCurrentReservation(reservations.find((res) => res.reservation_id === currentTable.reservation_id));
        } else {
            setTableStatus("Free");
        }
    }, [currentTable, reservations]);

    const handleFinish = (e) => {
        e.preventDefault();
        setError(null);
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        );
        if (confirmBox === true) {
            updateReservationStatus({ status: "finished" }, currentReservation.reservation_id)
            .then((response) => {
                setCurrentReservation(response)
            })
            .catch(setError);
            deleteReservationId(currentTable.table_id)
            .then((response) => {
                setCurrentTable(response)
                history.go(0);
            })
            .catch(setError);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
    }

    return (
        <div className="card text-center card-background">
            <ErrorAlert error={error} />
            <div className="card-body">
                <p className="card-text">Table ID: {currentTable.table_id}</p>
                <p className="card-text">Table Name: {currentTable.table_name}</p>
                <p className="card-text">Table Capacity: {currentTable.capacity}</p>
                <p className="card-text" data-table-id-status={`${currentTable.table_id}`}>
                {tableStatus}
                </p>   
                <div className="d-flex justify-content-center">
                    {tableStatus === "Free" ? (<div></div>) : (<div><button className="btn btn-primary" data-table-id-finish={table.table_id} onClick={handleFinish}>FINISH</button> <button className="btn btn-danger" onClick={handleCancel}>CANCEL</button></div>)} 
                </div>
            </div>
        </div>
    )
}

export default TableDetail;