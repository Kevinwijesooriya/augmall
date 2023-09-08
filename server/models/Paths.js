const mongoose = require('mongoose');

const PathSchema = new mongoose.Schema({
 
  sx:{
    type:Number,
    default:0,
    default: 0
  },
  sy:{
    type:Number,
    default:0,
    default: 0
  },
  ex:{
    type:Number,
    default:0,
    default: 0
  },
  ey:{
    type:Number,
    default:0,
    default: 0
  },
  used_time: {
    type: Number,
    default: 0
  }
});


const Paths = mongoose.model('Paths', PathSchema);
module.exports = Paths;
