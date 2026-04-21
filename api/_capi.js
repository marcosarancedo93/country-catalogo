const https = require('https');
const crypto = require('crypto');

const PIXEL_ID = '1479825037203290';

function hash(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

async function sendCAPIEvent({ eventName, eventSourceUrl, userData = {}, customData = {} }) {
  const token = process.env.CAPI_TOKEN;
  if (!token) return;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: eventSourceUrl || 'https://countryhomedeco.vercel.app',
      user_data: {
        em: userData.email ? [hash(userData.email)] : undefined,
        ph: userData.phone ? [hash(userData.phone.replace(/\D/g, ''))] : undefined,
        fn: userData.name ? [hash(userData.name.split(' ')[0])] : undefined,
        ln: userData.name && userData.name.split(' ')[1] ? [hash(userData.name.split(' ')[1])] : undefined,
        ct: userData.city ? [hash(userData.city)] : undefined,
        country: ['ar']
      },
      custom_data: customData
    }]
  };

  return new Promise((resolve) => {
    const body = JSON.stringify(payload);
    const req = https.request({
      hostname: 'graph.facebook.com',
      path: `/v19.0/${PIXEL_ID}/events?access_token=${token}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', (e) => { console.error('[CAPI error]', e.message); resolve(null); });
    req.write(body);
    req.end();
  });
}

module.exports = { sendCAPIEvent };
