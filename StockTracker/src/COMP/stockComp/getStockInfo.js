import React, { useState, useEffect } from 'react';




function getStockPrice(stock_ticker) {
    const apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    let apiLink = `${apiBase}/stock/data/stock_price/${stock_ticker}`;

    console.log(`Attmepte to get stock price from ${apiLink}`)
    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => data[stock_ticker])
        .catch(error => {
            console.error('Fetch error:', error);
            return null;
        });
}


function StockPriceComponent({ stock }) {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        getStockPrice(stock)
            .then(stockPrice => {
                setPrice(stockPrice);
            });
    }, [stock]);

    console.log(stock);

    return <p>{price !== null ? `Stock price for ${stock}: ${price}` : 'Loading...'}</p>;
}

export default StockPriceComponent;


