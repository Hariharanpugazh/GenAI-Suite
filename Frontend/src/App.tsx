import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Users/Home';
// import AuthPage from './pages/Users/AuthPage.tsx';
import ProductsList from './pages/Users/ProductsList';
import ProductsPage from './pages/Users/ProductsPage';
import RoleSelection from './pages/Common/RoleSelection.tsx';
import SuperAdminLogin from './pages/Superadmin/SuperAdminLogin.tsx';
import AdminLogin from './pages/Admin/AdminLogin.tsx';
import UserLogin from './pages/Users/UserLogin.tsx';
import SuperadminDashboard from './pages/Superadmin/SuperadminDashboard.tsx';
import Products from './pages/Superadmin/Products.tsx';
import PostProduct from './pages/Superadmin/PostProduct.tsx';
import AdminDashboard from './pages/Admin/AdminDashboard.tsx';
import AdminProjects from './pages/Admin/AdminProjects.tsx';


function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<RoleSelection/>} />

        {/* User */}
        {/* <Route path="/login" element={<AuthPage />} /> */}
          <Route path="/user_login" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products-list" element={<ProductsList/>} />
          <Route path="/products-page" element={<ProductsPage/>} />

          {/* Admin */}
          <Route path='/admin_login' element={<AdminLogin />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin/products' element={<AdminProjects />} />
          {/* SuperAdmin */}
          <Route path="/superadmin_login" element={<SuperAdminLogin />} />
          <Route path="/superadmin-dashboard" element={<SuperadminDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/post-product" element={<PostProduct />} />

        </Routes>
      </Router>
  );
}

export default App;
