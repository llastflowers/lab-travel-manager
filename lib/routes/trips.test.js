require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const Plan = require('../models/Plan');

describe('trip routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let plans;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'Mordor',
      latLong: '33.17638, -96.7886'
    });

    plans = await Plan.create([
      {
        tripId: trip._id,
        day: 'Sunday',
        activity: 'simply walk in'
      },
      {
        tripId: trip._id,
        day: 'Monday',
        activity: 'Mount Doom summit and picnic'
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'Mordor',
        latLong: '33.17638, -96.7886'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mordor',
          latLong: '33.17638, -96.7886',
          __v: 0
        });
      });
  });

  it('gets all trips', async() => {
    const trips = await Trip.create([
      { name: 'Mordor', latLong: '33.17638, -96.7886' },
      { name: 'Narnia', latLong: '28.3567, -81.5611' },
      { name: 'Hogwarts', latLong: '38.265676, -122.6512' }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name,
          });
        });
      });
  });

  it('gets a trip by id', async() => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: 'Mordor',
          latLong: '33.17638, -96.7886',
          plans: JSON.parse(JSON.stringify(plans)),
          __v: 0
        });
      });
  });

  it('updates a trip by id', async() => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ name: 'Mordor, TX' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mordor, TX',
          latLong: '33.17638, -96.7886',
          __v: 0
        });
      });
  });

  it('deletes a trip by id', async() => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mordor',
          latLong: '33.17638, -96.7886',
          __v: 0
        });

        return Plan.find();
      })
      .then(plans => {
        expect(plans).toHaveLength(0);
      });
  });
});
