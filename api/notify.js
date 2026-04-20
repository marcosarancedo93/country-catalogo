module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const { type, data } = body || {};
    console.log(`[MP Webhook] type=${type} id=${data?.id}`);

    if (type === 'payment' && data?.id) {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${data.id}`,
        { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } }
      );
      const payment = await response.json();
      console.log(`[MP Payment] status=${payment.status} amount=${payment.transaction_amount} payer=${payment.payer?.email}`);
    }
  } catch (err) {
    console.error('[MP Webhook error]', err);
  }

  res.status(200).json({ received: true });
};
