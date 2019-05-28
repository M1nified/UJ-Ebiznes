import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import CategoriesList from './components/categoriesList/CategoriesList';
import CategoryCreate from './components/categoryCreate/CategoryCreate';
import CategoryDetails from './components/categoryDetails/categoryDetails';
import OrderDetails from './components/orderDetails/OrderDetails';
import OrdersList from './components/ordersList/OrdersList';
import ProductsList from './components/productsList/ProductsList';
import UsersList from './components/usersList/UsersList';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Router>
        <Link to="/users">Users list</Link>
        <Link to="/products">Products list</Link>
        <Link to="/categories">Categories list</Link>
        <Link to="/orders">Orders list</Link>
        <Link to="/categoryAdd">Add category</Link>
        {/* <Route path="/" component={} /> */}
        <Route path="/users" component={UsersList} />
        <Route path="/products" component={ProductsList} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/categoryAdd" component={CategoryCreate} />
        <Route path="/category/:categoryId" component={CategoryDetails} />
        <Route path="/orders" component={OrdersList} />
        <Route path="/order/:orderId" component={OrderDetails} />
      </Router>
    </div>
  );
}

export default App;
