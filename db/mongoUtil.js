var MongoClient = require("mongodb").MongoClient;
var _db;

module.exports = {
  getConnection: function(url,callback) {
    // console.log("hello"+_db);
    if(_db) {
      return _db;
    }
    else {
      MongoClient.connect(url,function(err,db) {
        _db = db;
        callback(err,db);
      });
    }
  }
};
