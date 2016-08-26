var express = require("express");
var router = express.Router();
var _ = require('lodash');
var obj=[];
var obj1=[];
var result=[];


router.get('/:username/:sectionname/:chickletid', function(req,res,next) {
  var db = require("../db/mongoUtil").getConnection();
db.collection('portfolio_cache').find({"chickletid":req.params.chickletid}).toArray(function(err, object) {
    console.log(object);
    if(object.length > 0)
          res.status(200).json(object);
        else{
  db.collection('user_profile').find({"profiles.id":req.params.username}).toArray(function(err, doc) {
    doc[0].profiles.sections.forEach(function(section,index)
     {
       if(section.section_id==req.params.sectionname)
                 obj.push(section.chicklets);
       });
  });
 db.collection('portfolio_definition').find().toArray(function(err, doc) {
      doc[0].profiles.sections.forEach(function(section,index)
       {
         if(section.section_id==req.params.sectionname)
             section.chicklets.forEach(function(chicklet,index)
             {
                 if(chicklet.chickletid == req.params.chickletid)
                 {
                   obj.push(chicklet);
                 }
             });
         });
         obj[0].forEach(function(chicklet,index){
         if(chicklet.chickletid==obj[1].chickletid){
          obj1=_.merge(obj[1],chicklet);
          db.collection('portfolio_cache').insert(obj1);
          }
        });
        db.collection('portfolio_cache').find({}).toArray(function(err, object) {
           res.status(200).json(object);
          });
});
}
});
});
module.exports = router;
