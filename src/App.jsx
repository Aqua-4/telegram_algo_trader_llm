import { useState, useEffect } from "react";

function App() {
  const [stock, setStock] = useState("RELIANCE");
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [tg, setTg] = useState(null); // Telegram WebApp object

  useEffect(() => {
    // Poll every 100ms until Telegram.WebApp exists
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
    if (!price) {
      alert("Please enter a price");
      return;
    }
    if (!currentPrice) {
      alert("Please enter a current market price");
      return;
    }

    const payload = { stock, price: parseFloat(price), currentPrice: parseFloat(currentPrice) };

    if (tg) {
      // Running inside Telegram
      tg.sendData(JSON.stringify(payload));
      tg.close();
    } else {
      // Running in browser/debug
      console.log("Debug mode: ", payload);
      alert("Submitted (debug mode): " + JSON.stringify(payload));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>📊 Stock Analysis</h2>

      <label>Choose Stock:</label>
      <select value={stock} onChange={(e) => setStock(e.target.value)}>
        <option value="RELIANCE">Reliance</option>
        <option value="INFY">Infosys</option>
        <option value="TCS">TCS</option>
        <option value="HDFCBANK">HDFC Bank</option>
      </select>

      <br /><br />

      <label>Entry Price:</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <label>Current Market Price:</label>
      <input
        type="number"
        step="0.01"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(e.target.value)}
      />


      <br /><br />

      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        Submit
      </button>
    </div>
  );
}

export default App;
