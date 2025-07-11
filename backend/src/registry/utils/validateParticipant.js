function validateParticipant(participant) {
  const requiredFields = [
    'subscriber_id',
    'subscriber_url',
    'signing_public_key',
    'encr_public_key',
    'endpoints'
  ];

  const missing = requiredFields.filter(field => !participant[field]);
  if (missing.length > 0) return `Missing fields: ${missing.join(', ')}`;

  if (!participant.endpoints.check_order) return 'Missing check_order endpoint';

  return null; // No error
}

module.exports = validateParticipant;
