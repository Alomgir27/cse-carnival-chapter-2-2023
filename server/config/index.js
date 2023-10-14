require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8081,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hackathon'
}

        
        