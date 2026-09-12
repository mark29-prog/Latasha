import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ivory">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;