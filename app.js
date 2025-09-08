
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db');
const app = express();
const port = process.env.PORT || 3000;

const rateLimiter = require("./middleware/rateLimiter");


app.use(rateLimiter);
app.use(cors()); 
app.use(express.json()); 
app.use(express.static('public'));


const profileRoutes = require('./routes/profile'); 
const apiRoutes = require('./routes/api');
const { healthCheck } = require('./controllers/profileController');


app.get('/health', healthCheck);
app.use('/api/profile', profileRoutes); 
app.use('/api', apiRoutes); 


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
sequelize.sync()
  .then(() => {
    console.log(' Database & tables synced!');
    app.listen(3001, () => {
      console.log(' Server is running on port 3001');
    });
  })
  .catch(err => {
    console.error(' Failed to sync database:', err);
  });