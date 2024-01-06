import React, { useState, useRef } from 'react';
import StockPriceComponent from './getStockInfo';
import OptionsChainComponent from './getOptionInfo';
import RiskFreeComponent from './getRiskFreeRate';
import OptionsProfitAtEachPrice from './calcOptions';
import getGreeks from './getOptionGreeks';
import StockGreeksComponent from './getOptionGreeks';


function parseCommand(string)
{
    let arrayString = string.split(' ')
    console.log(arrayString);
    return arrayString
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
    if (command[2] == 'risk_free_rate') return <RiskFreeComponent/>
    else 
    {
      return failedToRead(command)
    }
  }

  else {return failedToRead(command)}
}




function failedToRead(command)
{
    return (
        <div>
          <p className="error">Could not find command '{command}'.</p>
          <p>Type -help for help.</p>
          
        </div>
      );

}

function failedToExcute(error)
{
  return (
  <div>
          <p className="error"> Failed Excution: {error}</p>
          <p>Type -help for help.</p>
          
        </div>
    )
}



const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const [oldCommands, setOldCommands] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Process input when Enter is pressed
      processInput(input);
    }
  };

  const processInput = (command) => {
    let outputContent;
    let parsaedCommand

  
    parsaedCommand = parseCommand(command);


    
    if (parsaedCommand[0] == "--get")
    {
      console.log("Excuting get request")
      console.log("We received command", command);
      outputContent = excuteGetRequest(parsaedCommand);
      
    }

    else if (parsaedCommand == "--help")
    {
      //return help stuff
    }

    else {
        console.log("Emergncy Else excuted")
      outputContent = failedToRead(command)
    }

    // Set the output, including the entered command
    setOutput((prevOutput) => [
      ...prevOutput,
      { type: 'input', content: command }, // Save the entered command
      { type: 'output', content: outputContent }, // Set the corresponding output
    ]);

    // Save the command in oldCommands
    setOldCommands((prevCommands) => [...prevCommands, command]);
    setInput(''); // Clear the input field after processing
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((item, index) => (
          <div key={index} className={`output-${item.type}`}>
            {item.content}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span id="dollar">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Terminal;