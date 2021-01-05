import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PlayerList from './PlayerList';
import RankingList from './RankingList';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  appBar: {
    backgroundColor: 'rgba(68, 138, 255, 0.8)',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    outline: 'none',
  }
  
}));

function App() {
  const classes = useStyles();

  return (
    <Router>  
      <div className="App">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tennis Players (React.js to C# WebApi REST endpoint to Postgres)
            </Typography>
            <Button color="inherit"><Link to="/rankingList" className={classes.link}>Rankings</Link></Button>
            <Button color="inherit"><Link to="/playerList" className={classes.link}>Players</Link></Button>
          </Toolbar>
        </AppBar>


        <Switch>
        <Route path="/playerList" component={PlayerList} />
        <Route path="/rankingList" component={RankingList} />
        <Route path="/" component={RankingList} />
        </Switch>


      </div>
    </Router>
  );
}

export default App;
