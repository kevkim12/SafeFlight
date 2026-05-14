import React from "react";
import axios from 'axios';

const SavedPlaces = () => {
    const[userData, setUserData] = React.useState([])
    const[userSearchData, setUserSearchData] = React.useState([]);
    const[country, setCountry] = React.useState('');
    const[status, setStatus] = React.useState('');

        React.useEffect(() => {
            axios.get("/favouritesDB")
                .then(
                    res => {
                        const favouritesData = res.data["data"];
                        setUserData(favouritesData)
                        setUserSearchData(favouritesData)
                    }
                )
        }, [])

    const handleSearch = () => {
        const newData =
            userData
                .filter(x => x.country_name === (country === '' ? x.country_name : country))
                .filter(y => y.country_status === (status === '' ? y.country_status : status))
        setUserSearchData(newData)

    }

    const handleReset = () => {
            axios.post("/resetFavourites").then(
                res => {
                    setUserData([])
                    setUserSearchData([])
                }
            )
    }

    const handleFavouritePlace = (e) => {
        axios.post("/addFavourites", {request_data: {data: e.target.value, isChecked: !e.target.checked}}).then(
            res =>  {
                console.log(res)
            }
        )
    }  
    if (localStorage.getItem("idToken") === "null") {
        return (<div><h1>Please log in to access this page.</h1></div>);
    } else {
        return (
            <main className="page-panel">
                <div className="filter-bar">
                            <input type='text' placeholder="Enter country..."
                                onChange={(e) => setCountry(e.target.value)}/>
                            <select onChange={(e) => setStatus(e.target.value)}>
                                <option value=''>-Select-</option>
                                <option value='Low Risk'>Low Risk</option>
                                <option value='Medium Risk'>Medium Risk</option>
                                <option value='High Risk'>High Risk</option>
                                <option value='Unknown'>Unknown</option>
                            </select>
                            <button type="button" className="button-secondary" onClick={() => handleSearch()}>
                                Search
                            </button>
                            <button type="button" className="button-secondary" onClick={() => handleReset()}>
                                Reset Favourites
                            </button>
                </div>

                <div className="table-wrap">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Remove?</th>
                        <th>Country Code</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Status Overridden?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userSearchData && userSearchData.length > 0 ?
                            userSearchData.map(item =>
                                <tr key={item._id}>
                                <td>{<input type="checkbox" value = {JSON.stringify(item)}
                                                onChange={(item) => handleFavouritePlace(item)}/>}</td>
                                    <td>{item._id}</td>
                                    <td>{item.country_name}</td>
                                    <td>{item.country_status}</td>
                                    <td>{item.isStatusOveridden}</td>
                                </tr>
                            )
                            : <tr><td colSpan="5">No data</td></tr>
                    }
                    </tbody>
                </table>
                </div>
            </main>
        );
    }
};

export default SavedPlaces;
