const tweetsExpress = require("express");
const tweetsDb = require("../db/db");
const tweetsRouter = tweetsExpress.Router();

tweetsRouter
  .route("/")
  .all((req: any, res: any, next: any) => {
    console.log("Request detected");
    next();

    //res.send("It works. Try different route");
  })
  .get(async (req: any, res: any) => {
    console.log(res.body);
    await tweetsDb
      .query("SELECT * FROM tweets")
      .then((data: any) => {
        res.send(data);
      })
      .catch(function (error: any) {
        res.send(error);
      });
  })
  .post(async (req: any, res: any) => {
    const userId = req.body.user_id;
    const content = req.body.content;
    // console.log(res);

    console.log("asdasd", req.body);
    await tweetsDb
      .query(
        "INSERT INTO tweets (user_id, tweet_content) VALUES($1, $2)",
        [userId, content]
        // (event: any) => event.id
      )
      .then((data: any) => {
        res.send(data);
      });
  });

tweetsRouter
  .route("/:tweet_id")
  .get(async (req: any, res: any) => {
    //console.log(req.params);
    // console.log(res);

    await tweetsDb
      .one("SELECT * FROM tweets WHERE tweet_id=$1", [req.params.tweet_id])
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.sendStatus(404);
      });
  })
  .delete(async (req: any, res: any) => {
    await tweetsDb
      .query("DELETE FROM tweets WHERE tweet_id=$1", [req.params.tweet_id])
      .then((data: any) => {
        res.send(data);
      })
      .catch((error: any) => {
        res.sendStatus(404);
      });
  });

// .put(async (req: any, res: any) => {
//   console.log(req.body);
//   await tweetsDb
//     .query("UPDATE tweets SET tweet_content=$1 WHERE id=$2", [
//       req.body.tweet_content,
//       req.params.id,
//     ])
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((error: any) => {
//       res.sendStatus(404);
//     });
// });

module.exports = tweetsRouter;
