const request = require('supertest');
const app = require('./index');


const exampleAssignment = {
    taskId: "1111",
    assignmentId: "01",
    workerId: "A1",
    assignmentResult: {}
}

describe('Test POST Assignment', () => {
    
    test('Post correct assignment', async () => {
      return request(app)
      .get('/assignment')
      .send({
        taskId: exampleAssignment.taskId,
        workerId: exampleAssignment.workerId,
        assignmentResult: exampleAssignment.assignmentResult
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
});

describe('Test DELETE Assignment', () => {
    
    test('DELETE incorrect assignment', async () => {
      return request(app)
      .get('/assignment/0')
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
    });
});
