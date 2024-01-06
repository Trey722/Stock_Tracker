import OptionsChainComponent from "./components/getOptionInfo"
import StockGreeksComponent from "./components/getOptionGreeks"

function failedToExcute(error)
{
  return (
  <div>
          <p className="error"> Failed Excution: {error}</p>
          <p>Type -help for help.</p>
          
        </div>
    )
}


function excuteGetOption(command)
{
  if (command[2] === 'CHAIN')
  {
    if (command[3] && command[4])
    {
      return <OptionsChainComponent stock={command[3]} expiration_date={command[4]}/>
    }
  }

  else if (command[2] === 'GREEKS')
  {
    console.log(command[3])
    console.log("Attempting to get option greeks for", command[3])
    return <StockGreeksComponent stock={command[3]}/>
  }

  else {
    return failedToExcute("Missing date")
  }
}

export default excuteGetOption;