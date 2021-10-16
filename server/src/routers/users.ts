const usersExpress = require("express");
require("dotenv").config();
const usersDb = require("../db/db");

const usersRouter = usersExpress.Router();

usersRouter
  .route("/")
  .all((req: any, res: any, next: any) => {
    console.log("Request detected");
    next();
  })
  .get(async (req: any, res: any) => {
    // console.log("RES asdafasd", res);
    //  console.log("ASDF REQ", req);

    await usersDb
      .query("SELECT * FROM users")
      .then((data: any) => {
        //  console.log(data.value);

        res.send(data);
      })
      .catch((error: any) => {
        res.send(error);
      });
  })
  .post((req: any, res: any) => {
    console.log(req.body);
    usersDb
      .query(
        "INSERT INTO users (username) VALUES($1)",
        [req.body.username]
        //(event: any) => event.id
      )
      .then((data: any) => {
        res.send(data);
      });
  });

usersRouter
  .route("/:id")
  .get(async (req: any, res: any) => {
    await usersDb
      .one("SELECT id, username FROM users WHERE id=$1", [req.params.id])
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.sendStatus(404);
      });
  })
  .delete(async (req: any, res: any) => {
    await usersDb
      .query("DELETE FROM users WHERE id=$1", [req.params.id])
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.sendStatus(404);
      });
  })
  .put(async (req: any, res: any) => {
    console.log(req.body);
    await usersDb
      .query("UPDATE users SET username=$1 WHERE id=$2", [
        req.body.username,
        req.params.id,
      ])
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.sendStatus(404);
      });
  });
module.exports = usersRouter;
