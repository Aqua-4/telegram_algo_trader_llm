import { useState, useEffect } from "react";
import frontendMap from "../data/frontend_map.json";

function LlmForm() {
  const [stock, setStock] = useState(frontendMap[0].ticker);
  const [sector, setSector] = useState(frontendMap[0].category);
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [tg, setTg] = useState(null);
  const [search, setSearch] = useState(""); // New state for search

  // Filter stocks based on search text
  const filteredStocks = frontendMap.filter((s) =>
    s.ticker.toLowerCase().includes(search.toLowerCase())
  );

  // Ensure sector updates when stock changes
  useEffect(() => {
    const found = frontendMap.find((s) => s.ticker === stock);
    setSector(found ? found.category : "");
  }, [stock]);

  // Ensure stock auto-updates when search result changes
  useEffect(() => {
    if (filteredStocks.length > 0) {
      // If current stock is not in filtered list, pick first result
      const exists = filteredStocks.some((s) => s.ticker === stock);
      if (!exists) {
        setStock(filteredStocks[0].ticker);
      }
    } else {
      // Nothing found, clear stock & sector
      setStock("");
      setSector("");
    }
  }, [filteredStocks]);

  // Poll every 100ms until Telegram.WebApp exists
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        setTg(window.Telegram.WebApp);
        clearInterval(interval);
        console.log("Telegram WebApp is ready!");
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!stock) {
      alert("Please select a valid stock");
      return;
    }
    if (!price) {
      alert("Please enter a price");
      return;
    }
    if (!currentPrice) {
      alert("Please enter a current market price");
      return;
    }

    const payload = {
      stock,
      sector,
      price: parseFloat(price),
      currentPrice: parseFloat(currentPrice),
    };

    if (tg) {
      payload["type"] = "stock_analysis";
      payload["initData"] = tg.initData;

      tg.sendData(JSON.stringify(payload));
      tg.close();
    } else {
      console.log("Debug mode: ", payload);
      alert("Submitted (debug mode): " + JSON.stringify(payload));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>📊 Stock Analysis</h2>

      <label>Search Stock:</label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search stock"
        style={{ marginBottom: 10, width: "100%" }}
      />

      <br />
      <br />

      <label>Choose Stock:</label>
      <select
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{ width: "100%" }}
      >
        {filteredStocks.length === 0 ? (
          <option disabled>No stocks found</option>
        ) : (
          filteredStocks.map((s) => (
            <option key={s.ticker} value={s.ticker}>
              {s.ticker}
            </option>
          ))
        )}
      </select>

      <br />
      <br />

      <label>Sector:</label>
      <input type="text" value={sector} readOnly />

      <br />
      <br />

      <label>Entry Price:</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <label>Current Market Price:</label>
      <input
        type="number"
        step="0.01"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit} style={{ padding: "0.6em 1.2em" }}>
        Submit
      </button>
    </div>
  );
}

export default LlmForm;
