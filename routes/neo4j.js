var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost",neo4j.auth.basic('neo4j','password@123'));

var session = driver.session();

session.run('Create (alice:person {name:"Blahh"}) return alice.name')
	.subscribe({
		onNext: function(data) {
			console.log("On Next:",data);
		},
		onCompleted: function(data) {
			console.log("On onCompleted",data);
		},
		onError: function(data) {
			console.log("on Error",data);
		}
	}); 