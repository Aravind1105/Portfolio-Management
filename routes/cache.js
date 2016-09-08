var express = require("express");
var router = express.Router();
var _ = require('lodash');
var obj=[];
var obj1=[];
var obj2=[];
var obj3=[];
var obj33=[];
// router.get('/:username/:sectionname/:chickletid', function(req,res,next) {
router.get('/:username/getdata', function(req,res,next)
{
    var db = require("../db/mongoUtil").getConnection();
    // console.log(db);
    db.collection('portfolio_cache').find().toArray(function(err, object) {
      console.log(object.length);
        if(object.length > 0)
        {

        // console.log(req.params.username);
          res.status(200).json(object);
        }
        else {
          db.collection('user_profile').find({"profiles.id":req.params.username}).toArray(function(err, doc) {
            obj1=doc;
            console.log(doc);
            // console.log(obj1);
          });
          db.collection('portfolio_definition').find().toArray(function(err, doc) {
            obj2=doc;
            // console.log(doc);
            obj4=_.merge(obj1[0],obj2[0]);
            obj1[0].profiles.sections.forEach(function(section,index)
            {
             obj2[0].profiles.sections.forEach(function(section1,index)
              {
               if(section.section_id == section1.section_id)
                {
                  obj3=_.merge(section,section1);
                  section.chicklets.forEach(function(chicklet,index)
                   {
                     section1.chicklets.forEach(function(chicklet1,index)
                     {
                       if(chicklet.chickletid == chicklet1.chickletid)
                       {
                          obj=_.merge(chicklet,chicklet1);
                          if(obj3.chicklets.chickletid == obj.chickletid)
                          obj3.chicklets[index].chicklet_data.push(obj);

                       }
                   });
                 });
                obj33.push(obj3);
                console.log(obj33);
                }
             });
           });
            obj4.profiles.sections=obj33;
            // console.log(obj4);
            db.collection('portfolio_cache').insert(obj4);
            db.collection('portfolio_cache').find({}).toArray(function(err, object) {
               res.status(200).json(object);
            });
        });
      }
   });
});

module.exports = router;
