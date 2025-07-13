const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { twiml } = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ SMS Handler
app.post('/sms', async (req, res) => {
  const incomingMsg = req.body.Body;
  const fromNumber = req.body.From;

  const reply = await getLLMReply(incomingMsg, fromNumber);

  const smsResponse = new twiml.MessagingResponse();
  smsResponse.message(reply);

  res.type('text/xml');
  res.send(smsResponse.toString());
});

// ✅ VOICE Handler (with redirect loop)
app.post('/voice', (req, res) => {
  const voiceResponse = new twiml.VoiceResponse();

  voiceResponse.say(
    {
      voice: 'Polly.Joanna',
      language: 'en-US'
    },
    'Hey there sugar! What can I help you with today?'
  );

  voiceResponse.pause({ length: 2 });

  voiceResponse.say(
    {
      voice: 'Polly.Joanna'
    },
    'You still there, sweetie?'
  );

  // 🔁 Loop the call to keep them engaged
  voiceResponse.redirect('/voice');

  res.type('text/xml');
  res.send(voiceResponse.toString());
});

// ✅ Retell Reply Handler
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
