const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Utility function to prompt the operator via the terminal
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// POST /authorize endpoint for human approval
app.post('/authorize', async (req, res) => {
  const { userId, sessionToken, scope } = req.body;
  console.log('\n=== Authorization Request Received ===');
  console.log(`User: ${userId}`);
  console.log(`Requested Scope: ${scope}`);
  console.log('======================================');

  // (Optional) Validate sessionToken or perform additional security checks

  // Prompt the operator for approval
  const answer = await askQuestion(`Approve request for user ${userId} with scope "${scope}"? (yes/no): `);
  const authorized = answer.trim().toLowerCase() === 'yes';
  console.log(`Operator response: ${answer.trim()} → Authorized: ${authorized}\n`);

  res.json({ authorized });
});

// Start the server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Authorization service running on port ${PORT}`);
});
