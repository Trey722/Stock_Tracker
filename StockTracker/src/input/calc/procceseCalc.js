import CalcOptions from "./calcOption/calcOptionPNL";



function CalcProccese(comamnd)
{
    console.log("Proccesing calcualtion request ", comamnd[1]);
     if (comamnd[1] === 'OPTION')
     {
        return CalcOptions(comamnd); 
     }

     else 
     {
        return 'failed to read';
     }
}

export default CalcProccese;