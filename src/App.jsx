import './App.css';
import { useState } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState();  // Store API response

  let param= 40;

  const callAPI = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/run_foo?param_to_foo=${param}`);
      const data = await response.json();
      setApiResponse(data.result);  // Update state with API response
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  return (
    <>
      <h1>Oscars Info AI</h1>
      <label>Number to pass to foo:</label>
      <button onClick={callAPI}>Send</button>
      <p>API response:</p>
      {apiResponse ? (
        <p id="api-response">{apiResponse}</p>
      ) : (
        <p>Awaiting API response...</p>
      )}
    </>
  );
}

export default App;