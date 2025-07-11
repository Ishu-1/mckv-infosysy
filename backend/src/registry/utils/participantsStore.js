// In-memory participant store
const participants = [];

function addParticipant(participant) {
  participants.push(participant);
}

function existsParticipant(subscriber_id) {
  return participants.some(p => p.subscriber_id === subscriber_id);
}

function getAllParticipants() {
  return participants;
}

function getParticipantById(subscriber_id) {
  return participants.find(p => p.subscriber_id === subscriber_id);
}

module.exports = {
  addParticipant,
  existsParticipant,
  getAllParticipants,
  getParticipantById
};
