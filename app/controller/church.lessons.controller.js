const ChurchLesson = require('../model/church.lesson.model.js');

// POST a ChurchLesson
exports.create = (req, res) => {
  // Create a ChurchLesson
  const churchLesson = new ChurchLesson({
    theme: req.body.theme,
    author: req.body.author,
    lessons: req.body.lessons
  });

  churchLesson.save()
  .then(clesson => {
    res.send(clesson.toClient())
  }).catch(err =>{
    res.status(500).send({
      message: err.message
    });
  });
};

// FETCH all
exports.findAll = (req, res) => {
    ChurchLesson.find()
  .then(churchLessons => {
    let returnedChurchLessons = [];   
    for(let i = 0; i < churchLessons.length; i++) {
        console.log(returnedChurchLessons);
      returnedChurchLessons.push(churchLessons[i].toClient())
    }

    res.send(returnedChurchLessons);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

//FIND a churchLesson
exports.findOne = (req, res) => {
  ChurchLesson.findById(req.params.churchLessonId)
  .then(churchLesson => {
    if(!churchLesson) {
      return res.status(404).send({
        message: "Church not found with id " + req.params.churchLessonId
      });
    }
    res.send(churchLesson.toClient());
  }).catch(err => {
   if(err.kind === 'ObjectId') {
	   return res.status(404).send({
            message: "Church lesson not found with id " + req.params.churchLessonId
	   });
   }
    return res.status(500).send({
      message: "Error retrieving church lesson with id " + req.params.churchLessonId
    });
  });
};

// UPDATE  a church lesson
exports.update = (req,res) => {
  // Find a church lesson and update
  ChurchLesson.findOneAndUpdate({_id: req.params.churchLessonId}, {
    theme: req.body.theme,
    author:req.body.author,
    lessons: req.body.lessons
  }, {new: true})
  .then(churchLesson => {
    if(!churchLesson) {
      return res.status(404).send({
        message: "Church lesson not found with id " + req.params.churchLessonId
      });
    }
    res.send(churchLesson.toClient());

  }).catch(err=> {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message:"Church lesson not found with id " + req.params.churchLessonId
      });
    }
    return res.status(500).send({
      message: "Error updating church lesson with id " + req.params.churchLessonId
    });
  });
};

// DELETE a church lesson
exports.delete = (req,res) => {
  ChurchLesson.findByIdAndRemove(req.params.churchLessonId)
  .then(churchLesson => {
    if(!churchLesson) {
    return res.status(404).send({
      message: "Church lesson not found with id " + req.params.churchLessonId
    });
   }
   res.send({ message: "Church lesson deleted successfully!"});
 }).catch(err => {
   if(err.kind === 'ObjectId' || err.name === 'NotFound') {
     return res.status(404).ssend({
       message:"Church lesson not found with id " + req.params.churchLessonId
     });
   }
   return res.status(500).send({
     message:"Church lesson not found with id " + req.params.churchLessonId
   });
 });
};
