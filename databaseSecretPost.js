/* 
* import variable d'environnement

* import module mysql
renseignement et connexion à la base de donnée
*/

require("dotenv").config();
const mysql = require("mysql");

const dbSecretPost = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbSecretPost.connect(function (err) {
  if (err) throw err;
  console.log("connecté à la base de données MySql");
});

module.exports = dbSecretPost;
