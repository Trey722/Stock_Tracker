import OptionsProfitAtEachPrice from './components/calcOptions';


function CalcOptions(command) {
  try {
    if (command[2] === 'PNL') {
      let ticker = command[3];
      let start = command[4];
      let end = command[5];
      let step = command[6];
      return <OptionsProfitAtEachPrice ticker={ticker} startPrice={start} endPrice={end} stepAmount={step} />;
    }
  } catch (error) {
    console.error('Error in getCalcOptions:', error);

  }
  return null; 
}

export default CalcOptions;
