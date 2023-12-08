import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import  Snackbar  from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { fetchCars } from "./carapi";

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    const deleteCar= (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error in deletion: " + response.statusText);
                } else {
                    setOpen(true);
                    fetchCars();
                }
            })
            .then(() => fetchCars())
            .catch(err => console.error(err))
    }
    }

    const [columnDefs] = useState([
        { field: 'brand', sortable: true, filter: true, width: 150},
        { field: 'model', sortable: true, filter: true, width: 120},
        { field: 'color', sortable: true, filter: true, width:120},
        { field: 'fuel', sortable: true, filter: true, width:100 },
        { field: 'year', sortable: true, filter: true, width:100 },
        { field: 'price', sortable: true, filter: true, width:120 },
        {
            cellRenderer: params => <EditCar  cardata = {params.data}  fetchCars = {fetchCars}/>,
            width: 120
        },
        {
            cellRenderer: params => <Button onClick={() => deleteCar(params.data._links.car.href)}>Delete</Button>, width:120
        }
    ])

    useEffect(() => {
        getCars();
    }, [])

    const getCars = () => {
        fetchCars()
        .then(data => setCars(data.embedded.cars))
    }
    

   

    return(
        <>
        <AddCar fetchCars = {fetchCars}/> 
        <div className = "ag-grid-community/styles/ag-theme-material" style = {{ width: '90%', height: 600 }}>
            <AgGridReact 
            rowData = {cars}
            columnDefs = {columnDefs}
            pagination = {true}
            paginationAutoPageSize = {true}
            />
            
        </div>
        <Snackbar 
            open = {open}
            autoHideDuration = {3000}
            onClose = {() => setOpen(false)}
            message = "Car deleted succesfully"
        />
        </>
    );
}

export default Carlist;