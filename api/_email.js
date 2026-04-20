const fmt = n => '$' + Math.round(Number(n)).toLocaleString('es-AR');

async function sendEmail(subject, html) {
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Country Home Deco <onboarding@resend.dev>',
      to: ['country.homedeco.ar@gmail.com'],
      subject,
      html
    })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(data));
  return data;
}

function buildHTML({ buyer, items, shipping, total, paymentId, type }) {
  const itemsHTML = (items || []).map(i =>
    `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #f0e8d8;">${i.name || i.title}</td>
      <td style="padding:6px 0;border-bottom:1px solid #f0e8d8;text-align:center;">${i.qty || i.quantity}</td>
      <td style="padding:6px 0;border-bottom:1px solid #f0e8d8;text-align:right;">${fmt((i.price || i.unit_price) * (i.qty || i.quantity))}</td>
    </tr>`
  ).join('');

  const badge = type === 'transfer'
    ? `<span style="background:#5a7a4a;color:white;padding:4px 12px;border-radius:20px;font-size:0.8em;">🏦 Transferencia pendiente</span>`
    : `<span style="background:#009ee3;color:white;padding:4px 12px;border-radius:20px;font-size:0.8em;">💳 Pago con Mercado Pago</span>`;

  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#faf7f3;border-radius:8px;overflow:hidden;">
    <div style="background:#2c1f0e;padding:24px 28px;text-align:center;">
      <div style="font-size:1.8em;font-weight:300;letter-spacing:10px;color:#f5ead8;text-transform:uppercase;">Country</div>
      <div style="font-size:0.7em;letter-spacing:4px;color:#c4a87a;margin-top:4px;">NUEVA VENTA</div>
    </div>
    <div style="padding:24px 28px;">
      <div style="margin-bottom:16px;">${badge}</div>

      <h3 style="margin:0 0 12px;color:#2c1f0e;font-size:1em;">Comprador</h3>
      <table style="width:100%;font-size:0.88em;color:#3a2e20;margin-bottom:20px;">
        <tr><td style="color:#8a6840;width:110px;">Nombre</td><td><strong>${buyer?.name || '—'}</strong></td></tr>
        <tr><td style="color:#8a6840;">Teléfono</td><td>${buyer?.phone || '—'}</td></tr>
        <tr><td style="color:#8a6840;">Email</td><td>${buyer?.email || '—'}</td></tr>
        <tr><td style="color:#8a6840;">Dirección</td><td>${buyer?.address || '—'}</td></tr>
        ${buyer?.notes ? `<tr><td style="color:#8a6840;">Notas</td><td>${buyer.notes}</td></tr>` : ''}
      </table>

      <h3 style="margin:0 0 12px;color:#2c1f0e;font-size:1em;">Productos</h3>
      <table style="width:100%;font-size:0.88em;color:#3a2e20;margin-bottom:20px;">
        <thead><tr>
          <th style="text-align:left;color:#8a6840;font-weight:400;padding-bottom:6px;">Producto</th>
          <th style="text-align:center;color:#8a6840;font-weight:400;padding-bottom:6px;">Cant.</th>
          <th style="text-align:right;color:#8a6840;font-weight:400;padding-bottom:6px;">Subtotal</th>
        </tr></thead>
        <tbody>${itemsHTML}</tbody>
      </table>

      <table style="width:100%;font-size:0.9em;color:#3a2e20;">
        <tr><td style="color:#8a6840;">Envío — ${shipping?.label || '—'}</td><td style="text-align:right;">${fmt(shipping?.cost || 0)}</td></tr>
        <tr><td style="font-weight:700;font-size:1.05em;padding-top:8px;">TOTAL</td><td style="text-align:right;font-weight:700;font-size:1.05em;padding-top:8px;">${fmt(total)}</td></tr>
      </table>

      ${paymentId ? `<p style="font-size:0.78em;color:#8a6840;margin-top:16px;">ID de pago MP: ${paymentId}</p>` : ''}
      ${type === 'transfer' ? `<div style="background:#f5ead8;border:1px solid #c4a87a;border-radius:4px;padding:12px;margin-top:16px;font-size:0.85em;"><strong>Verificar transferencia:</strong> Alias <strong>countryhomedeco</strong> · CVU 0000003100099040747536 · Monto esperado: <strong>${fmt(total)}</strong></div>` : ''}
    </div>
    <div style="background:#2c1f0e;padding:12px 28px;text-align:center;font-size:0.75em;color:#c4a87a;letter-spacing:2px;">COUNTRY HOME & DECO</div>
  </div>`;
}

module.exports = { sendEmail, buildHTML };
