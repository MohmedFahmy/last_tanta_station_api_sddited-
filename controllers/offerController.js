const { connectDB } = require('../config/db');
const { collection: offerCol } = require('../models/offerModel');
const { collection: ticketCol } = require('../models/ticketModel');
const { ObjectId } = require('mongodb'); 

exports.getOffers = async (req, res) => {
  const db = await connectDB();
  const offers = await db.collection(offerCol).find().toArray();

  const fullOffers = await Promise.all(offers.map(async (offer) => {
    const ticket = await db.collection(ticketCol).findOne({ _id: new ObjectId(offer.ticketId) }); // ← استخدم ObjectId بشكل صحيح
    return { ...offer, ticket };
  }));

  res.json(fullOffers);
};
