require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());  // Change this later
const db = require('./models'); // <- this is your index.js in /models
const registrationRoutes = require('./routes/registration.routes');
const loginRoutes = require('./routes/login.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/api/register', registrationRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/user', userRoutes);

// Sync Sequelize Models
db.sequelize.sync({ alter: true }) // or { force: true } to drop tables every run
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Database sync failed:', err));
