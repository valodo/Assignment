var array = [];
var id = 0;

var express = require("express");
var bodyParser = require("body-parser");
var util = require("util");
var path = require("path");

var app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + "/pages"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    
    array.push({taskId: taskID, assignmentId: assignmentID, workerId: workerID, assignmentResult: assignmentResult});
    
    id = id + 1;
    console.log(array[0]);
    res.statusCode(200);
});

app.get('/assignment', function(req, res){
    res.send(array);
});

app.delete('/assignment/:assignmentId', function(req,res){
    var assignmentID = req.params.assignmentId;
    
    for(var i = 0; i < array.length; i++){
        if(array[i].assignmentId == assignmentID)
            {
                array.splice(i, 1);
            }
    }
    
    
    res.statusCode(200);
});

app.put('/assignment/:assignmentID', function(req, res){
    
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