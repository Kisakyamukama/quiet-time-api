const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var devotionSchema = new Schema({
  title: String,
  author: String,
  body: String,
  published: Boolean,
  updated_date: { type: Date, default: Date.now},
  created_date: { type: Date, default: new Date()}

});

// change _id to id

devotionSchema.method('toClient', function(){
   var obj = this.toObject();

   // Rename fields
    obj.id = obj._id;
    delete obj._id;

     return obj;
});


module.exports = mongoose.model('Devotion', devotionSchema);
