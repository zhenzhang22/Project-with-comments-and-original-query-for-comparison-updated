import { useEffect, useState } from 'react';
import { Container, Divider,Button,  Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LazyTable from '../components/LazyTable';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
const config = require('../config.json');

// The component uses the useState hook to maintain state variables for the input year and month, the retrieved sales data, and the page size of the displayed data.
// The component uses the useEffect hook to fetch sales data from the server using an HTTP request to a specific route when the component mounts.
// The fetched data is stored in the Data state variable, and is used to populate a table and a bar chart.
// The component also contains a search function that sends an HTTP request to the server to retrieve sales data for a specific year and month.
// The retrieved data is then used to update the Data state variable, and is displayed in the table and the bar chart.
// The component also contains a DataGrid component and a BarChart component from the Material-UI library that display the sales data in a tabular and graphical format, respectively.
export default function Storeinfo() {
  const [inputmonth, setinputmonth] = useState('');// to save the input month
  const [Data, setData] = useState('');// to save the data
  const [pageSize, setPageSize] = useState(10);// to save the page size
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/salesbymonth`)
      .then(res => res.json())
      .then(resJson => {
        const searchedmonth = resJson.map((month) => ({ id: month.yearmonth, ...month }));
        setData(searchedmonth);
      });
  }, []);

  // below is the code to search for the searched months
  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/salesbymonth?inputmonth=${inputmonth}`
    )
      .then(res => res.json())
      .then(resJson => {
        const searchedmonth = resJson.map((month) => ({ id: month.yearmonth, ...month }));
        setData(searchedmonth);
      });
  }
  console.log(Data);

// below is the date columns
  const DateColumns = [
    {
      field: 'date',
      headerName: 'date',
      width:400
    },
    {
      field: 'totalsales',
      headerName: 'totalsales',
      width:400
    },
  ];
  // below is the date columns for the second table
  const DateColumns1 = [
    {
      field: 'yearmonth',
      headerName: 'date',
      width:400
    },
    {
      field: 'totalsales',
      headerName: 'totalsales',
      width:400
    },
  ];
  return (
    <Container>
      <h2>Date Information</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/salesbydate`} columns={DateColumns} defaultPageSize={5} rowsPerPageOptions={[5,10]}/>
      <Divider/>
      <h2>Searched by Year-Month Results</h2>
      
      <Grid item xs={12}>
        <TextField label='yearmonth' value={inputmonth} onChange={(e) => setinputmonth(e.target.value)} style={{ width: "20%" }}/>
      </Grid>
      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <DataGrid
        rows={Data}
        columns={DateColumns1}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
      <h1>Bar Chart of searched by Year-Month Results</h1>
      <ResponsiveContainer height={250} >
        <BarChart width={600} height={600} data={Data}>
        <Bar dataKey="totalsales" fill="#3399ff" />
        <XAxis dataKey="yearmonth" />
        <YAxis />
        </BarChart>
      </ResponsiveContainer>
      
      <Divider/>
    </Container>
  );
};