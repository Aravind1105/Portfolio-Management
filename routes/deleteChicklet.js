var express = require('express');
var router = express.Router();
router.post("/api/deletechicklet",function(req,res,next)
{
  console.log(req.body._id);
    var db = require("../db/mongoUtil").getConnection();
      // db.collection("portfolio_cache").find();
// db.collection('portfolio_cache').find({"profiles.sections.chicklets._id":req.body._id}).toArray(function(err, object) {
//   console.log(object);
      db.collection("portfolio_cache").update({'profiles.sections.chicklets._id':req.body._id},
      {
          $pull:
          {
            'profiles.sections.chicklets': {_id:req.body._id}
          }
      });
      res.status(200).json(req.body);
      // console.log(req.body._id);

      // {'one.two.three_id': 456},
      //    {$pull: {'one.$.two': {three_id: 456}}}
// });
});
// console.log(req.body);


    // db.collection("portfolio_cache").deleteOne( { "chicklets._id" : req.body._id } );
// db.collection('portfolio_cache').update( {"profiles.id":req.body.id},
// {
//   $pull:
//       {
//         "profiles":req.body
//       }
//    });
// console.log("hello");
// console.log(req.body);
// });
module.exports = router;
