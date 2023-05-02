import { useEffect, useState } from 'react';
import { Container, Divider, Link,Button, Checkbox, FormControlLabel, Grid, Slider, TextField } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, LineChart, Line, CartesianGrid, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';

import LazyTable from '../components/LazyTable';
const config = require('../config.json');

// SalesByFamily functional component represents a page that displays sales data by product family
export default function SalesByFamily() {
  // input product family that allows easy search
  const [inputFamily, setinputFamily] = useState('');
  const [Data, setData] = useState('');
  // set page size for better readability of the table 
  const [pageSize, setPageSize] = useState(10);

  // useEffect hook to fetch sales data from the server when the component is mounted
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/salesbyfamily_search`)
      .then(res => res.json())
      .then(resJson => {
        const searchedFamily = resJson.map((family) => ({ id: family.family, ...family }));
        setData(searchedFamily);
      });
  }, []);
  
  // search function queries the server for sales data filtered by the inputFamily (search term)
  const search = () => {
    // Fetch filtered sales data from the server using the inputFamily as a query parameter
    fetch(`http://${config.server_host}:${config.server_port}/salesbyfamily_search?inputFamily=${inputFamily}`
    )
      .then(res => res.json())
      .then(resJson => {
        const searchedFamily = resJson.map((family) => ({ id: family.family, ...family }));
        setData(searchedFamily);
      });
  }

  // Define column structure for the DataGrid component, 
  // specifying the 'field', 'headerName', and 'width' properties for each column
  const FamilyColumns = [
    {
      field: 'family',
      headerName: 'Family',
      width:300
    },
    {
      field: 'TotalSales',
      headerName: 'Total Sales',
      width:300
    },
  ];

  console.log(Data);

  // Render the SalesByFamily component, including a search field, data grid, and bar chart
  return (
    <Container>
      <h2>Sales by Family - Unit in Thousands</h2>
      <Grid item xs={12}>
        <TextField label='Product Family' value={inputFamily} onChange={(e) => setinputFamily(e.target.value)} style={{ width: "20%" }}/>

      </Grid>

      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <DataGrid
        rows={Data}
        columns={FamilyColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <h2>Sales by Family - Unit in Thousands</h2>
      <ResponsiveContainer height={250} >
        <BarChart width={600} height={600} data={Data}>
        <Bar dataKey="TotalSales" fill="#3399ff" />
        <XAxis dataKey="family" />
        <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};