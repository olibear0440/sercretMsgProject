const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const passwordSchema = require("../middleware/passwordValidator");

/*
  * Enregistrement d'un utilisateur

  * module password validator
  * module bcrypt pour le hashage du mot de passe
*/
exports.signup = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Mot de passe non valide :" +
        passwordSchema.validate("req.body.password", { list: true }),
    });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = hash;
        const userRole = 0;
        const userPic = "";
        if (req.file) {
          userPic = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }

        const userInfos = [userPic, username, email, password, userRole];
        const query =
          "INSERT INTO users (userPic, username, email, password, userRole) VALUES (?,?,?,?,?)";
        db.query(query, userInfos, (err, rows, fields) => {
          if (err) {
            return res.status(400).json(err);
          }
          return res.status(201).json({ message: "utilisateur créé !" });
        });
      })
      .catch((err) => res.status(501).json({ error }));
  }
};

/*
  * login d'un utilisateur

  * module bcrypt pour comparer le mot de passe
  * module jsonwebtoken pour creer le token
*/
exports.login = (req, res, next) => {
  const query = "SELECT * FROM users WHERE username=?";
  const username = [req.body.username];
  db.query(query, username, (err, results, fields) => {
    if (err) return res.status(500).json({ error: "Erreur systeme !" });
    if (results.length !== 1) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    bcrypt
      .compare(req.body.password, results[0].password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        let username = results[0].username;
        let email = results[0].email;
        let userRole = results[0].userRole;
        let userPic = results[0].userPic;
        let token = jwt.sign({ userId: results[0].id }, process.env.JWT_KEY, {
          expiresIn: "24h",
        });

        const query = "update users set token = ? where id = ?";
        db.query(query, [token, results[0].id]);
        res.status(200).json({
          userId: results[0].id,
          username: username,
          email: email,
          userRole: userRole,
          userPic: userPic,
          token: "Bearer " + token,
        });
      })
      .catch((error) => res.status(501).json({ error }));
  });
};

/*
 * Renvoi tous les utilisateurs
 */
exports.getAllUsers = (req, res, next) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, rows, fields) => {
    if (!err) res.send(rows);
    else
      return res.status(400).json({
        message: "error : Impossible d'afficher la lise des utilisateurs",
      });
  });
};

/*
 *Renvoi l'utilisateur via son token
 */
exports.getCurrentUser = (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
  console.log(authToken);
  const query = "SELECT * FROM users WHERE token = ?";
  db.query(query, [authToken], (err, rows, fields) => {
    if (!err) {
      if (rows.length !== 1) {
        res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json(rows[0]);
    } else {
      res.status(501).json({ error });
    }
  });
};

/*
 *supprime un utilisateur
 */
exports.deleteUser = (req, res, next) => {
  const userId = [req.params.id];
  const query = "DELETE from users WHERE id = ?";
  db.query(query, userId, (err, rows, fields) => {
    if (err) {
      res.status(400).json({
        message: " error : impossible de supprimer cet utilisateur",
      });
    } else {
      return res.status(200).json({ message: "Cet utilisateur est supprimé" });
    }
  });
};
