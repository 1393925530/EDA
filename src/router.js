import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import Ability from './routes/Personal/Ability';
// import Fight from './routes/Personal/Fight';
import RoleManager from './routes/System/Role';
import UserManager from './routes/System/User';
import LogManager from './routes/System/Log';
import ParamSetting from './routes/System/Param';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={UserManager} />
        {/*<Route path="/personal/ability" exact component={Ability} />*/}
        {/*<Route path="/personal/fight" exact component={Fight} />*/}
        <Route path="/sys/role-manager" exact component={RoleManager} />
        <Route path="/sys/user-manager" exact component={UserManager} />
        <Route path="/sys/log-manager" exact component={LogManager} />
        <Route path="/sys/param-setting" exact component={ParamSetting} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
