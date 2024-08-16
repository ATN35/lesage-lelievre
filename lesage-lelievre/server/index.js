const express = require('express');
const helmet = require('helmet');
const csurf = require('csurf');
const sequelize = require('./db');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(csurf({ cookie: true }));

// Importer les routes
const decesRouter = require('./routes/deces');
app.use('/api', decesRouter);

// Synchroniser avec la base de données
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
