const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mohammedfahmy130:tantaStation123@tantatrainstationdb.lhva22i.mongodb.net/?retryWrites=true&w=majority&appName=tantaTrainStationDB';
const dbName = 'tantaStation';

async function insertTicket() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ticketsData = [
        {
          departure: 'tanta',
          arrival: 'Matrouh',
          price: 220,
          time: '11:00 PM',
          trainClass: 'First Class',
          date: '2025-08-10',
          offer: true
        },
        {
            departure: 'tanta',
            arrival: 'Matrouh',
            price: 180,
            time: '11:20 PM',
            trainClass: 'Second Class',
            date: '2025-08-10',
            offer: false
          },
        {
          departure: 'Tanta',
          arrival: 'Matrouh',
          price: 100,
          time: '11:40 PM',
          trainClass: 'Economy Class',
          date: '2025-08-10',
          offer: false
        }
      ];

      const ticketInsertResult = await db.collection('tickets').insertMany(ticketsData);
      console.log('✅ Inserted tickets');

  } catch (err) {
    console.error('❌ Error inserting ticket:', err);
  } finally {
    await client.close();
  }
}

insertTicket();
