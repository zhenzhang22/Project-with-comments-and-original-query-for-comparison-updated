import { useEffect, useState } from 'react';
import { Container, Divider, Link,Button, Checkbox, FormControlLabel, Grid, Slider, TextField } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, LineChart, ScatterChart, Scatter,Line, CartesianGrid, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
// import SongCard from '../components/SongCard';
const config = require('../config.json');

export default function Weather() {
  const [inputCity, setinputCity] = useState('');
  const [inputDay, setinputDay] = useState('');
  const [Data, setData] = useState('');
  const [pageSize, setPageSize] = useState(10);
//we set up query to pull all the data across weather
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/transactionSearch`)
      .then(res => res.json())
      .then(resJson => {
        const searchedWeather = resJson.map((weather) => ({ id: weather.id, ...weather }));
        setData(searchedWeather);
      });
  }, []);
  
//we set up the searchable sales by weather
  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/transactionSearch?inputCity=${inputCity}&inputDay=${inputDay}`
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const searchedWeather = resJson.map((weather) => ({ id: weather.id, ...weather }));
        setData(searchedWeather);
      });
  }


  // Here, we set up the weather columns
  const WeatherColumns = [
    {
      field: 'City',
      headerName: 'City',
      width:150
    },
    {
      field: 'date',
      headerName: 'Date',
      width:150
    },
    {
      field: 'avg_feel',
      headerName: 'Average Temperature',
      width:150
    },
    {
      field: 'max_temp_f',
      headerName: 'Highest Temperature',
      width:150
    },
    {
      field: 'min_temp_f',
      headerName: 'Lowest Temperature',
      width:150
    },
    {
      field: 'total_transaction',
      headerName: 'Total Transaction',
      width:150
    },
    {
      field: 'avg_transaction',
      headerName: 'Average Transaction',
      width:150
    },
  ];

  console.log(Data);

  return (
    <Container>
      <h2>Transaction by Weather</h2>
      <Grid item xs={12}>
        <TextField label='City' value={inputCity} onChange={(e) => setinputCity(e.target.value)} style={{ width: "20%" }}/>
        <TextField label='Day' value={inputDay} onChange={(e) => setinputDay(e.target.value)} style={{ width: "20%" }}/>

      </Grid>

      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <DataGrid
        rows={Data}
        columns={WeatherColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <h2>Scatter Plot - Transaction by Weather</h2>
      <ResponsiveContainer height={250} >
        <ScatterChart width={1000} height={400}>
            <CartesianGrid />
            <XAxis type="number" dataKey="avg_feel"/>
            <YAxis type="number" dataKey="total_transaction" />
            <Scatter data={Data} fill="green" />
        </ScatterChart>
      </ResponsiveContainer>
    </Container>
  );
};