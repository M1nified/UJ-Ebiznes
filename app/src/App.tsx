import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import AdminCreate from './components/admins/create/AdminCreate';
import AdminsList from './components/admins/list/AdminsList';
import CategoryCreate from './components/categories/create/CategoryCreate';
import CategoryDetails from './components/categories/details/CategoryDetails';
import CategoriesList from './components/categories/list/CategoriesList';
import Home from './components/home/Home';
import InventoryCreate from './components/inventories/create/InventoryCreate';
import InventoriesList from './components/inventories/list/InventoriesList';
import OrderProductsList from './components/orderProducts/list/OrderProductsList';
import OrderCreate from './components/orders/create/OrderCreate';
import OrderDetails from './components/orders/details/OrderDetails';
import OrdersList from './components/orders/list/OrdersList';
import PanelsList from './components/panelsList/PanelsList';
import ProductCreate from './components/products/create/ProductCreate';
import ProductsList from './components/products/list/ProductsList';
import UserCreate from './components/users/create/UserCreate';
import UsersList from './components/users/list/UsersList';
import LoginRoute from './components/routes/login/LoginRoute';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;

type AppState = {
  authenticated: boolean,
  shouldRedirectLogin: boolean,
}

class App extends Component<any, AppState> {

  render() {
    return (
      
      <div className="App container">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/c/:categoryId" component={Home} />
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
          <Route path="/login" component={LoginRoute} />
        </Router>
      </div>
    );
  }

}

export default App;
