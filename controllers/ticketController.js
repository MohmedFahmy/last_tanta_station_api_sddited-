const {connectDB} = require('../config/db');
const { collection } = require('../models/ticketModel');

exports.getAllTickets = async (req, res) => {
  const db = await connectDB();
  const tickets = await db.collection(collection).find().toArray();
  res.json(tickets);
};

exports.searchTickets = async (req, res) => {
    const { departure, arrival } = req.query;
    
    // التأكد من أن المعاملات موجودة
    if (!departure || !arrival) {
      return res.status(400).json({ message: "Both departure and arrival stations are required." });
    }
  
    try {
      const db = await connectDB();
      const tickets = await db.collection(collection) // تأكد من استخدام اسم الـ collection الصحيح
        .find({ departure: departure, arrival: arrival })
        .toArray();
      
      // التحقق من وجود تذاكر تم العثور عليها
      if (tickets.length === 0) {
        return res.status(404).json({ message: "No tickets found for the provided stations." });
      }
  
      res.json(tickets);
    } catch (err) {
      res.status(500).json({ message: "Error while searching for tickets", error: err.message });
    }
  };
  
