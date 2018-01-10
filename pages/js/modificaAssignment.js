var nodeLocation = "http://localhost:5000/";
var serverLocation = "https://nameless-inlet-27677.herokuapp.com/";

var invio = function () {
  var assignmentId = document.getElementById("assignmentId");
  var taskId = document.getElementById("taskId");
  var workerId = document.getElementById("workerId");
  var assignmentResult = document.getElementById("assignmentResult");

  var body={
    "taskId" : taskId.value,
    "workerId" : workerId.value,
    "assignmentResult" : assignmentResult.value
  };
    
    alert("assId:" + assignmentId.value);

  // var url = nodeLocation + "assignment/" + assignmentId.value;
    var url = serverLocation + "assignment/" + assignmentId.value;
    
    
    alert("url:" +url);
  fetch(url,{
    method: "put",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response)=>{

    var newUrl = serverLocation + "index.html";
    document.location.href = newUrl;
  }).catch(function(){
      alert("Error");
  });
};
