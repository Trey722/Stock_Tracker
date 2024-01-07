import React, { useState, useEffect } from 'react';

const apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';

const DeltaGammaHedging = ({ quantity, delta1, gamma1, delta2, gamma2 }) => {
    const [optionData, setOptionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOptionData = async () => {
            const url = `${apiBase}/CALC/OPTION/HEDGE/DELTA/Gamma/${quantity}/${delta1}/${gamma1}/${delta2}/${gamma2}`;
            console.log("attempting to pull data from", url); 
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.text();
                const data = JSON.parse(responseData);
                const parasedData = JSON.parse(data)

                console.log('Received data:', parasedData);

                setOptionData({
                    option: parasedData.option,
                    stock: parasedData.stock
                });

                console.log(data.option)
                console.log(data.stock)
            } catch (error) {
                setError(error.message);
            }
        };

        getOptionData();
    }, [quantity, delta1, gamma1, delta2, gamma2]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : !optionData ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Buy/Sell Option with gamma = {gamma2} and delta = {delta2}: {optionData.option}</p>
                    <p>Buy/Sell Stock: {optionData.stock}</p>
                </div>
            )}
        </div>
    );
};

export default DeltaGammaHedging;
