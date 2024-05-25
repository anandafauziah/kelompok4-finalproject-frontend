import Login from  './pages/Login.jsx'
import RegistrationForm from './pages/Register.jsx'
import ProductPage from "./pages/product";
import DetailProduct from "./pages/detailProduct";
import Payment from "./pages/Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="min-h-screen font-rubik">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="register" element={<RegistrationForm/>} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
          <Route path="/payment" element={<Payment />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
