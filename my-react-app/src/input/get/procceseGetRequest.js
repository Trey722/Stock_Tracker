import StockPriceComponent from "../../COMP/stockComp/getStockInfo";
import excuteGetOption from "./optionGet/getOption";

import getEcon from "./econGet/getEcon";
import failedToRead from "../errorFunction";


function failedToExcute(error)
{
  return (
  <div>
          <p className="error"> Failed Excution: {error}</p>
          <p>Type -help for help.</p>
          
        </div>
    )
}

function excuteGetRequest(command)
{
  console.log(command[1]);
  if (command[1] == 'STOCK')
  {
    if (command[2])
    {
      console.log("Tried to get STOCK for", command[2]); 
    
      return <StockPriceComponent stock={command[2]}/>
    }

    return failedToExcute("Missing stock")
  }

  else if (command[1] == 'OPTION')
  {
    return excuteGetOption(command)
  }

  else if (command[1] == "ECON")
  {
        let outputData = getEcon(command)
        if (outputData === 'failed to read')
        {
            return failedToRead(command);
        }
  }

  else {return failedToRead(command)}
}

export default excuteGetRequest