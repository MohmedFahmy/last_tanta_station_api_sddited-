const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mohammedfahmy130:tantaStation123@tantatrainstationdb.lhva22i.mongodb.net/?retryWrites=true&w=majority&appName=tantaTrainStationDB';
const dbName = 'tantaStation';

async function insertSampleData() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ticketsData = [
      {
        departure: 'tanta',
        arrival: 'Alexandria',
        price: 200,
        time: '08:00 AM',
        trainClass: 'First Class',
        date: '2025-05-10',
        offer: false
      },
      {
        departure: 'Tanta',
        arrival: 'Cairo',
        price: 120,
        time: '09:30 AM',
        trainClass: 'Second Class',
        date: '2025-05-10',
        offer: true
      }
    ];

    const ticketInsertResult = await db.collection('tickets').insertMany(ticketsData);
    console.log('✅ Inserted tickets');

    const insertedTicketIds = Object.values(ticketInsertResult.insertedIds);

    const offersData = [
      {
        ticketId: insertedTicketIds[1],
        discount: 10
      }
    ];
    await db.collection('offers').insertMany(offersData);
    console.log('✅ Inserted offers');

    const fullTicket = ticketsData[0];
    const bookingsData = [
      {
        ticketId: insertedTicketIds[0],
        userNumber: 'USR123',
        seatNumber: 'A12',
        date: '2025-05-10',
        ticketDetails: fullTicket
      }
    ];
    await db.collection('bookings').insertMany(bookingsData);
    console.log('✅ Inserted bookings');

  } catch (err) {
    console.error('❌ Error inserting data:', err);
  } finally {
    await client.close();
  }
}

insertSampleData();
