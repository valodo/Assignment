var nodeLocation = "http://localhost:8080/";
var serverLocation = "http://localhost:8080/";

var invio = function () {
  var taskId = document.getElementById("taskId");
  var workerId = document.getElementById("workerId");
  var assignmentResult = document.getElementById("assignmentResult");

  var body={
    "taskId" : taskId.value,
    "workerId" : workerId.value,
    "assignmentResult" : assignmentResult.value
  };

  var url = nodeLocation + "assignment";
  fetch(url,{
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response)=>{

    var newUrl = serverLocation + "index.html";
    document.location.href = newUrl;
  });
};
