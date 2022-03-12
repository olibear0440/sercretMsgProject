const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");


/*
  * Enregistrement d'un utilisateur

  * module bcrypt pour le hashage du mot de passe
*/
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const username = req.body.username;
      const email = req.body.email;
      const password = hash;
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?,?,?)",
        [username, email, password],
        (err, rows, fields) => {
          if (err) {
            return res.status(400).json(err);
          }
          return res.status(201).json({ message: "utilisateur créé !" });
        }
      );
    })
    .catch((err) => res.status(501).json({ error }));
};

/*
  * login d'un utilisateur

  * module bcrypt pour comparer le mot de passe
  * module jsonwebtoken pour creer le token
*/
exports.login = (req, res, next) => {
  db.query(
    "SELECT * FROM users WHERE username=?",
    [req.body.username],
    (err, results, fields) => {
      if (err) return res.status(500).json({ error: "Erreur systeme !" });
      if (results.length !== 1) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //console.log(results)
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            username: results[0].username,
            email: results[0].email,
            token: jwt.sign({ userId: results[0].id }, process.env.JWT_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    }
  );
};


