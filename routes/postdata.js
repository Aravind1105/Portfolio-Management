var express = require('express');
var router = express.Router();
router.patch("/api/postdata",function(req,res,next)
{
  console.log(req.body);
    var db = require("../db/mongoUtil").getConnection();
db.collection('portfolio_cache').update( {"profiles.id":req.body.id},
{
  $set:
      {
        "profiles":req.body
      }
   });
   res.status(200).json(req.body);
});
module.exports = router;
