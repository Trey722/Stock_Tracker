import React, { useState, useRef } from 'react';
import StockPriceComponent from './getStockInfo';
import OptionsChainComponent from './getOptionInfo';



function parseCommand(command) {
  console.log("The parsers was called");
    const regex = /--([^']+) ([^']+) ([^']+)/;
    const match = command.match(regex);

    if (match) {
        const new_command = match[1];
        const type = match[2];
        const target = match[3];
        
        return { new_command, type, target };
    }

    console.log("An error with mathcing")
    return null; 
}

function parseCommandDates(command) {
  console.log("The parsers was called");
    const regex = /--([^']+) ([^']+) ([^']+) ([^']+)/;
    const match = command.match(regex);

    if (match) {
        const new_command = match[1];
        const type = match[2];
        const target = match[3];
        const date = match[4]; 

        return { new_command, type, target, date};
    }
    return null; 
}

function excuteGetRequest(command)
{
    if (command['type'].includes("STOCK"))
    {
     
        return <StockPriceComponent stock={command['target']}/>
    }

    else if (command['type'].includes("OPTION"))
    {
      console.log("Option was requetsed");
      return <OptionsChainComponent stock={command['target']} expiration_date={command['date']} />
    }

    else if (command['type'].includes("ECON"))
    {
      
    }

    else {
        return failedToRead(command); 
    }
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
    
    console.log(parsaedCommand['new_command'].length > 3);
  
    if (parsaedCommand === null || (parsaedCommand['new_command'].includes('get') && parsaedCommand['new_command'].length > 3) === true)
    {
      parsaedCommand = parseCommandDates(command); 
    }
    
   console.log(parsaedCommand);
    
    
    
    if (parsaedCommand == null)
    {
        outputContent = failedToRead(command)
    }

    else if (parsaedCommand['new_command'].includes('get'))
    {
      
        outputContent = excuteGetRequest(parsaedCommand); 
    }

    else {
        
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