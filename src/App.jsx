import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LlmForm from "./LlmForm";
import BrokerLogin from "./BrokerLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LlmForm />} />
        <Route path="/login" element={<BrokerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
