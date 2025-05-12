// ticket model
module.exports = {
    collection: 'tickets',
    schema: {
      departure: String,
      arrival: String,
      price: Number,
      time: String,
      classType: String,
      date: String,
      offer: Boolean,
    }
  };
  