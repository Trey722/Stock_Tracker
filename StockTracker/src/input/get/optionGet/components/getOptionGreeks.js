import React, { useState, useEffect } from 'react';

async function get_greeks(ticker) {
    let api_base = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    let apiLink = `${api_base}/OPTIONS/DATA/${ticker}/Greeks`;
    console.log(apiLink);

    try {
        let response = await fetch(apiLink);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function processGreeksData(data) {
    // Process the data or perform additional actions
    data = JSON.parse(data)
    console.log(data)
    return data;
}

async function fetchData(ticker) {
    try {
        let data = await get_greeks(ticker);
        return await processGreeksData(data);
    } catch (error) {
        // Handle error
        console.error('Error fetching or processing data:', error);
        throw error;
    }
}

function StockGreeksComponent({ stock }) {
    const [greeks, setGreeks] = useState(null);

    useEffect(() => {
        fetchData(stock)
            .then(greeksData => {
                setGreeks(greeksData);
            });
    }, [stock]);

    return (
        <div>
            {greeks !== null ? (
                <>
                    <p>Delta = {greeks.Delta}</p>
                    <p>Gamma = {greeks.Gamma}</p>
                </>
            ) : (
                <p>Loading Greeks...</p>
            )}
        </div>
    );
}

export default StockGreeksComponent;






