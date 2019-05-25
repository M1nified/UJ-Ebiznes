import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UsersList from './components/usersList/UsersList';
import ProductsList from './components/productsList/ProductsList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Link to="/users">Users list</Link>
        <Link to="/products">Products list</Link>
        {/* <Route path="/" component={} /> */}
        <Route path="/users" component={UsersList} />
        <Route path="/products" component={ProductsList} />
      </Router>
    </div>
  );
}

export default App;
