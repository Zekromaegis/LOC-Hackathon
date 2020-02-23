import React, { useState, useEffect } from 'react';
import { Select, MenuItem, makeStyles, TextField } from '@material-ui/core';
import DrawerLeft from './drawer';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Plot from 'react-plotly.js';
const useStyles = makeStyles({
  div: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& *': {
      margin: '10px'
    }
  }
});

function Business() {
  const classes = useStyles();

  const [company, setCompany] = useState('Acollite');
  const [students, setStudents] = useState(0);
  const [data, setData] = useState([]);
  const handleChange = e => {
    setCompany(`${e.target.value}`);
  };

  useEffect(() => {
    if (students !== 0) {
      const token = localStorage.getItem('token');
      axios
        .get(`http://127.0.0.1:8000/company/${company}/${students}`, { headers: { authorization: `Token ${token}` } })
        .then(({ data }) => setData(data));
    }
  }, [students, company]);

  const handleChanges = e => {
    setStudents(e.target.value);
  };
  return (
    <div>
      <DrawerLeft />
      <div className={classes.div}>
        <Typography variant="h5">Select a Company :</Typography>
        <Select
          labelId="company-select-label"
          id="company-select"
          name="company"
          variant="filled"
          value={company}
          onChange={handleChange}
          style={{ width: '180px' }}
        >
          <MenuItem value={'Acollite'}> Acollite</MenuItem>
          <MenuItem value={'Amazon'}> Amazon</MenuItem>
          <MenuItem value={'Grofers'}> Grofers</MenuItem>
          <MenuItem value={'Haptic'}> Haptic</MenuItem>
          <MenuItem value={'Microsoft'}> Microsoft</MenuItem>
          <MenuItem value={'MorganStanley'}> Morgan Stanley</MenuItem>
          <MenuItem value={'Oracle'}> Oracle</MenuItem>
          <MenuItem value={'Quantify'}> Quantify</MenuItem>
          <MenuItem value={'TCS'}> TCS</MenuItem>
          <MenuItem value={'Valve'}> Valve</MenuItem>
        </Select>
        <Typography variant="h5">Enter No.of Students:</Typography>
        <TextField
          inputProps={{ max: 100, min: 0 }}
          label="Name"
          variant="filled"
          required
          type="number"
          id="my-input-00"
          value={students}
          name="students"
          onChange={handleChanges}
        ></TextField>
      </div>
      <div style={{ marginLeft: '600px' }}>
        <Plot
          data={[
            {
              x: data.map(item => item[`${company}P`]),
              y: data.map(item => item['name']),
              type: 'bar',
              orientation: 'h'
            }
          ]}
          layout={{ width: 600, height: 400, title: 'A Fancy Plot' }}
        />
      </div>
    </div>
  );
}

export default Business;
