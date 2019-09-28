module.exports = function(app){
    const churchLesson = require('../controller/church.lessons.controller.js');
  
    // create a new devotion
    app.post('/api/lesson/church',churchLesson.create);
  
    // Retrieve all devotions
    app.get('/api/lesson/church',churchLesson.findAll);
  
    // Rerieve a single Devotion
    app.get('/api/lesson/church/:churchLessonId', churchLesson.findOne);
  
    // Update a devotion with Id
    app.put('/api/lesson/church/:churchLessonId', churchLesson.update);
  
    // Delete a devotion eith Id
    app.delete('/api/lesson/church/:churchLessonId', churchLesson.delete);
    
  }
  