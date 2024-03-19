require("dotenv").config();

const mongoURL = `mongodb+srv://jodavasa9936:${process.env.MONGODB}@cluster0.xfaiphr.mongodb.net/`;

const Jwt_secret = "MI_LLAVE_SECRETA_MAS_COMPLEJA#$%&1ah3";

module.exports = {
  mongoURL,
  Jwt_secret,
};

/*
module.exports = {

mongodb+srv://jodavasa9936:Pa%40ssword123@cluster0.xpn7d0w.mongodb.net/

  mongoURL : `mongodb+srv://jodavasa:@atlascluster.l9iyh7h.mongodb.net/?retryWrites=true&w=majority`,
  Jwt_secret : "MI_LLAVE_SECRETA_MAS_COMPLEJA#$%&1ah3"
};*/
/* {
  "email":"angie@gmail.com",
  "password":"123456789"
} */
