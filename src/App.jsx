import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState();  // Store API response
  let param=document.getElementById('prompt')? document.getElementById('prompt').value : "";
  let res=document.getElementById('year')?document.getElementById('year').value :"2023";
  const callAPI = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/run_foo?param_prompt=${param}&param_year=${res}`);
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
      <label>Prompt:</label>
      <input type="text" id='prompt' />
      <select class="form-select" id='year' name="year">
        <option value="">Year</option>
        {Array.from({ length: 93 }).map((_, index) => (  // Assuming 100 years
    <option key={index} value={index + 1932}>{index + 1932}</option>
  ))}
      </select>
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