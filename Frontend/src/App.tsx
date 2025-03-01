import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Users/Home';
import AuthPage from './pages/Users/AuthPage.tsx';
import ProductsList from './pages/Users/ProductsList';
import ProductsPage from './pages/Users/ProductsPage';
import RoleSelection from './pages/Common/RoleSelection.tsx';

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/login" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/products-list" element={<ProductsList/>} />
          <Route path="/products-page" element={<ProductsPage/>} />
          <Route path="/" element={<RoleSelection/>} />
        </Routes>
      </Router>
  );
}

export default App;
