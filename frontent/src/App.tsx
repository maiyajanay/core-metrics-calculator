import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [spend, setSpend] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [ctr, setCtr] = useState(0);
  const [cpc, setCpc] = useState(0);
  const [cvr, setCvr] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [aov, setAov] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [roas, setRoas] = useState(0);
  const [cpa, setCpa] = useState(0);

  const calculate = () => {
    const calculatedImpressions = (spend / cpm) * 1000;
    const calculatedClicks = (calculatedImpressions * ctr) / 100;
    const calculatedCpc = spend / calculatedClicks;
    const calculatedPurchases = (calculatedClicks * cvr) / 100;
    const calculatedRevenue = calculatedPurchases * aov;
    const calculatedRoas = calculatedRevenue / spend;
    const calculatedCpa = spend / calculatedPurchases;

    setImpressions(calculatedImpressions);
    setClicks(calculatedClicks);
    setCpc(calculatedCpc);
    setPurchases(calculatedPurchases);
    setRevenue(calculatedRevenue);
    setRoas(calculatedRoas);
    setCpa(calculatedCpa);
  };

  return (
    <>
      <h1>Core Metrics Calculator</h1>
      <div className="inputs">
        <label htmlFor="spend">Spend:</label>
        <input
          type="number"
          id="spend"
          value={spend}
          onChange={(e) => setSpend(Number(e.target.value))}
        />
        <label htmlFor="cpm">CPM:</label>
        <input
          type="number"
          id="cpm"
          value={cpm}
          onChange={(e) => setCpm(Number(e.target.value))}
        />
        <label htmlFor="ctr">CTR:</label>
        <input
          type="number"
          id="ctr"
          value={ctr}
          onChange={(e) => setCtr(Number(e.target.value))}
        />
        <label htmlFor="cvr">CVR:</label>
        <input
          type="number"
          id="cvr"
          value={cvr}
          onChange={(e) => setCvr(Number(e.target.value))}
        />
        <label htmlFor="aov">AOV:</label>
        <input
          type="number"
          id="aov"
          value={aov}
          onChange={(e) => setAov(Number(e.target.value))}
        />
      </div>
      <button onClick={calculate}>Calculate Metrics</button>
      <div className="results">
        <p>Spend ${spend}</p>
        <p>CPM ${cpm}</p>
        <p>CTR {ctr}%</p>
        <p>CVR {cvr}%</p>
        <p>AOV ${aov}</p>
        <p>Impressions {impressions}</p>
        <p>Clicks {clicks}</p>
        <p>CPC {cpc} </p>
        <p>Purchases {purchases}</p>
        <p>Revenue ${revenue}</p>
        <p>ROAS {roas}</p>
        <p>CPA {cpa}</p>
      </div>
    </>
  );
}

export default App;
