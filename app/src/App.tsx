import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import AdminCreate from './components/admins/create/AdminCreate';
import AdminsList from './components/admins/list/AdminsList';
import CategoryCreate from './components/categories/create/CategoryCreate';
import CategoryDetails from './components/categories/details/CategoryDetails';
import CategoriesList from './components/categories/list/CategoriesList';
import InventoryCreate from './components/inventories/create/InventoryCreate';
import InventoriesList from './components/inventories/list/InventoriesList';
import OrderCreate from './components/orders/create/OrderCreate';
import OrderDetails from './components/orders/details/OrderDetails';
import OrdersList from './components/orders/list/OrdersList';
import ProductCreate from './components/products/create/ProductCreate';
import ProductsList from './components/products/list/ProductsList';
import UserCreate from './components/users/create/UserCreate';
import UsersList from './components/users/list/UsersList';
import OrderProductsList from './components/orderProducts/list/OrderProductsList';
import OrderProductCreate from './components/orderProducts/create/OrderProductCreate';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Router>
        <div>
          <Link to="/users">Users list</Link>
          <Link to="/userAdd">User add</Link>
        </div>
        <div>
          <Link to="/admins">Admins list</Link>
          <Link to="/adminAdd">Admin add</Link>
        </div>
        <div>
          <Link to="/products">Products list</Link>
          <Link to="/productAdd">Add product</Link>
        </div>
        <div>
          <Link to="/inventories">Inventories list</Link>
          <Link to="/inventoryAdd">Add inventory</Link>
        </div>
        <div>
          <Link to="/categories">Categories list</Link>
          <Link to="/categoryAdd">Add category</Link>
        </div>
        <div>
          <Link to="/orders">Orders list</Link>
          <Link to="/orderAdd">Order add</Link>
        </div>
        <div>
          <Link to="/orderProducts">OrderProducts list</Link>
          <Link to="/orderProductAdd">OrderProduct add</Link>
        </div>
        {/* <Route path="/" component={} /> */}
        <Route path="/admins" component={AdminsList} />
        <Route path="/adminAdd" component={AdminCreate} />
        <Route path="/users" component={UsersList} />
        <Route path="/userAdd" component={UserCreate} />
        <Route path="/inventories" component={InventoriesList} />
        <Route path="/inventoryAdd" component={InventoryCreate} />
        <Route path="/products" component={ProductsList} />
        <Route path="/productAdd" component={ProductCreate} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/categoryAdd" component={CategoryCreate} />
        <Route path="/category/:categoryId" component={CategoryDetails} />
        <Route path="/orders" component={OrdersList} />
        <Route path="/order/:orderId" component={OrderDetails} />
        <Route path="/orderAdd" component={OrderCreate} />
        <Route path="/orderProducts" component={OrderProductsList} />
        <Route path="/orderProductAdd" component={OrderProductCreate} />
      </Router>
    </div>
  );
}

export default App;
