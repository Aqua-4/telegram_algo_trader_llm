import { useState } from "react";

function App() {
  const [stock, setStock] = useState("RELIANCE");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!price) {
      alert("Please enter a price");
      return;
    }
    const payload = { stock, price: parseFloat(price) };
    window.Telegram.WebApp.sendData(JSON.stringify(payload));
    window.Telegram.WebApp.close();
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

      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        Submit
      </button>
    </div>
  );
}

export default App;
