const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys.js");
const USER = mongoose.model("USER");

/* https://youtu.be/qckBlIfOnlA?si=oLnNZCIWpF4_IKKu */
module.exports = async(req, res, next) => {
  
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  const decoded = jwt.verify(token, Jwt_secret);
  const userData = await USER.findById(decoded._id);
  if (!userData){
    return res.status(404).send("No user found");
  }else{
    req.user = userData;
    next();
  }
};

/*   const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must have logged in 1" });
  }
  const token = authorization.replace("Bearer", "");

  jwt.verify(token, Jwt_secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must have logged in 2" });
    }
    const { _id } = payload;
    USER.findById(_id).then((userData) => {
      console.log(userData.json());      
    });
     next();
  }); */

/* {
  "email":"any@gmail.com",
  "password": "123456789"
} */

/* module.exports = (res, req, next) => {
  console.log("hello middleware");
  next();
}; */
