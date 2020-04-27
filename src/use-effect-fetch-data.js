import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [value, setValue] = useState(400);
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
          <CharacterInfo id={value} />
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

const useCharacterInfo = (id) => {

  const [ name, setName ] = useState(null);
  const [ culture, setCulture ] = useState(null);

  const baseUrl = 'https://www.anapioficeandfire.com/api/characters';

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/${id}`)
      .then(result => result.json())
      .then(data => {
        !cancelled && setName(data.name);
        !cancelled && setCulture(data.culture);
      })
      .catch(error => console.error(error))
    ;

    return () => cancelled = true;
  }, [id]);

  return {
    name: name,
    culture: culture
  };
};

const CharacterInfo = ({ id }) => {

  const {name, culture} = useCharacterInfo(id);

  return (
    <div>
      {id} - {name}, {culture} ? {culture} : 'not specified'
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
