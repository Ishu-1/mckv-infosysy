const express = require('express');
const router = express.Router();
const { addParticipant, existsParticipant } = require('../utils/participantsStore');
const validateParticipant = require('../utils/validateParticipant');

router.post('/register_participant', (req, res) => {
  const participant = req.body;

  const error = validateParticipant(participant);
  if (error) return res.status(400).json({ error });

  if (existsParticipant(participant.subscriber_id)) {
    return res.status(409).json({ error: 'Participant already exists' });
  }

  addParticipant({ ...participant, status: 'SUBSCRIBED' });
  return res.status(201).json({ message: 'Participant registered successfully' });
});

module.exports = router;
