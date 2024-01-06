import React, { useState, useEffect } from 'react';

async function getriskfreerate() {
    let apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    let apiLink = `${apiBase}/ECON/DATA/risk_free_rate`;

    console.log(`Attempting to fetch data from ${apiLink}`);

    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

function RiskFreeComponent() {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        getriskfreerate()
            .then(rate => {
                setRate(rate);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // handle error if needed
            });
    }, []);

    return <p>{rate !== null ? `Risk free rate is ${rate}` : 'Loading...'}</p>;
}

export default RiskFreeComponent;

