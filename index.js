const express = require('express');
const bodyParser = require('body-parser');
const {connectDB} = require('./config/db');
connectDB();
const app = express();

app.use(bodyParser.json());
const port = process.env.PORT || 4000 


app.use(require('./routes/ticketRoutes'));
app.use(require('./routes/offerRoutes'));
app.use(require('./routes/bookingRoutes'));

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
