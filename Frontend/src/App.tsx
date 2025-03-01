import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Users/Home';
// import AuthPage from './pages/Users/AuthPage.tsx';
import ProductsList from './pages/Users/ProductsList';
import ProductsPage from './pages/Users/ProductsPage';
import RoleSelection from './pages/Common/RoleSelection.tsx';
import SuperAdminLogin from './pages/Superadmin/SuperAdminLogin.tsx';
import AdminLogin from './pages/Admin/AdminLogin.tsx';
import UserLogin from './pages/Users/UserLogin.tsx';

function App() {
  return (
      <Router>
        <Routes>
        {/* <Route path="/login" element={<AuthPage />} /> */}
          <Route path="/user_login" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path='/admin_login' element={<AdminLogin />} />
          <Route path="/superadmin_login" element={<SuperAdminLogin />} />
          <Route path="/products-list" element={<ProductsList/>} />
          <Route path="/products-page" element={<ProductsPage/>} />
          <Route path="/" element={<RoleSelection/>} />
        </Routes>
      </Router>
  );
}

export default App;
