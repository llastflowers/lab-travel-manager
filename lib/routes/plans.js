const { Router } = require('express');
const Plan = require('../models/Plan');

module.exports = Router()
  .post('/', (req, res) => {
    Plan
      .create(req.body)
      .then(plan => res.send(plan));
  })

  .get('/', (req, res) => {
    Plan
      .find()
      .select({ notes: false })
      .then(plans => res.send(plans));
  })

  .get('/:id', (req, res) => {
    Plan
      .findById(req.params.id)
      .populate('tripId')
      .then(plan => res.send(plan));
  })

  .patch('/:id', (req, res) => {
    Plan
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(plan => res.send(plan));
  })

  .delete('/:id', (req, res) => {
    Plan
      .findByIdAndDelete(req.params.id)
      .then(plan => res.send(plan));
  });
