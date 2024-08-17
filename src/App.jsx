import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Details from "./components/Details";
import PushNotification from "./components/PushNotification";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-details" element={<Details />} />
          <Route path="/pushn" element={<PushNotification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
