import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { FormControl, Typography, Divider, TextField, Button } from '@material-ui/core/';
import { Select, MenuItem } from '@material-ui/core/';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core/';
import DrawerLeft from './drawer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '15px',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  paper: {
    width: '80%',
    height: '1480px',
    margin: '80px auto',
    padding: '40px',
    textAlign: 'center'
  },
  segment: {
    padding: '20px',
    '& input': {
      width: '230px'
    }
  },
  formControl: {
    margin: theme.spacing(3)
  },
  div1: {
    width: '250px'
  },
  heading: {
    width: '120px',
    marginTop: '20px',
    marginLeft: '30px'
  }
}));
// 0 -web 1-app 2- software 3-ml, 0-female , 1- male
export default function Profile() {
  const classes = useStyles();
  const [personal, setPersonal] = React.useState({ gender: 1, name: '' });
  const [academics, setAcademics] = React.useState({ tenthper: '', twelthper: '', cgpa: '' });
  const [technical, setTechnical] = React.useState({
    hack: '',
    codecomp: '',
    papers: '0',
    intern: '',
    expertise: 3
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit === true) {
      const token = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('name', personal.name);
      formData.append('gender', personal.gender);
      formData.append('cgpa', academics.cgpa);
      formData.append('marks10', academics.tenthper);
      formData.append('marks12', academics.twelthper);
      formData.append('hack', technical.hack + technical.codecomp);
      formData.append('internship', technical.intern);
      formData.append('research_exp', technical.papers);
      formData.append('dev_type', technical.expertise);
      axios({
        method: 'put',
        url: 'http://127.0.0.1:8000/student/update/',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', authorization: `Token ${token}` }
      })
        .then(function({ data }) {
          console.log('hello');
          //handle success
          console.log(data);
        })
        .catch(function(response) {
          console.log('hell');
          //handle error
          console.log(response);
        });
    }
  }, [submit]);

  const handleClick = () => {
    setSubmit(true);
  };

  const handlePersonalChange = event => {
    setPersonal({ ...personal, [event.target.name]: event.target.value });
  };

  const handleAcademicsChange = event => {
    setAcademics({ ...academics, [event.target.name]: event.target.value });
  };

  const handleTechnicalChange = event => {
    setTechnical({ ...technical, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={classes.root}>
        {submit && <Redirect to={{ pathname: '/home' }} />}
        <Paper className={classes.paper} elevation={3}>
          <Typography gutterBottom variant="h2">
            Profile
          </Typography>
          <Divider variant="middle" />
          <div className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
              Personal
            </Typography>
            <div className={classes.div1}>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="Name"
                    variant="filled"
                    required
                    id="my-input-00"
                    value={personal.name}
                    name="name"
                    onChange={handlePersonalChange}
                  />
                </FormControl>
              </div>
              <div className={classes.segment}>
                <Select
                  style={{ width: '230px' }}
                  labelId="gender-select-label"
                  id="gender-select"
                  name="gender"
                  value={personal.gender}
                  onChange={handlePersonalChange}
                  variant="filled"
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={0}>Female</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <Divider variant="middle" />
          <div className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
              Academics
            </Typography>
            <div className={classes.div1}>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="Percentage in 10th"
                    variant="filled"
                    required
                    type="number"
                    id="my-input-10"
                    value={academics.tenthper}
                    name="tenthper"
                    onChange={handleAcademicsChange}
                    inputProps={{ max: 100, min: 0 }}
                  />
                </FormControl>
              </div>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="Percentage in 12th"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    max="100"
                    id="my-input-11"
                    value={academics.twelthper}
                    name="twelthper"
                    onChange={handleAcademicsChange}
                    inputProps={{ max: 100, min: 0 }}
                  />
                </FormControl>
              </div>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="CGPA"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    max="10"
                    id="my-input-12"
                    value={academics.cgpa}
                    name="cgpa"
                    onChange={handleAcademicsChange}
                    inputProps={{ max: 10, min: 0 }}
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <Divider variant="middle" />
          <div className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
              Technical
            </Typography>
            <div className={classes.div1}>
              <div className={classes.segment}>
                <Select
                  style={{ width: '230px' }}
                  variant="filled"
                  labelId="expertise-select-label"
                  id="expertise-select"
                  name="expertise"
                  value={technical.expertise}
                  onChange={handleTechnicalChange}
                >
                  <MenuItem value={2}>Software Developer</MenuItem>
                  <MenuItem value={0}>Web Developer</MenuItem>
                  <MenuItem value={1}>App Developer</MenuItem>
                  <MenuItem value={3}>Data Analyst</MenuItem>
                </Select>
              </div>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="No. of Hackathons"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    id="my-input-20"
                    value={technical.hack}
                    name="hack"
                    onChange={handleTechnicalChange}
                    inputProps={{ min: 0 }}
                  />
                </FormControl>
              </div>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="No. of coding competitions"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    id="my-input-21"
                    value={technical.codecomp}
                    name="codecomp"
                    onChange={handleTechnicalChange}
                    inputProps={{ min: 0 }}
                  />
                </FormControl>
              </div>
              <div className={classes.segment}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Research Experience</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="papers"
                    value={technical.papers}
                    onChange={handleTechnicalChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={classes.segment}>
                <FormControl>
                  <TextField
                    label="No. of Internships"
                    variant="filled"
                    required
                    type="number"
                    min="0"
                    id="my-input-23"
                    value={technical.intern}
                    name="intern"
                    onChange={handleTechnicalChange}
                    inputProps={{ min: 0 }}
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <Button
            style={{ marginTop: '30px', width: '300px', borderRadius: '50px' }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleClick}
          >
            Update
          </Button>
        </Paper>
      </div>
    </>
  );
}
