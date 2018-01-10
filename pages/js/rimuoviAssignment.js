var nodeLocation = "http://localhost:5000/";
var serverLocation = "https://nameless-inlet-27677.herokuapp.com/";

var cancella = function () {
  var assignmentId = document.getElementById("assignmentId");

// var url = nodeLocation + "assignment/" + assignmentId.value;
var url = serverLocation + "assignment/" + assignmentId.value;
  console.log(assignmentId.value);
  fetch(url,{
    method: "delete",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response)=>{
    var newUrl = serverLocation + "index.html";
    document.location.href = newUrl;
  });
};
