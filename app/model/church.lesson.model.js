const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var churchLessonSchema = new Schema({
  theme: String,
  author: String,
  lessons: String,
  updated_date: { type: Date, default: Date.now},

});

// change _id to id

churchLessonSchema.method('toClient', function(){
   var obj = this.toObject();

   // Rename fields
    obj.id = obj._id;
    delete obj._id;

     return obj;
});


module.exports = mongoose.model('ChurchLesson', churchLessonSchema);
