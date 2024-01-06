
function failedToRead(command)
{
    return (
        <div>
          <p className="error">Could not find command '{command}'.</p>
          <p>Type -help for help.</p>
          
        </div>
      );

}

export default failedToRead