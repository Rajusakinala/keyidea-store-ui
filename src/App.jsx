import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Details from "./components/Details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
