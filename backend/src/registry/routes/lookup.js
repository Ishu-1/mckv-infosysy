const express = require('express');
const router = express.Router();
const { getParticipantById } = require('../utils/participantsStore');

router.get('/lookup', (req, res) => {
  const { subscriber_id } = req.query;
  if (!subscriber_id) return res.status(400).json({ error: 'Missing subscriber_id' });

  const participant = getParticipantById(subscriber_id);
  if (!participant) return res.status(404).json({ error: 'Subscriber not found' });

  res.json(participant);
});

module.exports = router;
