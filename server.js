var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'ieee-mf'
});
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

 app.post('/', function(request, response) {
	var name = request.body.name;
	var email = request.body.email;
	var phone = request.body.phoneNumber;
	var uni = request.body.university;
	var faculty = request.body.faculty;
	var acadYear = request.body.academicYear;
	var workshops = request.body.workshop;

	//response.send(`Full name is:${request.body.name}.`);

	if (name && acadYear &&workshops) {
		connection.query('INSERT INTO `ieee-form`(`name`,`mail`,`phone`,`uni`,`fac`,`academic_year`,`workshops`) VALUES ("'+name+'","'+email+'","'+phone+'","'+uni+'","'+faculty+'","'+acadYear+'","'+workshops+'")', function(error, results, fields) {		
		if(error){
			throw error
		}
		else{
			response.send('Your submit is succefully sent. Thank you! :)');
		}	
		});
	} else
	{
		response.send('Please enter the required fields!');
		response.end();
	} 
}); 
app.listen(3000)
