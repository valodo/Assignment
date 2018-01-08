var nodeLocation = "http://localhost:8080/";
var serverLocation = "http://localhost:8080/";

var cancella = function () {
  var assignmentId = document.getElementById("assignmentId");

  var url = nodeLocation + "assignment/" + assignmentId.value;
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
