import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './App.scss';
import PanelsList from './components/panelsList/PanelsList';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Router>
        {/* <PanelsList /> */}
      </Router>
    </div>
  );
}

export default App;
