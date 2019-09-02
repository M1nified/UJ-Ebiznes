import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import PanelsList from './components/panelsList/PanelsList';
import AdminsList from './components/admins/list/AdminsList';
import AdminCreate from './components/admins/create/AdminCreate';
import UsersList from './components/users/list/UsersList';
import UserCreate from './components/users/create/UserCreate';
import InventoriesList from './components/inventories/list/InventoriesList';
import InventoryCreate from './components/inventories/create/InventoryCreate';
import ProductsList from './components/products/list/ProductsList';
import ProductCreate from './components/products/create/ProductCreate';
import CategoriesList from './components/categories/list/CategoriesList';
import CategoryCreate from './components/categories/create/CategoryCreate';
import CategoryDetails from './components/categories/details/CategoryDetails';
import OrdersList from './components/orders/list/OrdersList';
import OrderDetails from './components/orders/details/OrderDetails';
import OrderCreate from './components/orders/create/OrderCreate';
import OrderProductsList from './components/orderProducts/list/OrderProductsList';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Router>
        {/* <Route path="/" component={} /> */}
        <Route path="/adminPanels" component={PanelsList} />
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
        <Route path="/orderProductAdd" component={PanelsList} />
      </Router>
    </div>
  );
}

export default App;
