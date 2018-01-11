var array = [];
var id = 0;

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var util = require("util");
var path = require("path");


var Assignment = require("./modules/assignmentDB");

var app = express();


app.set("view options", {layout: false});
app.use(express.static(__dirname + "/pages"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
var options = {
    useMongoClient: true,
    user: 'admin',
    pass: 'password'
  };
mongoose.connect('mongodb://<admin>:<password>@ds247347.mlab.com:47347/assignments', options).then(
    () => { console.log('DB connected successfully!'); },
    err => { console.error(`Error while connecting to DB: ${err.message}`); }
);

var port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

app.post('/assignment', function(req, res){
    
    var taskID = req.body.taskId;
    var workerID = req.body.workerId;
    var assignmentResult = req.body.assignmentResult;
    var assignmentID = id;
    
    /*array.push({taskId: taskID, assignmentId: assignmentID, workerId: workerID, assignmentResult: assignmentResult});*/
    
    var newAssignment = Assignment({taskId: taskID, assignmentId: assignmentID, workerId: workerID, assignmentResult: assignmentResult});
    
    console.log('Trying to save the new user');
    newAssignment.save(function (err) {
        if (err) {
            console.log('Error while saving user');
            return handleError(err);
        }
        else {
            
            id = id + 1;
           
            console.log(newAssignment);
        }
    });
    
        res.statusCode = 200;
        res.send("");
});

app.get('/assignment', function(req, res){
    console.log("Searching all assignments...");
    Assignment.find(function (err, ass) {
        if (err) { res.send(err); }
        console.log(ass);
        res.json(ass);
    });
    //res.send(array);
});

app.delete('/assignment/:assignmentId', function(req,res){
    var assignmentID = req.params.assignmentId;
    
    /*for(var i = 0; i < array.length; i++){
        if(array[i].assignmentId == assignmentID)
            {
                array.splice(i, 1);
            }
    }*/
    
    Assignment.remove({assignmentId: assignmentID}, function(err){
        if (err) { res.status(404).send(err); }
		else{
            console.log("Assignment deleted");
            res.status(200).send("");
        }
	});
});

app.put('/assignment/:assignmentId', function(req, res){
    var assignmentID = req.params.assignmentId;
    var taskID = req.body.taskId;
    var workerID = req.body.workerId;
    var assignmentResult = req.body.assignmentResult;
    
    console.log("Updating assignment...");
    Assignment.findOne({ assignmentId: assignmentID }, function (err, doc){
        console.log("Prima");
        console.log(doc);
        if(err){
                console.log("ERROR...");
                return handleError(err);
        }
        else if(doc == null){
            console.log("Assignment not found");
            res.status(404).send("Not found");
        }
        else{
            doc.taskId = taskID;
            doc.workerId = workerID;
            doc.assignmentResult = assignmentResult;
            doc.save(function (err) {
                if (err) {
                    console.log('Error while saving user');
                    return handleError(err);
                }
                else {
                    console.log("Dopo")
                    console.log(doc);
                    res.status(200).send("");

                }
            });
        }
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});



app.listen(port);
console.log('Magic happens on port ' + port);


module.exports = app;