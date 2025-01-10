const mongoose = require('mongoose');

const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbname: "HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(() => {
        console.log('Connected to database');
    }).catch(err => {
        console.log(`Error connecting to database: ${err}`);
    });
};

module.exports = dbconnection;
