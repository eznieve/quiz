var models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
  console.log('quizId: ' + quizId);
    models.Quiz.find(quizId).then(function (quiz) {
      if(quiz){
        req.quiz = quiz;
        next();
      }else{ next(new Error('No existe quizId=' + quizId));}
    }
  ).catch( function(errot){ next( error ); });
}

// GET /quizes
exports.index = function(req, res) {
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index', {quizes: quizes});
    }
  ).catch(function(error){ next(error); })
}

// GET /quizes/question
exports.show = function(req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', {quiz: quiz});
  });
}

// GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
    var resultado = 'Incorrecto';
    if(req.query.respuesta === req.quiz.respuesta){
      resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});

  });
}
