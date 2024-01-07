import StockProfit from "./calculateProfit";


function procceseStockCalcs(command)
{
    console.log("Stock calc request recievied")
    if (command[2] === 'MARGIN')
    {
       console.log("attempting")
        try{
        let quantity = Int32Array(command[3])
        let underlying_stock_price = Float32Array(command[4])
        let margin_used = Float32Array(command[5])
        let starting_price = Float32Array(command[6])
        let ending_price = Float32Array(command[7])
        let step = Float32Array(command[8])

        if (starting_price < 0)
        {
            return <p>Stock can not be negative</p>
        }

        else if (ending_price < starting_price)
        {
            <p>starting_price can not be negative</p>
        }

        else if (step < 0)
        {
            return <p>Step can not be 0</p>
        }

        else if (step === undefined)
        {
            return <p>Missing a key input</p>
        }

        if ((step * 10000) < (ending_price - starting_price))
        {
            return <p>This will overload server please keep step times 10000 less then ending minus starting</p>
        } 
        console.log("received:", quantity, underlying_stock_price, margin_used, starting_price, ending_price, step);
        return <StockProfit quantity={quantity} underlying_stock_price={underlying_stock_price} margin_used={margin_used} starting_price={starting_price} ending_price={ending_price} step={step}/>

        }

        catch (error)
        {
            return <p id='negatvie'>Error: Could not understand input</p>
        }
    }

    
}

export default procceseStockCalcs;