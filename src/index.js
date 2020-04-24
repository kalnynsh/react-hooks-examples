import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const MyContext = React.createContext();

const App = () => {
  const contextValue = "This is useContext in action";

  return (
    <MyContext.Provider value={contextValue} >
      <Child />
    </MyContext.Provider >
  );
};

const Child = () => {
  const value = useContext(MyContext);

  return (
    <p> {value} </p>
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
