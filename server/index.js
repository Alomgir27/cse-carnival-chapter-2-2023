const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// routes
app.use('/api', require('./routes/index'));



app.get('/', (req, res) => {
    res.send('Hello World!');
});


//access control
app.use((req, res, next) => {
    //allow access from any origin
    res.header('Access-Control-Allow-Origin', '*');
    //set headers to allow request methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //set request methods to be allowed
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        //return response with status 200
        return res.status(200).json({});
    }
    //forward request to route handler
    next();
});





// start server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));




