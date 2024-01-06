import React, { useState, useEffect } from 'react';

async function getRiskFreeRate() {
    try {
        let apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
        let apiLink = `${apiBase}/ECON/DATA/risk_free_rate`;


        console.log(`Attempting to fetch data from ${apiLink}`);

        const response = await fetch(apiLink);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching risk-free rate:', error);
        throw error; // Rethrow the error for handling in the component
    }
}

function RiskFreeComponent() {
    console.log("Risk-free component called");
    const [rate, setRate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRiskFreeRate()
            .then(rate => {
                setRate(rate);
            })
            .catch(error => {
                setError(error.message || 'An error occurred');
            });
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <p>{rate !== null ? `Risk-free rate is ${rate}` : 'Loading...'}</p>;
}

function getEcon(command) {
  console.log("Got econ");
  if (command[2] === 'risk_free_rate') {
      console.log("W");
      return <RiskFreeComponent />;
  } else {
      return 'failed to read';
  }
}


export default getEcon;
