var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar DDBB sqlite
var sequelize = new Sequelize(null, null, null,
                      {dialect: "sqlite", storage: "sqlite"}
                  );

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Exportar definicion de tabla quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la DB
sequelize.sync().then(function(){
  //.succes(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if(count === 0){ // la tabla se inicializa solo si esta vacia
      Quiz.create({pregunta: 'Capital de Italia',
                   respuesta: 'Roma'})
      .then(function(){console.log('Base de Datos inicializa');});
    }
  });
});
