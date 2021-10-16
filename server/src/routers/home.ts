const express = require("express");
const router = express.Router();
router.route("/home").all((req: any, res: any, next: any) => {
  res.send("It works. Try /swagger as a route");
});

module.exports = router;
