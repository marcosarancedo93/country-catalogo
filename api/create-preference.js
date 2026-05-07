const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const { items, shipping, buyer } = body;

    const totalItems = items.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);
    const totalAmount = totalItems + (shipping.cost > 0 ? Number(shipping.cost) : 0);

    const mpItems = [{
      id: 'country-order',
      title: 'Country Home & Deco',
      picture_url: 'https://countryhomedeco.vercel.app/logo_country_500x500.png',
      quantity: 1,
      unit_price: totalAmount,
      currency_id: 'ARS'
    }];

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: buyer.name,
          email: buyer.email,
          phone: { area_code: '11', number: buyer.phone }
        },
        back_urls: {
          success: 'https://countryhomedeco.vercel.app?payment=success',
          failure: 'https://countryhomedeco.vercel.app?payment=failure',
          pending: 'https://countryhomedeco.vercel.app?payment=pending'
        },
        auto_return: 'approved',
        notification_url: 'https://countryhomedeco.vercel.app/api/notify',
        metadata: {
          buyer_name: buyer.name,
          buyer_phone: buyer.phone,
          buyer_address: `${buyer.address}, ${buyer.city}, ${buyer.province}`,
          buyer_notes: buyer.notes || '',
          shipping_label: shipping.label,
          shipping_cost: shipping.cost
        },
        statement_descriptor: 'Country Home Deco',
        payment_methods: {
          installments: 12
        }
      }
    });

    res.status(200).json({
      id: result.id,
      init_point: result.init_point
    });

  } catch (err) {
    console.error('MP error:', err);
    res.status(500).json({ error: err.message });
  }
};
