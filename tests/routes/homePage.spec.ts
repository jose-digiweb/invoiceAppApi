import { app } from './../../src/index';
// Import dependencies
import request from 'supertest';

describe('Home page route', () => {
  describe('GET /api/v1', () => {
    describe('Given a successful request', () => {
      it('Should respond with 200 status code', done => {
        request(app).get('/api/v1').expect(200, done);
      });
    });
  });
});
