var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var AssignmentSchema = new Schema({
    taskId: String,
    assignmentId: String,
    workerId: String,
    assignmentResult: Object
    
});

var Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;