let apiBase = 'https://yfapi123-2f8bcb77d958.herokuapp.com';

function getOptionPrice(stock_ticker, expiration_date) {
    let apiLink = `${apiBase}/stock/data/options_chain/${stock_ticker}/${expiration_date}`;

    console.log(`Attempting to fetch data from ${apiLink}`);

    fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            // Assuming 'data' contains a 'call' attribute with stringified JSON
            if (data && data.call) {
                const optionsDataString = data.call; // Assuming 'call' contains the stringified JSON
                const optionsData = JSON.parse(optionsDataString); // Parse the string into an array

                const optionsTable = document.createElement('table');
                optionsTable.innerHTML = `
                    <tr>
                        <th>Contract Symbol</th>
                        <th>Last Price</th>
                        <th>Bid</th>
                        <th>Ask</th>
                        <!-- Add more columns if needed -->
                    </tr>
                `;
                optionsData.forEach(option => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${option.contractSymbol}</td>
                        <td>${option.lastPrice}</td>
                        <td>${option.bid}</td>
                        <td>${option.ask}</td>
                        
                    `;
                    optionsTable.appendChild(row);
                });
                document.getElementById('optionsData').appendChild(optionsTable);
            } else {
                throw new Error('Data format not as expected.');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle errors or display a message accordingly
        });
}

getOptionPrice('AAPL', "2024-01-05");