require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const Plan = require('../models/Plan');

describe('plan routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let plan;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'Mordor',
      latLong: '33.17638, -96.7886'
    });

    plan = await Plan.create({
      tripId: trip._id,
      day: 'Sunday',
      activity: 'simply walk in'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a plan', () => {
    return request(app)
      .post('/api/v1/plans')
      .send({
        tripId: trip._id,
        day: 'Sunday',
        activity: 'simply walk in'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          day: 'Sunday',
          activity: 'simply walk in',
          __v: 0
        });
      });
  });

  it('deletes an plan by id', async() => {
    return request(app)
      .delete(`/api/v1/plans/${plan._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          day: 'Sunday',
          activity: 'simply walk in',
          __v: 0
        });
      });
  });
});
