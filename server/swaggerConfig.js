const swagger = require('swagger-autogen')();
const path = require('path');

const outputFile = './swagger-output.json';
const endpointsFiles = [path.resolve(__dirname, './routes/index.js')];

swagger(outputFile, endpointsFiles);
