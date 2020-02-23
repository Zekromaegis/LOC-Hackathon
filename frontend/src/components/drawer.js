import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, List, Drawer, Typography, ListItemIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Link } from 'react-router-dom';

const usestyles = makeStyles({
  drawer: {
    width: '250px',
    flexShrink: 0
  },
  drawerPaper: {
    width: '250px',
    backgroundColor: '#4195B4',
    color: '#fffffe'
  },
  listItem: {},
  listItemText: {
    fontWeight: '700'
  },
  listItemIcon: {
    marginLeft: '5px'
  }
});

const DrawerLeft = () => {
  const classes = usestyles();

  return (
    <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }} anchor="left">
      <List>
        <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <HomeIcon style={{ color: '#F4F9FA' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5" className={classes.listItemText}>
                Home
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <AccountCircleIcon style={{ color: '#F4F9FA' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5" className={classes.listItemText}>
                Profile
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/suggestions" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <TrendingUpIcon style={{ color: '#F4F9FA' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5" className={classes.listItemText}>
                Suggestions
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/business" style={{ color: 'inherit', textDecoration: 'none' }}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <BusinessIcon style={{ color: '#F4F9FA' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5" className={classes.listItemText}>
                Business
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default DrawerLeft;
