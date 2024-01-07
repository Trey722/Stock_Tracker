import excuteGetOption from '../../get/optionGet/getOption';
import OptionsProfitAtEachPrice from './components/calcOptions';
import DeltaGammaHedging from './components/hedgeComponenet';


function CalcOptions(command) {
  try {
    if (command[2] === 'PNL') {
      let ticker = command[3];
      let start = command[4];
      let end = command[5];
      let step = command[6];

     
      console.log(step * 18)
      console.log(end - start)
      if (start < 0) // Checks to make sure start is non negative
      {
        return <p id="negative">Error: Can not use negative prices</p>
      }

      else if (end < start) //checks to make sure end is not less then start and also not negative because if start > 0 and end > start. end > 0 
      {
        return <p id="negative">Error: End must be greater then start</p>
      }

      else if (step <= 0) //Prevents a 0 or negative step 
      {
        return <p id="negative">Error: Step must be greater then 0 for speed try to use greater then 1</p>
      }

      else if ((step * 18) < (end - start))
      {
        return <p id="negative">This operation is too computational intense for the computer system. Make sure step * 18 is less then end - start. We are currently working on this</p>
      }

      else 
      {
      return <OptionsProfitAtEachPrice ticker={ticker} startPrice={start} endPrice={end} stepAmount={step} />;
      }


    }

    else if (command[2] === "HEDGE")
    {
      console.log("Recieved hedge request");
      try
      {
        let quantity = parseFloat(command[3])
        let delta = parseFloat(command[4])
        let gamma1 = parseFloat(command[5])
        let delta2 = parseFloat(command[6])
        let gamma2 = parseFloat(command[7])

        return <DeltaGammaHedging quantity={quantity} delta1={delta} gamma1={gamma1} delta2={delta2} gamma2={gamma2}/>
      }

      catch (error)
      {
        return <p>Could not understand request</p>
      }


    }
  }
  
  
  catch (error) {
    console.error('Error in getCalcOptions:', error);

  }
  return null; 
}

export default CalcOptions;
