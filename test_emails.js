const { sendEmail, buildAdminHTML, buildBuyerHTML } = require('./api/_email');

process.env.GMAIL_PASS = 'gjuoilidfuqqbpyq';

const mockData = {
  buyer: {
    name: 'María González',
    phone: '11 5555-1234',
    email: 'country.homedeco.ar@gmail.com',
    address: 'Av. Santa Fe 1234, Piso 3',
    notes: 'PAMPA en color blanco por favor'
  },
  items: [
    { name: 'Centro de Mesa PAMPA', qty: 1, price: 44900 },
    { name: 'Set x3 CLOVER', qty: 1, price: 29900 }
  ],
  shipping: { label: 'Andreani Pack', cost: 29000 },
  total: 103800,
  type: 'mp',
  paymentId: 'TEST-123456789'
};

async function run() {
  console.log('Enviando email al admin (Marco)...');
  await sendEmail(
    'country.homedeco.ar@gmail.com',
    '🛒 [PRUEBA] Nueva venta — $103.800',
    buildAdminHTML(mockData)
  );
  console.log('✓ Email admin enviado');

  console.log('Enviando email al comprador...');
  await sendEmail(
    'country.homedeco.ar@gmail.com', // mismo inbox para ver ambos
    '✉️ [PRUEBA comprador] ¡Gracias por tu compra! — Country Home & Deco',
    buildBuyerHTML({ ...mockData, buyerName: mockData.buyer.name })
  );
  console.log('✓ Email comprador enviado');
  console.log('\nListo. Revisá country.homedeco.ar@gmail.com');
}

run().catch(console.error);
