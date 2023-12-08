export const fetchCars = () => {
    return fetch(import.meta.env.VITE_API_URL + '/cars')
    .then(response => {
        if(!response.ok) 
            throw new Error("Something went wrong: " + response.statusText)

        return response.json();//we need return statement as we have multiple lines of code 
     })
     .then(data => setCars(data._embedded.cars))
     .catch(err => console.error(err))
}