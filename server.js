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

app.post('/voice', (req, res) => {
  const response = new twiml.VoiceResponse();

  const gather = response.gather({
    input: 'speech',
    action: '/process-voice',
    method: 'POST',
    timeout: 5
  });

  gather.say(
    { voice: 'Polly.Joanna' },
    "Hey sugar, what can I help you with today?"
  );

  app.post('/process-voice', async (req, res) => {
  const userSpeech = req.body.SpeechResult;
  const fromNumber = req.body.From;

  console.log(`👂 Caller said: ${userSpeech}`);

  const reply = await getLLMReply(userSpeech, fromNumber);

  const response = new twiml.VoiceResponse();
  response.say(
    { voice: 'Polly.Joanna' },
    reply
  );

  response.redirect('/voice'); // Keep the loop going

  res.type('text/xml');
  res.send(response.toString());
});

  // If no speech detected, loop again
  response.redirect('/voice');

  res.type('text/xml');
  res.send(response.toString());
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
    return "Oops! Soconst express = require('express');
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

app.post('/voice', (req, res) => {
  const response = new twiml.VoiceResponse();

  const gather = response.gather({
    input: 'speech',
    action: '/process-voice',
    method: 'POST',
    timeout: 5
  });

  gather.say(
    { voice: 'Polly.Joanna' },
    "Hey sugar, what can I help you with today?"
  );

  app.post('/process-voice', async (req, res) => {
  const userSpeech = req.body.SpeechResult;
  const fromNumber = req.body.From;

  console.log(`👂 Caller said: ${userSpeech}`);

  const reply = await getLLMReply(userSpeech, fromNumber);

  const response = new twiml.VoiceResponse();
  response.say(
    { voice: 'Polly.Joanna' },
    reply
  );

  response.redirect('/voice'); // Keep the loop going

  res.type('text/xml');
  res.send(response.toString());
});

  // If no speech detected, loop again
  response.redirect('/voice');

  res.type('text/xml');
  res.send(response.toString());
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
  console.log('Seconst express = require('express');
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

app.post('/voice', (req, res) => {
  const response = new twiml.VoiceResponse();

  const gather = response.gather({
    input: 'speech',
    action: '/process-voice',
    method: 'POST',
    timeout: 5
  });

  gather.say(
    { voice: 'Polly.Joanna' },
    "Hey sugar, what can I help you with today?"
  );

  app.post('/process-voice', async (req, res) => {
  const userSpeech = req.body.SpeechResult;
  const fromNumber = req.body.From;

  console.log(`👂 Caller said: ${userSpeech}`);

  const reply = await getLLMReply(userSpeech, fromNumber);

  const response = new twiml.VoiceResponse();
  response.say(
    { voice: 'Polly.Joanna' },
    reply
  );

  response.redirect('/voice'); // Keep the loop going

  res.type('text/xml');
  res.send(response.toString());
});

  // If no speech detected, loop again
  response.redirect('/voice');

  res.type('text/xml');
  res.send(response.toString());
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
    return "Oops! Soconst express = require('express');
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

app.post('/voice', (req, res) => {
  const response = new twiml.VoiceResponse();

  const gather = response.gather({
    input: 'speech',
    action: '/process-voice',
    method: 'POST',
    timeout: 5
  });

  gather.say(
    { voice: 'Polly.Joanna' },
    "Hey sugar, what can I help you with today?"
  );

  app.post('/process-voice', async (req, res) => {
  const userSpeech = req.body.SpeechResult;
  const fromNumber = req.body.From;

  console.log(`👂 Caller said: ${userSpeech}`);

  const reply = await getLLMReply(userSpeech, fromNumber);

  const response = new twiml.VoiceResponse();
  response.say(
    { voice: 'Polly.Joanna' },
    reply
  );

  response.redirect('/voice'); // Keep the loop going

  res.type('text/xml');
  res.send(response.toString());
});

  // If no speech detected, loop again
  response.redirect('/voice');

  res.type('text/xml');
  res.send(response.toString());
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
mething went wrong with my brain 🧠";
  }
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
rver is running on port 3000');
});
mething went wrong with my brain 🧠";
  }
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
