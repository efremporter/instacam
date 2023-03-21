import React from 'react';
import ReactDOM from 'react-dom';
import myconfigureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      entities: { users: { [window.currentUser.id]: window.currentUser } },
      session: { id: window.currentUser.id }
    };
  };
  delete window.currentUser;
  const store = myconfigureStore(preloadedState);
  ReactDOM.render(<Root store={store} state={store.getState()} />, root);
})