import React, { useState, useEffect } from 'react';


function getProfitAtEachPrice(ticker, startPrice, endPrice, step) {
    const apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    const apiLink = `${apiBase}/CALC/OPTION/PROFIT/${ticker}/${startPrice}/${endPrice}/${step}`;

    console.log(`Attempting to fetch data from ${apiLink}`);

    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log(data);
            return data; // Return the fetched data
        }) 
        .catch(error => {
            console.error('Fetch error:', error);
            throw error; // Rethrow the error for handling outside this function
        });
}

function OptionsProfitAtEachPrice({ ticker, startPrice, endPrice, step }) {
    const [profitData, setProfitData] = useState(null);

    useEffect(() => {
        getProfitAtEachPrice(ticker, startPrice, endPrice, step)
            .then(profit => {
                setProfitData(profit);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [ticker, startPrice, endPrice, step]);

    return (
        <div>
            <h2>Options Profit at Each Price</h2>
            <table>
                <thead>
                    <tr>
                        <th>Current Price</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {profitData && Object.entries(profitData).map(([price, value], index) => (
                        <tr key={index}>
                            <td>{price}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OptionsProfitAtEachPrice;