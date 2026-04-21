const { sendEmail, buildAdminHTML, buildBuyerHTML } = require('./_email');
const { sendCAPIEvent } = require('./_capi');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const { type, data } = body || {};
    console.log(`[MP Webhook] type=${type} id=${data?.id}`);

    if (type === 'payment' && data?.id) {
      const mpResp = await fetch(
        `https://api.mercadopago.com/v1/payments/${data.id}`,
        { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } }
      );
      const payment = await mpResp.json();
      console.log(`[MP Payment] status=${payment.status} amount=${payment.transaction_amount}`);

      if (payment.status === 'approved') {
        const meta = payment.metadata || {};
        const rawItems = payment.additional_info?.items || [];
        const items = rawItems
          .filter(i => i.id !== 'envio')
          .map(i => ({ name: i.title, qty: i.quantity, price: i.unit_price }));
        const shippingItem = rawItems.find(i => i.id === 'envio');
        const shipping = {
          label: meta.shipping_label || shippingItem?.title || '—',
          cost: meta.shipping_cost || shippingItem?.unit_price || 0
        };
        const buyer = {
          name: meta.buyer_name,
          phone: meta.buyer_phone,
          email: payment.payer?.email,
          address: meta.buyer_address,
          notes: meta.buyer_notes
        };
        const total = payment.transaction_amount;

        // Email a Marco
        await sendEmail(
          'country.homedeco.ar@gmail.com',
          `🛒 Nueva venta — $${Math.round(total).toLocaleString('es-AR')}`,
          buildAdminHTML({ type: 'mp', buyer, items, shipping, total, paymentId: data.id })
        );

        // Email al comprador
        if (buyer.email) {
          await sendEmail(
            buyer.email,
            '¡Gracias por tu compra! — Country Home & Deco',
            buildBuyerHTML({ type: 'mp', buyerName: buyer.name, items, shipping, total })
          );
        }

        // CAPI Purchase event
        await sendCAPIEvent({
          eventName: 'Purchase',
          userData: { email: buyer.email, phone: buyer.phone, name: buyer.name },
          customData: { value: total, currency: 'ARS', content_ids: items.map(i => i.id || i.name), content_type: 'product', num_items: items.reduce((s,i) => s + (i.qty||1), 0) }
        });

        console.log('[Emails sent] MP payment', data.id);
      }
    }
  } catch (err) {
    console.error('[Webhook error]', err.message);
  }

  res.status(200).json({ received: true });
};
