const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://mohammedfahmy130:tantaStation123@tantatrainstationdb.lhva22i.mongodb.net/?retryWrites=true&w=majority&appName=tantaTrainStationDB';
const dbName = 'tantaStation';
const client = new MongoClient(url, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});

async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB Successfully");
  return client.db(dbName);
}

module.exports = {
  connectDB
};
