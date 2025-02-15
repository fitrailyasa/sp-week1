const request = require('supertest');
const app = require('../../src/app');
const { userOne } = require('../fixtures/user.fixture');
const { adminAccessToken } = require('../fixtures/token.fixture');

describe('Profile routes', () => {
  describe('/api/profile/:id', () => {
    test('should return 200 and update profile by id', async () => {
      const updateUser = { name: 'Updated Name', email: userOne.email, password: userOne.password, role: userOne.role };

      const res = await request(app)
        .put(`/api/profile/${userOne.id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateUser);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 200,
        message: 'Success update profile!',
        data: expect.objectContaining({
          id: userOne.id,
          name: updateUser.name,
          email: updateUser.email,
          password: updateUser.password,
          role: updateUser.role,
        }),
        error: null,
      });
    });
  });

  describe('ERROR HANDLING', () => {
    test('should return 400 if updating profile without required fields', async () => {
      const res = await request(app).put(`/api/profile/${userOne.id}`).set('Authorization', `Bearer ${adminAccessToken}`);

      expect(res.body).toEqual(
        expect.objectContaining({
          status: 400,
          message: 'Validation Error',
          data: null,
          error: expect.any(String),
        })
      );
    });

    test('should return 401 error unauthorized if no bearer access token', async () => {
      const res = await request(app).get('/api/profile');
      expect(res.body.message).toBe('Authorization header missing');
    });

    test('should return 404 NOT_FOUND if profile not found', async () => {
      const fakeUserId = '123456789abcdef123456789';
      const res = await request(app).get(`/api/profile/${fakeUserId}`).set('Authorization', `Bearer ${adminAccessToken}`);

      expect(res.body).toEqual({
        status: 404,
        message: 'User not found.',
        data: null,
        error: null,
      });
    });
  });
});
