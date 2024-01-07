import CalcOptions from "./calcOption/calcOptionPNL";
import procceseStockCalcs from "./calcStock/procceseStock";



function CalcProccese(comamnd)
{
    console.log("Proccesing calcualtion request ", comamnd[1]);
     if (comamnd[1] === 'OPTION')
     {
        return CalcOptions(comamnd); 
     }

     else if (comamnd[1] === "STOCK")
     {
      console.log('Requesting STOCK calculate')
      return procceseStockCalcs(comamnd); 
     }

     else 
     {
        return 'failed to read';
     }
}

export default CalcProccese;