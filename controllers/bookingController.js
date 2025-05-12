const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { collection } = require('../models/bookingModel');
const { collection: ticketCol } = require('../models/ticketModel');

exports.bookTicket = async (req, res) => {
  const { userNumber, ticketId, seatNumber, date } = req.body;
  const db = await connectDB();

  // ✅ تحقق إذا كانت التذكرة موجودة
  const ticket = await db.collection(ticketCol).findOne({ _id: new ObjectId(ticketId) });
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  // ✅ تحقق إذا كان الكرسي محجوز لنفس التاريخ والتذكرة
  const existingBooking = await db.collection(collection).findOne({
    ticketId,
    seatNumber,
    date
  });

  if (existingBooking) {
    return res.status(409).json({ message: 'Seat already booked for this ticket and date' });
  }

  // ✅ إضافة الحجز
  await db.collection(collection).insertOne({
    userNumber,
    ticketId,
    seatNumber,
    date,
    ticketDetails: ticket
  });

  res.json({ message: 'Booking successful' });
};

exports.getUserBookings = async (req, res) => {
  const { userNumber } = req.params;
  const db = await connectDB();

  const bookings = await db.collection(collection).find({ userNumber }).toArray();
  res.json(bookings);
};
