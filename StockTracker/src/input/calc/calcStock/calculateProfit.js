import React, { useEffect, useState } from 'react';

const api_base = 'https://yfapi123-2f8bcb77d958.herokuapp.com/';

const StockProfit = ({ quantity, underlying_stock_price, margin_used, starting_price, ending_price, step }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api_link = `${api_base}CALC/STOCKS/PROFIT/${quantity}/${underlying_stock_price}/${margin_used}/${starting_price}/${ending_price}/${step}`;
        console.log(`Attempting to retrieve data from ${api_link}`);
        const response = await fetch(api_link);
        const data = await response.json();

        console.log('Data received:', data); // Log the received data

        // Assuming data.result is an object with key-value pairs
        if (typeof data.result === 'object' && data.result !== null) {
          const resultEntries = Object.entries(data.result);
          setTableData(resultEntries); // Set the fetched data to the state
        } else {
          console.error('Invalid data format received');
          return <p id='negative'>Could not understand input</p>
        }
      } catch (error) {
        console.error('Error:', error);
        return <p>AN error occured: {error}</p>
      }
    };

    fetchData();
  }, [quantity, underlying_stock_price, margin_used, starting_price, ending_price, step]); // Add dependencies to the dependency array

  return (
    <div>
    <p>Profit at each stock price</p>
    <p>stock price: profit</p>
      <div>
        {tableData.map(([key, value], index) => (
          <p key={index}>
            {key}: {value}
          </p>
        ))}
      </div>

      <p>Note: These do not include commision fees or margin intrest/fees. It may also be off by a rounding error</p>
    </div>
  );
};

export default StockProfit;

