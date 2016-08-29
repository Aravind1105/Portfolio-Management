var express = require("express");
var router = express.Router();




// module.exports = router;
module.exports = {
    getprofile:function(){
    var db = require("../db/mongoUtil").getConnection();
    db.collection('user_profile').find({"profiles.id":"uma"}).toArray(function(err, object) {
      return object;
    });
  }
};
