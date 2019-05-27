import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import CategoriesList from './components/categoriesList/CategoriesList';
import ProductsList from './components/productsList/ProductsList';
import UsersList from './components/usersList/UsersList';
import CategoryDetails from './components/categoryDetails/categoryDetails';
import OrdersList from './components/ordersList/OrdersList';
import OrderDetails from './components/orderDetails/OrderDetails';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Link to="/users">Users list</Link>
        <Link to="/products">Products list</Link>
        <Link to="/categories">Categories list</Link>
        <Link to="/orders">Orders list</Link>
        {/* <Route path="/" component={} /> */}
        <Route path="/users" component={UsersList} />
        <Route path="/products" component={ProductsList} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/category/:categoryId" component={CategoryDetails} />
        <Route path="/orders" component={OrdersList} />
        <Route path="/order/:orderId" component={OrderDetails} />
      </Router>
    </div>
  );
}

export default App;
