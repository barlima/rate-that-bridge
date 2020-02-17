import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import UserContext from './context/userContext';
import userReducer from './reducers/user';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  credentials: 'include',
});

const App = () => (
  <ApolloProvider client={client} >
    <UserContext.Provider value={useReducer(userReducer, {})}>
      <AppRouter />
    </UserContext.Provider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
