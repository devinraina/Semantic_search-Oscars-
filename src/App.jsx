import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState();
  const [param, setParam] = useState();
  const [res, setRes] = useState();
  
  useEffect(() => {
    const promptValue = document.getElementById('prompt').value;
    const yearValue = parseInt(document.getElementById('year').value) || "";

    if (promptValue && yearValue !== null && promptValue && yearValue !== undefined && !isNaN(yearValue)) {
      setParam(promptValue);
      
      setRes(yearValue);
      
    }
  }, [res]);

  const handleYearChange = (event) => {
    // Access the selected value
    const selectedYear = event.target.value;
    // Update the state (replace with your actual state management approach)
    setRes(selectedYear); // Assuming you have a state variable called 'res'
    console.log('Selected year:', selectedYear); // Optional: log the selected year
  };
  const handle = (event) => {
    // Access the selected value
    const prompt = event.target.value;
    // Update the state (replace with your actual state management approach)
    setRes(prompt); // Assuming you have a state variable called 'res'
    console.log('Selected year:', prompt); // Optional: log the selected year
  };


  const callAPI = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/run_foo?param_prompt=${param}&param_year=${res}`);
      const data = await response.json();
      setApiResponse(data.result);
      console.log(res);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors appropriately
    }
  };

  return (
    <>
      <h1>Oscars Info AI</h1>
      <label>Prompt:</label>
      <input type="text" id='prompt' name='prompt' on onChange={handle} />
      <select className="form-select" id='year' name="year" onChange={handleYearChange}>
        <option value="">Year</option>
          {Array.from({ length: 93 }).map((_, index) => (
            <option key={index} value={index + 1932}>
            {index + 1932}
            </option>
          ))}
      </select>
      <button onClick={callAPI}>Send</button>
      <p>API response:</p>
      {apiResponse ? (
        <p id="api-response">{apiResponse}</p>
      ) : (
        <div className="circular-loader"></div>
      )}
    </>
  );
}

export default App;