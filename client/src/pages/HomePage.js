import { useEffect, useState } from 'react';
import { Container, Divider} from '@mui/material';

const config = require('../config.json');

// This is a React functional component that represents the home page of the application.
// It contains six state variables that store the sales data and correlations for different categories.
export default function HomePage() {
  const [salesChangebyHoliday, setsalesChangebyHoliday] = useState(31);
  const [correlationLingerie, setcorrelationLingerie] = useState(0.54);
  const [correlationAppliances, setcorrelationAppliances] = useState(0.12);
  const [correlationMeat, setcorrelationMeat] = useState(-0.12);
  const [correlationLiquor, setcorrelationLiquor] = useState(0.37);
  const [correlationHome, setcorrelationHome] = useState(0.12);

  // use useeffect to pull the holiday sales data for the fun fact page
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/holidaysales`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setsalesChangebyHoliday(resJson.salesChangebyHoliday || 31);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);

    // use useeffect to pull the holiday sales data for the interesting correlations
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/sales_correlation`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setcorrelationLingerie(resJson.correlationLingerie || 0.54);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);
    // use useeffect to pull the holiday sales data for the interesting correlations
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/sales_correlation`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setcorrelationAppliances(resJson.correlationAppliances || 0.12);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);
    // use useeffect to pull the holiday sales data for the interesting correlations
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/sales_correlation`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setcorrelationMeat(resJson.correlationMeat || -0.12);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);
    // use useeffect to pull the holiday sales data for the interesting correlations
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/sales_correlation`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setcorrelationLiquor(resJson.correlationLiquor || 0.37);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);
    // use useeffect to pull the holiday sales data for the interesting correlations
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/sales_correlation`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error fetching data');
      })
      .then(resJson => {
        setcorrelationHome(resJson.correlationHome || 0.12);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  
  return (
    <Container>
    <h1>Retail Sale Analysis Project</h1>
    
    <Divider/>
    <p>The primary goal of our project is to help Favorita store managers and the leadership team in comprehending sales trends and patterns across various cities in Ecuador, making it possible for them to make informed business decisions, optimize operations, and ultimately boost sales and profitability. To achieve this, we have constructed a website that allows users to search for sales data by city and product family. This functionality aids in determining supply logistics and restocking needs, ensuring that Favorita stores maintain a competitive edge in the market and effectively cater to customer demands.

Additionally, our project investigates the impact of weather and oil prices on store performance, as these are two critical factors that could influence customer footfall and overall sales. We also aim to explore the effect of special occasions, such as holidays, on sales patterns during the given timespan (2013-2018). Understanding these external factors will provide valuable insights for Favorita stores, allowing them to adapt and adjust their strategies accordingly to optimize performance and maximize profitability.</p>

    <h1>Introduction to Ecuador</h1>

    <Divider/>
    <p> Situated in South America, Ecuador boasts a vibrant and diverse culture, shaped by the unique blend of indigenous, Spanish, and African influences. The country's economy primarily relies on the export of petroleum (which we thoroughly examined in this project), bananas, shrimp, and various agricultural commodities. Although Ecuador faces challenges such as income inequality and reliance on natural resources, it has demonstrated progress in recent years. As one of the world's most biodiverse nations, Ecuador continues to captivate tourists and investors alike.</p>

    <Divider/>
    <h1>Ecuador was founded in 1822</h1>
    <img src={'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg'} href="https://en.wikipedia.org/wiki/Ecuador" className="img-fluid" alt="pic" width="50%"/>
    <Divider/>
    <h1>Map of Ecuador</h1>
    <img src={'https://www.worldatlas.com/upload/f5/b0/67/provinces-of-ecuador-map.png'}  className="img-fluid2" alt="pic" width="50%"/>
    <Divider/>
    <div>
      <h1>FUN FACT</h1>
      <h2>Compared to non holidays, sales increased by {salesChangebyHoliday}% during holidays!</h2>
      <img src={'https://as1.ftcdn.net/v2/jpg/02/94/09/04/1000_F_294090411_m4K2xSpZBqMcZPwgOhLUTvQjQviME60q.jpg'}  className="img-fluid3" alt="pic" width="50%"/>
    </div>
    <Divider/>
    <div>
      <h1>Interesting Correlations</h1>
      <h2>Corrlation bewteen Lingerie and Oil Price: {correlationLingerie}</h2>
      <h2>Corrlation bewteen Home Appliances and Oil Price: {correlationAppliances}</h2>
      <h2>Corrlation bewteen Meats and Oil Price: {correlationMeat}</h2>
      <h2>Corrlation bewteen Liquor, Wine, Beer and Oil Price: {correlationLiquor}</h2>
      <h2>Corrlation bewteen Home and Kitchen and Oil Price: {correlationHome}</h2>
      <img src={'https://www.foodandwine.com/thmb/2yRc06k6NvZwPYYbr-WeuRQjIJU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Wine-Guide-Beaujolais-FT-BLOG0722-2000-7f1cac81f5044d3cbfeac708b66c4bea.jpg'}  className="img-fluid3" alt="pic" width="50%"/>
    </div>
    </Container>
  );
};