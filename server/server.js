const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

app.get('/author/:type', routes.author);
app.get('/top3weathercity', routes.top3weathercity);
app.get('/earthquake',routes.earthquake);
app.get('/holidaysales', routes.holidaysales);
app.get('/holidaysalesPercentChange', routes.holidaysalesPercentChange);
app.get('/salesbydate', routes.salesbydate);
app.get('/salesbymonth', routes.salesbymonth);
app.get('/salesbyyear', routes.salesbyyear);
app.get('/salesbycity/:city', routes.salesbycity);
app.get('/salesbyfamily_search', routes.salesbyfamily_search);
app.get('/sales_correlation', routes.sales_correlation);
app.get('/monthly_correlation', routes.monthly_correlation);
app.get('/weathersalescomparison/:temperature', routes.weathersalescomparison);
app.get('/weatherbycitybydate', routes.weatherbycitybydate);
app.get('/storeinfo', routes.storeinfo);
app.get('/storeinfo1', routes.storeinfo1);
app.get('/storeSearch', routes.storeSearch);
app.get('/transactionSearch', routes.transactionSearch);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
