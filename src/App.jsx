import ProductPage from "./pages/product";
import DetailProduct from "./pages/detailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="min-h-screen font-rubik">
      <Router>
        <Routes>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
