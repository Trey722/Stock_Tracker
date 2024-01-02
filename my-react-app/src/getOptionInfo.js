import React, { useState, useEffect } from 'react';

function getOptionChains(stock_ticker, expiration_date) {
    
    const apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    let apiLink = `${apiBase}/stock/data/options_chain/${stock_ticker}/${expiration_date}`;

    console.log(`Attempting to fetch options chain from ${apiLink}`);
    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.call) {
                const optionsDataString = data.call;
                const optionsData = JSON.parse(optionsDataString);
                return optionsData;
            } else {
                throw new Error('Options chain data format not as expected.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}

function OptionsChainComponent({ stock, expiration_date }) {
    console.log(`Getting Options Chain Compoenent with ticker = ${stock}, and date=${expiration_date}`);
    const [optionsData, setOptionsData] = useState(null);

    useEffect(() => {
        getOptionChains(stock, expiration_date)
            .then(options => {
                setOptionsData(options);
            });
    }, [stock, expiration_date]);

    return (
        <div>
            <p>Stock: {stock}</p>
            <p>Expiration Date: {expiration_date}</p>
            {optionsData !== null ? (
                <table>
                    <thead>
                    <tr>
                    <th id="Option_title">Contract Symbol</th>
                    <th id="Option_title">Strike</th>
                    <th id="Option_title">Volume</th>
                    <th id="Option_title">Open Intrest</th>
                    <th id="Option_title">IV</th>
                    <th id="Option_title">Last Price</th>
                    <th id="Option_title">Bid</th>
                    <th id="Option_title">Ask</th>
                    {/* Add more columns if needed */}
                </tr>
            </thead>
            <tbody>
                {optionsData.map((option, index) => (
                    <tr key={option.contractSymbol} className="optionTableRow">
                        <td>{option.contractSymbol}</td>
                        <td>{option.strike}</td>
                        <td>{option.volume}</td>
                        <td>{option.openInterest}</td>
                        <td>{option.impliedVolatility}</td>
                        <td>{option.lastPrice}</td>
                        <td>{option.bid}</td>
                        <td>{option.ask}</td>
                        {/* Add more cells if needed */}
                    </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading options data...</p>
            )}
        </div>
    );
}

export default OptionsChainComponent;
