const cordSchema = new mongoose.Schema({
    Rname: String,
    location: {
      x: Number,
      y: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  });
  
  const Cord = mongoose.model('cord', cordSchema);
  