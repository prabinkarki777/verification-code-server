import request from 'supertest';
import app from '@app';

describe('Verification App Setup', () => {
  it('should handle CORS correctly', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  it('should handle Helmet security headers', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.headers['x-frame-options']).toBeDefined();
    expect(response.headers['x-xss-protection']).toBeDefined();
    expect(response.headers['x-content-type-options']).toBeDefined();
  });

  it('should handle unknown routes with 404 error', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error.message).toBe('Route not found!');
    expect(response.body.error.code).toBe('NOT_FOUND');
    expect(response.body.success).toBe(false);
    expect(response.body.error.requestId).toBeDefined();
    expect(response.body.error.timestamp).toBeDefined();
  });
});

describe('POST /verify', () => {
  it('should return 200 when code is valid', async () => {
    const response = await request(app).post('/api/v1/verify').send({ code: '123456' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Code verification successful');
  });

  it('should return 400 when code is not valid', async () => {
    const response = await request(app).post('/api/v1/verify').send({ code: '12345' });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toEqual({
      code: 'INVALID_CODE',
      message: 'Invalid code provided. Please provide a valid 6-digit code.',
      requestId: expect.any(String),
      timestamp: expect.any(String),
    });
  });

  it('should return 400 when code ends with 7', async () => {
    const response = await request(app).post('/api/v1/verify').send({ code: '123457' });

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual({
      code: 'INVALID_CODE',
      message: 'Invalid code provided. Please provide a valid 6-digit code.',
      requestId: expect.any(String),
      timestamp: expect.any(String),
    });
  });
});
