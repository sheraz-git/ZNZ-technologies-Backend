const mongoose = require('mongoose');
const mongodb = require("mongodb").MongoClient;
require("dotenv").config();
async function connectToMongo() {
  
    try {
      const MONGO_URL=process.env.MONGO_URL;
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
      console.log('Connected to MongoDB');
    } catch (err) {
       console.error('Error connecting to MongoDB', err);
    }
  }
  
module.exports = connectToMongo;
