import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const getBaseUrl = () => 'https://www.anapioficeandfire.com/api/characters';

const App = () => {
  const [value, setValue] = useState(400);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div
        style={{ margin: 'auto', padding: '2% 1%', backgroundColor: 'Beige', width: '40%' }}
      >
        <div style={{ margin: '0 0 15px 0'}}>
          <button
            style={{ padding: '1.7% %2', marginRight: '2%', backgroundColor: 'AntiqueWhite', width: '10%' }}
            onClick={() => setValue((v) => v + 1)}
          >
            +
          </button>
          <button
            style={{ padding: '1.7% %2', marginRight: '2%', backgroundColor: 'AntiqueWhite', width: '10%' }}
            onClick={() => setValue((v) => v - 1)}
          >
            -
          </button>
          <button
            style={{ padding: '1.7% %2', backgroundColor: 'DarkGoldenRod', width: '10%' }}
            onClick={() => setVisible(false)}
          >
              hide
            </button>
          </div>
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

const getCharacter = (id) => {
  const baseUrl = getBaseUrl();

  return fetch(baseUrl + '/' + id)
    .then(result => result.json())
    .then(data => data)
    .catch(error => console.error(error))
  ;
};

const useRequest = (request) => {

  const initialState = useMemo(() => ({
    data: null,
    error: null,
    loading: true,
  }), []);

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);

    let cancelled = false;

    request()
      .then(data => !cancelled && setDataState({
        data,
        error: null,
        loading: false,
      }))
      .catch(error => {
        !cancelled
        &&
        setDataState({
          data: null,
          error,
          loading: false,
        });
      })
    ;

    return () => cancelled = true;
  }, [ request, initialState ]);

  return dataState;
};

const useCharacterInfo = (id) => {
  const request = useCallback(
    () => getCharacter(id),
    [ id ]
  );

  return useRequest(request);
};

const CharacterInfo = ({ id }) => {
  const result = useCharacterInfo(id);

  if (typeof result === 'undefined' || result === null) {
    return <div>Fetching data ...</div>;
  }

  const {data, loading, error} = result;

  if (error) {
    return <div>Something is wrong</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (data) {
    return (
      <div>
        <ul>
          <li>ID: {id}</li>
          <li>name: {data.name}</li>
          <li>gender: {data.gender}</li>
          <li>born: {data.born}</li>
          <li>died: {data.died}</li>
        </ul>
      </div>
    );
  }
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
