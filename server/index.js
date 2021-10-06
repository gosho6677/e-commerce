const express = require('express');
const app = express();
const cors = require('cors');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

const authMiddleware = require('./middlewares/authMiddleware');
const dataMiddleware = require('./middlewares/dataMiddleware');

const { PORT } = require('./config');

start();

async function start() {
    app.use(express.json());
    app.use(cors());
    app.use(authMiddleware());
    app.use(dataMiddleware());

    await databaseConfig(app);
    routesConfig(app);
}

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}/`));