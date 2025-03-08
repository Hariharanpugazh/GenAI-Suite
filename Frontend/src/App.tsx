import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Use named import for jwt-decode

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
import ManageProducts from './pages/Superadmin/ManageProducts.tsx';

// Protected Route Component
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const token = Cookies.get("jwt"); // Get JWT token from cookies

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  interface DecodedToken {
    role: string;
  }
  
  const decodedToken = jwtDecode<DecodedToken>(token);

  if (adminOnly && decodedToken.role !== 'admin' && decodedToken.role !== 'superadmin') {
    return <Navigate to="/" replace />; // Redirect if not admin or superadmin
  }

  return children; // Render the protected page if token exists and role is valid
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />

        {/* User */}
        {/* <Route path="/login" element={<AuthPage />} /> */}
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products-list" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
        <Route path="/products-page" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />

        {/* Admin */}
        <Route path='/admin_login' element={<AdminLogin />} />
        <Route path='/admin-dashboard' element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin/products' element={<ProtectedRoute adminOnly><AdminProjects /></ProtectedRoute>} />

        {/* SuperAdmin */}
        <Route path="/superadmin_login" element={<SuperAdminLogin />} />
        <Route path="/superadmin-dashboard" element={<ProtectedRoute adminOnly><SuperadminDashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute adminOnly><Products /></ProtectedRoute>} />
        <Route path="/post-product" element={<ProtectedRoute adminOnly><PostProduct /></ProtectedRoute>} />
        <Route path="/manage-products" element={<ProtectedRoute adminOnly><ManageProducts /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
