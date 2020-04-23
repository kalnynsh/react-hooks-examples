import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <HookSwitcher />
  );
};

const HookSwitcher = () => {

  const [ bgColor, setBgColor ] = useState('white');
  const [ fontSize, setFontSize] = useState(14);

  return (
    <div
      style={{ padding: '5%', backgroundColor: bgColor, width: '33%' }}
    >
      <button
        style={{marginRight: '2%', fontSize: `${fontSize}px`}}
        onClick={ () => setBgColor('blue') }
      >
        Blue
      </button>
      <button
        style={{marginRight: '2%', fontSize: `${fontSize}px`}}
        onClick={ () => setBgColor('gray') }
      >
        Gray
      </button>
      <button
        style={{marginRight: '2%', fontSize: `${fontSize}px`}}
        onClick={ () => setFontSize((s) => s + 2)}
      >
        Font size up
      </button>
      <button
        style={{fontSize: `${fontSize}px`}}
        onClick={ () => setFontSize((s) => s - 2)}
      >
        Font size down
      </button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
