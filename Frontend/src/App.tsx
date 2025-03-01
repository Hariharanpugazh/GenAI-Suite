import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/LoginPage';
import ForgotPasswordPage from './pages/Users/ForgotPasswordPage';
import VerifyCodePage from './pages/Users/VerifyCodePage';
import SetPasswordPage from './pages/Users/SetPasswordPage';
import Home from './pages/Users/Home';
import SignUpPage from './pages/Users/signup-page';
import ProductsList from './pages/Users/ProductsList';
import ProductsPage from './pages/Users/ProductsPage';

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
          <Route path="/  " element={<ProductsPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
