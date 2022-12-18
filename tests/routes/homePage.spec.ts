// Import dependencies
import request from 'supertest';

// Import modules
import { app } from './../../src/index';

describe('Home page route', () => {
  describe('GET /api/v1', () => {
    describe('Given a successful request', () => {
      it('Should respond with 200 status code', done => {
        request(app).get('/api/v1').expect(200, done);
      });
    });

    describe('Given a request to a wrong path', () => {
      it('Should respond with 404 status code', done => {
        request(app).get('/api/t1').expect(404, done);
      });
    });
  });
});
