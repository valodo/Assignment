const request = require('supertest');
const app = require('./index');


const root = "http://localhost:5000"
const fetch = require("node-fetch")
const assignmentsRoot = root+'/assignment'

const exampleAssignment = {
    taskId: "1111",
    assignmentId: "0",
    workerId: "A1",
    assignmentResult: {}
}

const postAssignments = function (newAssignment) {
    console.log(assignmentsRoot);
    console.log(newAssignment);
    return fetch(assignmentsRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAssignment)
    })
}

describe('Test POST Assignment', () => {
    
    test('Post correct assignment', async () => {
      return postAssignments(exampleAssignment)
      /*.get('/assignment')
      .send({
        taskId: exampleAssignment.taskId,
        workerId: exampleAssignment.workerId,
        assignmentResult: exampleAssignment.assignmentResult
      })*/
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
});

describe('Test DELETE Assignment', () => {
    
    test('DELETE correct assignment', async () => {
      return request(app)
      .delete('/assignment/1')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
});

describe('Test UPDATE Assignment', () => {
    
    test('UPDATE correct assignment', async () => {
      return request(app)
      .put('/assignment/'+ exampleAssignment.assignmentId)
      .send({
          taskId: "Panciotto",
          workerId: "Lagnotto",
          assignmentResult: {}
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
    
    test('UPDATE incorrect assignment', async () => {
      return request(app)
      .put('/assignment/5')
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
    });
});

describe('Test GET Assignments', () => {
    
    test('GET correct assignment', async () => {
      return request(app)
      .get('/assignment')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].assignmentId).toBe("0");
      });
    });
    
    test('UPDATE incorrect assignment', async () => {
      return request(app)
      .put('/assignment/5')
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
    });
});
