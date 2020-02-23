import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Company from './Company';
import { Paper, Tabs, Tab } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    marginLeft: '300px',
    marginTop: '30px',
    width: '800px',
    backgroundColor: '#4195B4',
    color: '#fffffe',
    '& a': {
      textDecoration: 'none',
      color: '#fffffe'
    }
  }
});

function SmallNav() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Router>
        <Paper className={classes.nav} square>
          <div>
            <Tabs indicatorColor="primary" textColor="primary" aria-label="disabled tabs example">
              <Link to="/home/company1">
                <Tab name="c1" label="Company 1" />
              </Link>
              <Link to="/home/company2">
                <Tab name="c2" label="Company 2" />
              </Link>
              <Link to="/home/company3">
                <Tab name="c3" label="Company 3" />
              </Link>
              <Link to="/home/company4">
                <Tab name="c4" label="Company 4" />
              </Link>
              <Link to="/home/company5">
                <Tab name="c5" label="Company 5" />
              </Link>
            </Tabs>
          </div>
        </Paper>
        <div>
          <Switch>
            <Route exact path="/home/company1">
              <div>
                <Company />
              </div>
            </Route>
            <Route exact path="/home/company2">
              <div>
                <Company />
              </div>
            </Route>
            <Route exact path="/home/company3">
              <div>
                <Company />
              </div>
            </Route>
            <Route exact path="/home/company4">
              <div>
                <Company />
              </div>
            </Route>
            <Route exact path="/home/company5">
              <div>
                <Company />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default SmallNav;
