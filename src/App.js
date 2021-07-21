
import './App.css';
import { useState, useEffect } from "react";
import MyCard from "./MyCard";
import "leaflet/dist/leaflet.css";

function App() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_z0pCzs3DoY29z5TNZGFZp9Wkv4AMj&ipAddress`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
         {/* <button onClick={getDetails}>GET IP</button> */}
      {isLoading ? <h2>{details.ip}</h2> : <MyCard details={details} />}
   
      </header>
    </div>
  );
}

export default App;
