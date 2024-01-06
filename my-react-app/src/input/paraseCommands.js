import excuteGetRequest from "./get/procceseGetRequest"
import failedToRead from "./errorFunction";

function procceseCommands(command)
{
    let parsaedCommand

    parsaedCommand = parseCommand(command);

    
    if (parsaedCommand[0] == "--get")
    {
      console.log("Excuting get request")
      console.log("We received command", command);
      return excuteGetRequest(parsaedCommand);
      
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