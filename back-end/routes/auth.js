const express = require("express");
const router = express();
const mongoose = require("mongoose");
const { mongoURL } = require("../keys.js");
mongoose.connect(mongoURL);
const USER = mongoose.model("USER");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys.js");

router.post("/signup", async (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with that email or userName" });
      }
      argon2.hash(password).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          userName,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved succesfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email and password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    argon2
      .verify(savedUser.password, password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          const { _id, name, email, userName } = savedUser;
          res.json({ token, user: { _id, name, email, userName } });
          console.log({ token, user: { _id, name, email, userName } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;