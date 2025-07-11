const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getAllParticipants } = require('../utils/participantsStore');

router.post('/get_bpp_by_order', async (req, res) => {
  const { order_id } = req.body;
  if (!order_id) return res.status(400).json({ error: 'Missing order_id' });

  const participants = getAllParticipants();

  for (let bpp of participants) {
    if (bpp.status !== 'SUBSCRIBED') continue;

    try {
      const { data } = await axios.post(bpp.endpoints.check_order, { order_id });
      if (data && data.found === true) {
        return res.json({
          message: 'Order matched with BPP',
          order_id,
          bpp: {
            bpp_id: bpp.subscriber_id,
            bpp_uri: bpp.subscriber_url,
            signing_public_key: bpp.signing_public_key,
            encr_public_key: bpp.encr_public_key,
            endpoints: bpp.endpoints
          }
        });
      }
    } catch (err) {
      console.error(`Error contacting ${bpp.subscriber_id}:`, err.message);
    }
  }

  return res.status(404).json({ error: 'Order ID not found with any registered BPP' });
});

module.exports = router;
