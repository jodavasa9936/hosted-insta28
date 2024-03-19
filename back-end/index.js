const express = require("express"); // require -> commonJS
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { mongoURL } = require("./keys.js");
require("./models/model.js");
require("./models/post.js");
const fs = require("node:fs");
const https = require("node:https");
const PORT = process.env.PORT ?? 3000;
mongoose.connect(mongoURL);

app.use(cors());
/*  app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        `http://localhost:5173`,
      ];
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);  */

app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/createPost.js"));
app.use(require("./routes/user.js"));
mongoose.connect(mongoURL);

/*
 */

const connectDB = async () => {
  try {
    conected();
  } catch (error) {
    noConnected();
  }
};
const conected = () => {
  mongoose.connection.on("connected", () => {
    console.log("succesfully connected to mongoDB");
  });
};

const noConnected = () => {
  mongoose.connection.on("error", () => {
    console.log("not connectedconnected to mongoDB");
  });
};
// serving the frontend
/* app.use(express.static(path.join(__dirname, "./front-end/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./front-end/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
 */

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
});

/* https://www.youtube.com/watch?v=USrMdBF0zcg */
/* const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
); */
