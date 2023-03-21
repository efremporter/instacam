import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

const App = () => {
  return (
    <>
      {/* <ProtectedRoute path="/" component={} /> */}
      {/* <Switch>
        <ProtectedRoute />
      </Switch> */}
      <div>Instacam</div>
    </>
  )
}

export default App;