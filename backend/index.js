const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./docs/swagger.json')
const dotenv = require('dotenv').config({
	path: './.env'
});

const app = express();

const AuthController = require('./controllers/authController');
const UserController = require('./controllers/userController');
const JwtVerify = require('./middlewares/jwtVerify');

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const apiRoutes = express.Router();
app.use('/api', apiRoutes);
apiRoutes.post('/auth/register', AuthController.register);
apiRoutes.post('/auth/login', AuthController.login);
apiRoutes.get('/users', JwtVerify, UserController.list);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('DB connection Success');

    app.listen(process.env.PORT);

    console.log('Server started listening on port: ', process.env.PORT);
}).catch((err) => {
    console.error('DB connection error: ', err);
    throw err;
});