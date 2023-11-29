import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserProvider } from './UserContext.js'; // 导入 UserProvider
import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from={`/`} to="/auth/signin" />
        </Switch>
      </HashRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
