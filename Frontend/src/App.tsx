import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';
import SetPasswordPage from './pages/SetPasswordPage';
import Home from './pages/Home';
import SignUpPage from './pages/signup-page';
import ProductsList from './pages/ProductsList';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/set-password" element={<SetPasswordPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/products-list" element={<ProductsList/>} />
          <Route path="/product" element={<ProductsPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
