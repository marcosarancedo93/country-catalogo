const { sendEmail, buildAdminHTML, buildBuyerHTML } = require('./_email');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const { cart, buyer, shipping, total } = body;

    // Email a Marco
    await sendEmail(
      'country.homedeco.ar@gmail.com',
      `🏦 Transferencia pendiente — $${Math.round(total).toLocaleString('es-AR')}`,
      buildAdminHTML({ type: 'transfer', buyer, items: cart, shipping, total })
    );

    // Email al comprador
    if (buyer?.email) {
      await sendEmail(
        buyer.email,
        '¡Gracias por tu compra! — Country Home & Deco',
        buildBuyerHTML({ type: 'transfer', buyerName: buyer.name, items: cart, shipping, total })
      );
    }

    console.log('[Emails sent] Transfer order from', buyer?.name);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[Order error]', err.message);
    res.status(500).json({ error: err.message });
  }
};
