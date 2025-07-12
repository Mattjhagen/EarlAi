const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { twiml } = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
  const incomingMsg = req.body.Body;
  const fromNumber = req.body.From;

  // Call your Retell agent here (or use OpenAI if you're proxying it)
  const reply = await getLLMReply(incomingMsg, fromNumber);

  const response = new twiml.MessagingResponse();
  response.message(reply);

  res.type('text/xml');
  res.send(response.toString());
});

async function getLLMReply(message, sessionId) {
  try {
    const response = await axios.post('https://api.retellai.com/v1/message', {
      message,
      session_id: sessionId
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.reply || "Hmm 🤔 I need a minute to think about that...";
  } catch (error) {
    console.error('Retell API error:', error.response?.data || error.message);
    return "Oops! Something went wrong with my brain 🧠";
  }
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
