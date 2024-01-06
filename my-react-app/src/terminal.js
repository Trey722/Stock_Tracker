import React, { useState, useRef } from 'react';
import StockPriceComponent from './COMP/stockComp/getStockInfo';
import OptionsChainComponent from './input/get/optionGet/components/getOptionInfo';
import RiskFreeComponent from './input/get/econGet/components/getRiskFreeRate';
import OptionsProfitAtEachPrice from './COMP/optionComp/calcOptions';
import getGreeks from './input/get/optionGet/components/getOptionGreeks';
import StockGreeksComponent from './input/get/optionGet/components/getOptionGreeks';
import procceseCommands from "./input/paraseCommands"











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
    
    outputContent = procceseCommands(command)


    
    

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