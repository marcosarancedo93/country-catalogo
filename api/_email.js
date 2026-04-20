const nodemailer = require('nodemailer');

const fmt = n => '$' + Math.round(Number(n)).toLocaleString('es-AR');

const GMAIL = 'country.homedeco.ar@gmail.com';

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL,
      pass: process.env.GMAIL_PASS
    }
  });
}

async function sendEmail(to, subject, html) {
  const transporter = getTransporter();
  const result = await transporter.sendMail({
    from: `Country Home Deco <${GMAIL}>`,
    to: Array.isArray(to) ? to.join(',') : to,
    subject,
    html
  });
  return result;
}

// Email para Marco (interno)
function buildAdminHTML({ buyer, items, shipping, total, paymentId, type }) {
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

// Email para el comprador (confirmación)
function buildBuyerHTML({ buyerName, items, shipping, total, type }) {
  const itemsHTML = (items || []).map(i =>
    `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;font-size:0.9em;color:#3a2e20;">${i.name || i.title}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;text-align:center;font-size:0.9em;color:#8a6840;">${i.qty || i.quantity}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;text-align:right;font-size:0.9em;color:#3a2e20;">${fmt((i.price || i.unit_price) * (i.qty || i.quantity))}</td>
    </tr>`
  ).join('');

  const paymentNote = type === 'transfer'
    ? `<div style="background:#f5ead8;border-left:3px solid #c4a87a;padding:12px 16px;margin:20px 0;font-size:0.88em;color:#3a2e20;">
        <strong>Próximo paso:</strong> Verificamos tu transferencia y te confirmamos el envío a la brevedad.
       </div>`
    : `<div style="background:#f5ead8;border-left:3px solid #c4a87a;padding:12px 16px;margin:20px 0;font-size:0.88em;color:#3a2e20;">
        <strong>Pago acreditado.</strong> Estamos preparando tu pedido para enviarlo.
       </div>`;

  return `
  <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e8d5b5;">

    <!-- Header -->
    <div style="background:#2c1f0e;padding:32px 28px;text-align:center;">
      <div style="font-size:2em;font-weight:300;letter-spacing:12px;color:#f5ead8;text-transform:uppercase;margin-bottom:6px;">Country</div>
      <div style="width:60px;height:1px;background:#c4a87a;margin:0 auto 8px;"></div>
      <div style="font-size:0.68em;letter-spacing:5px;color:#c4a87a;text-transform:uppercase;">Home & Deco</div>
    </div>

    <!-- Gracias -->
    <div style="background:#f5ead8;padding:28px 28px 20px;text-align:center;">
      <div style="font-size:1.6em;color:#2c1f0e;font-weight:300;letter-spacing:1px;margin-bottom:8px;">¡Gracias por tu compra, ${buyerName?.split(' ')[0] || ''}!</div>
      <div style="font-size:0.9em;color:#6a4f30;line-height:1.6;">Recibimos tu pedido y ya estamos trabajando en él.<br>Te avisamos cuando esté listo para despachar.</div>
    </div>

    <!-- Contenido -->
    <div style="padding:24px 28px;">
      ${paymentNote}

      <h3 style="margin:0 0 12px;color:#2c1f0e;font-size:0.9em;text-transform:uppercase;letter-spacing:2px;">Tu pedido</h3>
      <table style="width:100%;margin-bottom:20px;">
        <thead>
          <tr>
            <th style="text-align:left;color:#8a6840;font-weight:400;font-size:0.8em;padding-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Producto</th>
            <th style="text-align:center;color:#8a6840;font-weight:400;font-size:0.8em;padding-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Cant.</th>
            <th style="text-align:right;color:#8a6840;font-weight:400;font-size:0.8em;padding-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemsHTML}</tbody>
      </table>

      <table style="width:100%;font-size:0.9em;color:#3a2e20;">
        <tr>
          <td style="color:#8a6840;padding:4px 0;">Envío — ${shipping?.label || '—'}</td>
          <td style="text-align:right;padding:4px 0;">${fmt(shipping?.cost || 0)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;font-size:1.05em;padding-top:10px;border-top:2px solid #2c1f0e;">TOTAL</td>
          <td style="text-align:right;font-weight:700;font-size:1.05em;padding-top:10px;border-top:2px solid #2c1f0e;">${fmt(total)}</td>
        </tr>
      </table>

      <!-- Contacto -->
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0e8d8;text-align:center;font-size:0.84em;color:#8a6840;line-height:1.8;">
        ¿Tenés alguna consulta? Escribinos por WhatsApp<br>
        <a href="https://wa.me/541131655653" style="color:#2c1f0e;font-weight:600;text-decoration:none;">+54 9 11 3165-5653</a>
        &nbsp;·&nbsp;
        <a href="https://instagram.com/country.homedeco" style="color:#2c1f0e;font-weight:600;text-decoration:none;">@country.homedeco</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#2c1f0e;padding:16px 28px;text-align:center;">
      <div style="font-size:0.72em;letter-spacing:3px;color:#c4a87a;text-transform:uppercase;">Feel at Home</div>
    </div>

  </div>`;
}

module.exports = { sendEmail, buildAdminHTML, buildBuyerHTML };
