var nodeLocation = "http://localhost:5000/";
var serverLocation = "https://nameless-inlet-27677.herokuapp.com/";

function visualizza () {

    //var url = nodeLocation + "assignment";
    var url = serverLocation + "assignment";
    fetch(url, {
        method:"get",
        headers: {
        'Content-Type': 'application/json'
        }
    }).then ((response) => {
        alert(response);
        var data = response.json();
        return data;
    }).then ((data) =>{
      console.log(data);

      var div = document.getElementById("visAssigment");

      for (var i = 0; i < data.length; i++) {
        var assignment = document.createElement('div');
        assignment.id = data[i].assignmentId;

        assignment.innerHTML = "AssignmentId: " + data[i].assignmentId + "; TaskId: " + data[i].taskId + "; WorkerId: " + data[i].workerId + "; AssignmentResult: " + data[i].assignmentResult;

        div.appendChild(assignment);
      }
    });

};
