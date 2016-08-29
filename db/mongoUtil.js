

var MongoClient = require( 'mongodb' ).MongoClient;

var _db;
var ObjectID = MongoClient.ObjectID;
module.exports = {

connectToServer: function(callback) {
   MongoClient.connect( "mongodb://localhost:27017/Portfolio-Management", function( err, db ) {
     if(err)
     {
          console.log(err);
          return;
     }
     _db = db;
     callback();
     db.close();
   } );
 },

 getDb: function() {
   return _db;
   // console.log(_db);
 }
};
