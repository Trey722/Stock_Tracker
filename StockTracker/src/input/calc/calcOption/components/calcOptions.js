import React, { useState, useEffect, useMemo } from 'react';

const apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';

function getProfitAtEachPrice(ticker, startPrice, endPrice, stepAmount) {
    let apiLink = `${apiBase}/CALC/OPTION/BUYING/${startPrice}/${endPrice}/${stepAmount}/${ticker}`;

    console.log(`Attempting to fetch data from ${apiLink}`);

    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json(); // Directly parse JSON response
        })
        .then(data => {
            // If the response is a string, try to parse it as JSON
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (error) {
                    console.error('JSON parse error:', error);
                    throw error;
                }
            }
            return data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}

function OptionsProfitAtEachPrice({ ticker, startPrice, endPrice, stepAmount }) {
    const [profitData, setProfitData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getProfitAtEachPrice(ticker, startPrice, endPrice, stepAmount)
            .then(profit => {
                setProfitData(profit);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [ticker, startPrice, endPrice, stepAmount]);

    return (
        <div>
            <h2>Options Profit at Each Price</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Current Price</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profitData &&
                            Object.entries(profitData).map(([price, value], index) => (
                                <tr key={index}>
                                    <td>{price}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
            <p>NOTE: These calculations do not include permium that were paid</p>
        </div>
    );
}

export default OptionsProfitAtEachPrice;
