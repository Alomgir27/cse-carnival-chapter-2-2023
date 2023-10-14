const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); // Replace with the actual path to your Swagger output file

// middleware
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// routes
app.use('/api', require('./routes/index'));


// Serve Swagger documentation and UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.send('Hello World!');
});




// start server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));


