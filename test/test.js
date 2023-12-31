async function get_greeks(ticker) {
    let api_base = 'https://yfapi123-2f8bcb77d958.herokuapp.com';
    let apiLink = `${api_base}/OPTIONS/DATA/${ticker}/Greeks`;

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

async function getGreeks() {
    try {
        let data = await fetchData('AAPL240112C00060000');
        const jsonData = JSON.parse(data);

        // Access the values of Delta and Gamma
        const delta = jsonData.Delta;
        const gamma = jsonData.Gamma;
        return (<>
           <p>Delta={delta}</p>
           <p>Gamme={gamma}</p>
        </>)
    } catch (error) {
        
        return(<p>An error occured while trying to pull greeks</p>)
    }
}

