import excuteGetRequest from "./get/procceseGetRequest"
import failedToRead from "./errorFunction";
import CalcProccese from "./calc/procceseCalc"


function procceseCommands(command)
{
    let parsaedCommand

    parsaedCommand = parseCommand(command);

    if (parsaedCommand[0] === '-help')
    {
      return (<> 
      
      <h3>Commands</h3>
      <p id="helpCommand">--get STOCK Ticker
              <p id="helpDescription">This will get the stock price for the TICKER provided</p>
      </p>
      <p id="helpCommand">--get OPTION CHAIN TICKER YYYY-MM-DD
              <p id="helpDescription">This will get the option chain using the TICKER and expiration date provided</p>
      </p>
      <p id="helpCommand">--get OPTION GREEKS OPTION_TICKER
              <p id="helpDescription">This will get the delta and gamma using an option contract name.<a href="https://finance.yahoo.com/quote/AAPL/options?p=AAPL" target="_blank">Option ticker example</a>
</p>
      </p>

      <p id="helpCommand">--get ECON risk_free_rate
              <p id="helpDescription">This will get the 10 year treasury yield</p>
      </p>


      <p id="helpCommand">--get ECON risk_free_rate
              <p id="helpDescription">This will get the 10 year treasury yield</p>
      </p>

      <p id="helpCommand">--calculate OPTION PNL OPTION_TICKER start_price end_price step
              <p id="helpDescription">This will get the profit for every step between start_price and end_price for the ticker OPTION_TICKER. If you are selling, multiply results by -1</p>
      </p>

      <p id="helpCommand">--calculate OPTION HEDGE OPTION1_DELTA OPTION1_GAMMA OPTION2_DELTA OPTION2_GAMMA
              <p id="helpDescription">This takes the option you are writing + the option you are using to cancel and calcutes the amount of shares/option you need to buy or sell to reach 0 gamma/delta.</p>
              <p id="helpDescription">Data may be off due to rounding</p>
      </p>

      <p id="helpCommand">--calculate STOCK MARGIN quantity shares_buying margin_used start_price end_price step
              <p id="helpDescription">This take calculates the profit at every step between start and end price</p>
              <p id="helpDescription">Data may be off due to rounding</p>
      </p>
      
      </>)
    }
    
    else if (parsaedCommand[0] == "--get")
    {
      console.log("Excuting get request")
      console.log("We received command", command);
      return excuteGetRequest(parsaedCommand);
      
    }

    else if (parsaedCommand[0] == "--calculate")
    {
      return CalcProccese(parsaedCommand)
    }

    else if (parsaedCommand == "--help")
    {
      //return help stuff
    }

    else {
        console.log("Emergncy Else excuted")
        return failedToRead(command)
    }
}

function parseCommand(string)
{
    let arrayString = string.split(' ')
    console.log(arrayString);
    return arrayString
}

export default procceseCommands