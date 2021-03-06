var path = require('path');

// Postgresql DATABASE_URL = postgresql://user:password@host:port/database
// Sqlite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar DDBB sqlite
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  //solo SQLite
    omitNull: true      // solo Postgresql
  }
);

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//Exportar definicion de tabla quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la DB
sequelize.sync().then(function(){
  //.succes(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if(count === 0){ // la tabla se inicializa solo si esta vacia
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'});
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa'})
      .then(function(){console.log('Base de Datos inicializa');});
    }
  });
});
