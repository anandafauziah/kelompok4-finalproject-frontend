import Login from "./pages/Login.jsx";
import RegistrationForm from "./pages/Register.jsx";
import Cart from "./pages/cart.jsx";
import ProductPage from "./pages/product";
import DetailProduct from "./pages/detailProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen font-rubik">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart2" component={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
