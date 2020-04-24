import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div
        style={{ margin: 'auto', padding: '2% 1%', backgroundColor: 'Beige', width: '30%' }}
      >
        <button
          style={{ padding: '2%', marginRight: '2%', backgroundColor: 'AntiqueWhite', width: '10%' }}
          onClick={() => setValue((v) => v + 1)}
        >
          +
        </button>
        <button
          style={{ padding: '2%', backgroundColor: 'DarkGoldenRod', width: '10%' }}
          onClick={() => setVisible(false)}
        >
            hide
          </button>
          <ClassCounter value={value} />
          <HookCounter value={value} />
      </div>
    );
  }

  if (!visible) {
    return (
      <button
      style={{ margin: 'auto', padding: '1%', backgroundColor: 'CadetBlue', width: '10%' }}
        onClick={() => setVisible(true)}
      >
        show
      </button>
    );
  }
};

const HookCounter = ({ value }) => {

  useEffect(() => {
    console.log('I am the useEffect function');

    return () => console.log('clear');
  }, [ value ]);

  return (
    <p> {value} </p>
  );
};

class ClassCounter extends Component {

  componentDidMount() {
    console.log('class: mount');
  }

  componentDidUpdate(props) {
    console.log('class: update');
  }

  componentWillUnmount() {
    console.log('class: unmount');
  }

  render() {
    const {value} = this.props;

    return (
      <p> {value} </p>
    );
  };
}

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
