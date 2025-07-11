const express = require('express');
const app = express();
app.use(express.json());

const registerRoute = require('./routes/register');
const getBppByOrderRoute = require('./routes/getBppByOrder');
const lookupRoute = require('./routes/lookup');

// Routes
app.use(registerRoute);
app.use(getBppByOrderRoute);
app.use(lookupRoute);

// Health Check
app.get('/', (_, res) => {
  res.send('✅ Beckn Registry is live');
});

// Start Server
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`🚀 Registry running at http://localhost:${PORT}`);
});
