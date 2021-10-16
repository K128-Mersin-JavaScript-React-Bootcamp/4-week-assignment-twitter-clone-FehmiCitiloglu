import express from "express";
// import bodyParser from "body-parser";
// require("dotenv").config();
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3001;
const usersRouter = require("./routers/users");
const tweetsRouter = require("./routers/tweets");
const homeRouter = require("./routers/home");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger.json");

// const db = require("./db/db");

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
// app.use(require("connect").bodyParser());
app.use(express.json());

// app.use(express.urlencoded());
// app.use(express.bodyParser());
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/tweets", tweetsRouter);

// var options = {
//   explorer: true,
// };

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, options)
// );

// const pgp = require("pg-promise")();
// pgp.defaults.ssl = true;
// var db = pgp("postgres://cccfehmi.fc2@gmail.com:123456@localhost:5432/twitter");

// const db = pgp({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: 5432,
//   database: process.env.DB_DATABASE,
//   ssl: false,
// });

// app.get("/users/:id", (req: any, res: any) => {
//   const { id } = req.params;
//   db.one("SELECT * FROM users where id=$1", [id])
//     .then(function (data: any) {
//       res.send(data);
//       console.log("DATA:", data);
//     })
//     .catch(function (error: any) {
//       console.log("ERROR:", error);
//       res.send(error.message);
//     });
// });

// app.post("/tweets", (req: any, res: any) => {
//   console.log(req.body);

//   res.send(req.body);
// });
// app.get("/", async (req: any, res: any) => {
//   const data = await db.query(
//     "SELECT user_id, tweet_content, created_at FROM tweets "
//   );
//   console.log(data);

//   res.send(data);
// });

const options = {
  explorer: true,
};
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
