import { useEffect, useState } from 'react';
import { Container, Divider, Link,Button, Checkbox, FormControlLabel, Grid, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import LazyTable from '../components/LazyTable';
// import SongCard from '../components/SongCard';
const config = require('../config.json');

export default function Storeinfo() {
  const [inputCity, setinputCity] = useState(''); // to save the input city
  const [inputState, setinputState] = useState(''); // to save the input state
  const [inputType, setinputType] = useState(''); // to save the input type
  const [inputCluster, setinputCluster] = useState(''); // to save the input cluster
  const [Data, setData] = useState(''); // to save the input data
  const [pageSize, setPageSize] = useState(10); // to save the input page size

  // use useeffect to pull the store search API
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/storeSearch`)
      .then(res => res.json())
      .then(resJson => {
        const searchedStore = resJson.map((store) => ({ id: store.StoreNumber, ...store }));
        setData(searchedStore);
      });
  }, []);

  //write the search function for our store search
  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/storeSearch?inputCity=${inputCity}&inputState=${inputState}&inputType=${inputType}&inputCluster=${inputCluster}`
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const searchedStore = resJson.map((store) => ({ id: store.StoreNumber, ...store }));
        setData(searchedStore);
      });
  }

  // Here, we define the columns of the stores columns table. The stores columns variable is an array (in order)
  // of objects with each object representing a column. Each object has a "field" property representing
  // what data field to display from the raw data, "headerName" property representing the column label,
  // and an optional renderCell property which given a row returns a custom JSX element to display in the cell.
  const StoresColumns = [
    {
      field: 'StoreNumber',
      headerName: 'Store Number',
      width:200

    },
    {
      field: 'City',
      headerName: 'City',
      width:200

    },
    {
      field: 'State',
      headerName: 'State',
      width:200
    },
    {
      field: 'Type',
      headerName: 'Type',
      width:200
    },
    {
      field: 'Cluster',
      headerName: 'Cluster',
      width:200
    },
    {
      field: 'DailySales',
      headerName: 'DailySales',
      width:200
    },
  ];

  var Data2=Data;

    // Convert the value string to a float
  for (let i = 0; i < Data2.length; i++) {
    Data2[i].DailySales = parseFloat(Data2[i].DailySales);
  }
  return (
    <Container>
      <h2>Store Information - Origin</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/storeinfo1`} columns={StoresColumns} defaultPageSize={5} rowsPerPageOptions={[5,10]}/>
      <Divider/>
      <h2>Store Information - Optimized</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/storeinfo`} columns={StoresColumns} defaultPageSize={5} rowsPerPageOptions={[5,10]}/>
      <Divider/>
      <h2>Searched Store Results</h2>

      <Grid item xs={12}>
        <TextField label='City' value={inputCity} onChange={(e) => setinputCity(e.target.value)} style={{ width: "20%" }}/>
        <TextField label='State' value={inputState} onChange={(e) => setinputState(e.target.value)} style={{ width: "20%" }}/>
        <TextField label='Type' value={inputType} onChange={(e) => setinputType(e.target.value)} style={{ width: "20%" }}/>
        <TextField label='Cluster' value={inputCluster} onChange={(e) => setinputCluster(e.target.value)} style={{ width: "20%" }}/>
      </Grid>

      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <DataGrid
        rows={Data}
        columns={StoresColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />

      <h2>Sales by Store</h2>
      <ResponsiveContainer height={250} >
        <BarChart width={1000} height={600} data={Data2}>
        <Bar dataKey="DailySales" fill="#3399ff" />
        <XAxis dataKey="StoreNumber" />
        <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};