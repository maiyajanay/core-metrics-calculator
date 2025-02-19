import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [spend, setSpend] = useState("");
  const [cpm, setCpm] = useState("");
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [ctr, setCtr] = useState("");
  const [cpc, setCpc] = useState(0);
  const [cvr, setCvr] = useState("");
  const [purchases, setPurchases] = useState(0);
  const [aov, setAov] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [roas, setRoas] = useState(0);
  const [cpa, setCpa] = useState(0);

  const [placeholders, setPlaceholders] = useState({
    spend: "Enter spend",
    cpm: "Enter CPM",
    ctr: "Enter CTR",
    cvr: "Enter CVR",
    aov: "Enter AOV",
  });

  const handleFocus = (field: any) => {
    setPlaceholders((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field: any, placeholder: any) => {
    setPlaceholders((prev) => ({ ...prev, [field]: placeholder }));
  };

  const handleInputChange = (field: any, value: any) => {
    if (field === "spend" || field === "cpm" || field === "aov") {
      if (!value.startsWith("$")) {
        value = "$" + value;
      }
      value = value.replace(/[^0-9.]/g, "");
      value = "$" + value;
    } else if (field === "ctr" || field === "cvr") {
      if (!value.endsWith("%")) {
        value = value + "%";
      }
      value = value.replace(/[^0-9.]/g, "");
      value = value + "%";
    }
    switch (field) {
      case "spend":
        setSpend(value);
        break;
      case "cpm":
        setCpm(value);
        break;
      case "ctr":
        setCtr(value);
        break;
      case "cvr":
        setCvr(value);
        break;
      case "aov":
        setAov(value);
        break;
      default:
        break;
    }
  };

  const calculate = () => {
    const spendValue = parseFloat(spend.replace("$", ""));
    const cpmValue = parseFloat(cpm.replace("$", ""));
    const ctrValue = parseFloat(ctr.replace("%", ""));
    const cvrValue = parseFloat(cvr.replace("%", ""));
    const aovValue = parseFloat(aov.replace("$", ""));

    const roundedSpend = Math.ceil(spendValue * 100) / 100;
    const calculatedImpressions =
      Math.ceil((roundedSpend / cpmValue) * 1000 * 100) / 100;
    const calculatedClicks =
      Math.ceil(((calculatedImpressions * ctrValue) / 100) * 100) / 100;
    const calculatedCpc =
      Math.round((roundedSpend / calculatedClicks) * 100) / 100;
    const calculatedPurchases =
      Math.ceil(((calculatedClicks * cvrValue) / 100) * 100) / 100;
    const calculatedRevenue =
      Math.ceil(calculatedPurchases * aovValue * 100) / 100;
    const calculatedRoas =
      Math.round((calculatedRevenue / roundedSpend) * 100) / 100;
    const calculatedCpa =
      Math.round((roundedSpend / calculatedPurchases) * 100) / 100;

    setImpressions(calculatedImpressions);
    setClicks(calculatedClicks);
    setCpc(calculatedCpc);
    setPurchases(calculatedPurchases);
    setRevenue(calculatedRevenue);
    setRoas(calculatedRoas);
    setCpa(calculatedCpa);
  };

  useEffect(() => {
    if (spend || cpm || ctr || cvr || aov) {
      calculate();
    }
  }, [spend, cpm, ctr, cvr, aov]);

  return (
    <>
      <h1>Core Metrics Calculator</h1>
      <div className="input-section">
        <h2>Enter On-Platform Metrics</h2>
        <h3>
          Enter your key metrics below to see how they impact your results.
          Start with your current data for a given time frame, then adjust the
          inputs to explore different scenarios. This will help you understand
          how changes in one metric affect overall performance, identify areas
          for improvement, and refine your campaign strategy to hit your goals.
        </h3>
        <div className="form-inputs">
          <label htmlFor="spend">
            Spend:
            <input
              type="text"
              id="spend"
              value={spend}
              placeholder={placeholders.spend}
              onFocus={() => handleFocus("spend")}
              onBlur={() => handleBlur("spend", "Enter spend")}
              onChange={(e) => handleInputChange("spend", e.target.value)}
            />
          </label>
          <label htmlFor="cpm">
            CPM:
            <input
              type="text"
              id="cpm"
              value={cpm}
              placeholder={placeholders.cpm}
              onFocus={() => handleFocus("cpm")}
              onBlur={() => handleBlur("cpm", "Enter CPM")}
              onChange={(e) => handleInputChange("cpm", e.target.value)}
            />
          </label>
          <label htmlFor="ctr">
            CTR:
            <input
              type="text"
              id="ctr"
              value={ctr}
              placeholder={placeholders.ctr}
              onFocus={() => handleFocus("ctr")}
              onBlur={() => handleBlur("ctr", "Enter CTR")}
              onChange={(e) => handleInputChange("ctr", e.target.value)}
            />
          </label>
          <label htmlFor="cvr">
            CVR:
            <input
              type="text"
              id="cvr"
              value={cvr}
              placeholder={placeholders.cvr}
              onFocus={() => handleFocus("cvr")}
              onBlur={() => handleBlur("cvr", "Enter CVR")}
              onChange={(e) => handleInputChange("cvr", e.target.value)}
            />
          </label>
          <label htmlFor="aov">
            AOV:
            <input
              type="text"
              id="aov"
              value={aov}
              placeholder={placeholders.aov}
              onFocus={() => handleFocus("aov")}
              onBlur={() => handleBlur("aov", "Enter AOV")}
              onChange={(e) => handleInputChange("aov", e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="metrics">
        <h2>Your Results</h2>
        <h4>Engagement Metrics</h4>
        <div className="metric-section">
          <p>Impressions {!impressions ? 0 : impressions.toLocaleString()}</p>
          <p>Clicks {!clicks ? 0 : clicks.toLocaleString()}</p>
          <p>CPC ${!cpc ? 0 : cpc} </p>
        </div>
        <h4>Conversion Metrics</h4>
        <div id="conversion-metrics" className="metric-section">
          <p>Purchases {!purchases ? 0 : purchases.toLocaleString()}</p>
          <p>Conversion Revenue ${!revenue ? 0 : revenue.toLocaleString()}</p>
          <p>ROAS {!roas ? 0 : roas}</p>
          <p>CPA ${!cpa ? 0 : cpa}</p>
        </div>
      </div>
    </>
  );
}

export default App;
