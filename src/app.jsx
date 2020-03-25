import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

import './styles.scss';

const App = () => {
  return (
    <div className="app">
      <Board />
    </div>
  );
};

const rootElement = document.body;
ReactDOM.render(<App />, rootElement);

export default App;
