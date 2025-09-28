import { useState, useEffect } from "react";
import frontendMap from "../data/frontend_map.json";
import "bootstrap/dist/css/bootstrap.min.css";

function LlmForm() {
  const [stock, setStock] = useState(frontendMap[0].ticker);
  const [sector, setSector] = useState(frontendMap[0].category);
  const [subSector, setSubSector] = useState(frontendMap[0].subcategory);
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [tg, setTg] = useState(null);
  const [search, setSearch] = useState(""); // New state for search

  // Filter stocks based on search text
  const filteredStocks = frontendMap.filter((s) =>
    s.ticker.toLowerCase().includes(search.toLowerCase())
  );

  // Ensure sector & subsector updates when stock changes
  useEffect(() => {
    const found = frontendMap.find((s) => s.ticker === stock);
    setSector(found ? found.category : "");
    setSubSector(found ? found.subcategory : "");
  }, [stock]);

  // Auto-update stock when search changes
  useEffect(() => {
    if (filteredStocks.length > 0) {
      const exists = filteredStocks.some((s) => s.ticker === stock);
      if (!exists) setStock(filteredStocks[0].ticker);
    } else {
      setStock("");
      setSector("");
      setSubSector("");
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
    if (!stock || !price || !currentPrice) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      stock,
      sector,
      subSector,
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
    <div className="m-2">
      <h2 className="mb-4 text-center">📊 Stock Analysis</h2>
      <form>
        {/* Search */}
        <div className="mb-3">
          <label className="form-label">Search Stock</label>
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search stock"
          />
        </div>

        {/* Stock Dropdown */}
        <div className="mb-3">
          <label className="form-label">Choose Stock</label>
          <select
            className="form-select"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
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
        </div>

        {/* Sector */}
        <div className="mb-3">
          <label className="form-label">Sector</label>
          <input type="text" className="form-control" value={sector} readOnly />
        </div>

        {/* SubSector */}
        <div className="mb-3">
          <label className="form-label">Sub-Sector</label>
          <input
            type="text"
            className="form-control"
            value={subSector}
            readOnly
          />
        </div>

        {/* Entry Price */}
        <div className="mb-3">
          <label className="form-label">Entry Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Current Price */}
        <div className="mb-3">
          <label className="form-label">Current Market Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LlmForm;
