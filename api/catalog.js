const BASE = 'https://countryhomedeco.vercel.app';

const PRODUCTS = [
  {
    id: 'pampa-blanco',
    title: 'Centro de Mesa PAMPA — Blanco',
    description: 'Bandeja hoja decorativa blanca. Pieza artesanal ideal para centros de mesa y decoración del hogar.',
    price: 44900,
    image: 'FOTOS/Hojas/ML BLANCA/1-copy-1.jpg',
    category: 'Hogar > Decoración > Centros de mesa'
  },
  {
    id: 'pampa-negro',
    title: 'Centro de Mesa PAMPA — Negro',
    description: 'Bandeja hoja decorativa negra. Pieza artesanal ideal para centros de mesa y decoración del hogar.',
    price: 44900,
    image: 'FOTOS/Hojas/ML NEGRA/1-copy-2.jpg',
    category: 'Hogar > Decoración > Centros de mesa'
  },
  {
    id: 'clay',
    title: 'Florero CLAY',
    description: 'Florero de cerámica artesanal blanco. Acabado rústico y elegante para cualquier ambiente.',
    price: 33900,
    image: 'FOTOS/Florero ceramica/ML/1.jpg',
    category: 'Hogar > Decoración > Floreros'
  },
  {
    id: 'stone',
    title: 'Florero STONE',
    description: 'Florero de vidrio ahumado gris. Diseño contemporáneo con acabado ahumado natural.',
    price: 33900,
    image: 'FOTOS/Florero de gris de vidrio/ML/1.jpg',
    category: 'Hogar > Decoración > Floreros'
  },
  {
    id: 'lena',
    title: 'Deck LENA',
    description: 'Bandeja oval negra mate. Versátil para difusores, velas o como pieza decorativa.',
    price: 24900,
    image: 'FOTOS/Tabla difusor/ML/WhatsApp Image 2026-03-25 at 8.31.29 PM (Embellecedor de Producto)-copy-0.jpg',
    category: 'Hogar > Decoración > Bandejas'
  },
  {
    id: 'kuro',
    title: 'Tabla KURO',
    description: 'Tabla sushi negra estriada. Diseño minimalista de inspiración japonesa.',
    price: 24900,
    image: 'FOTOS/Tabla difusor 2/ML/SUSHI ML/1 (Product Beautifier) (12).jpg',
    category: 'Hogar > Decoración > Bandejas'
  },
  {
    id: 'wabi',
    title: 'Tabla WABI',
    description: 'Tabla sushi negra con bowl integrado. Set completo para una presentación elegante.',
    price: 24900,
    image: 'FOTOS/tabla difusor 3/ML/SUSHI ML/suhi tabla 1 .jpg',
    category: 'Hogar > Decoración > Bandejas'
  },
  {
    id: 'ranch',
    title: 'Deck RANCH',
    description: 'Bandeja rectangular negra 29cm. Ideal para organizar y decorar mesadas y aparadores.',
    price: 36900,
    image: 'FOTOS/Tabla difusor 4/ML/1.jpg',
    category: 'Hogar > Decoración > Bandejas'
  },
  {
    id: 'grove',
    title: 'Deck GROVE',
    description: 'Bandeja redonda negra. Elegante pieza decorativa para centros de mesa y estantes.',
    price: 24900,
    image: 'FOTOS/tabla de apoyo/ML/1.jpg',
    category: 'Hogar > Decoración > Bandejas'
  },
  {
    id: 'clover',
    title: 'Set x3 CLOVER',
    description: 'Set de 3 difusores decorativos negros. Complemento perfecto para cualquier rincón del hogar.',
    price: 29900,
    image: 'FOTOS/Difusores x3/ML/1.jpg',
    category: 'Hogar > Decoración > Sets decorativos'
  },
  {
    id: 'love',
    title: 'Pieza de Decoración LOVE',
    description: 'Figura decorativa plateada. Detalle de diseño con acabado sofisticado.',
    price: 24900,
    image: 'FOTOS/love/ML/WhatsApp Image 2026-03-25 at 8.31.28 PM (Embellecedor de Producto).jpg',
    category: 'Hogar > Decoración > Figuras decorativas'
  },
  {
    id: 'ember',
    title: 'Vela EMBER',
    description: 'Vela aromática negra. Fragancia envolvente para crear ambientes únicos en el hogar.',
    price: 14900,
    image: 'FOTOS/Belas/1/ML/1.jpg',
    category: 'Hogar > Decoración > Velas'
  },
  {
    id: 'haven',
    title: 'Vela HAVEN',
    description: 'Vela aromática negra. Aroma sofisticado para transformar cualquier espacio.',
    price: 14900,
    image: 'FOTOS/Belas/2/ML/1.jpg',
    category: 'Hogar > Decoración > Velas'
  },
  {
    id: 'amber',
    title: 'Vela AMBER',
    description: 'Vela aromática negra. Fragancia cálida y duradera para el hogar.',
    price: 14900,
    image: 'FOTOS/Belas/3/ML/1.jpg',
    category: 'Hogar > Decoración > Velas'
  },
  {
    id: 'dune',
    title: 'Libros DUNE',
    description: 'Set x3 libros decorativos. Detalle elegante para estantes, mesas y ambientaciones estilo home.',
    price: 29900,
    image: 'FOTOS/LIBROS/ML/1-copy-3.jpg',
    category: 'Hogar > Decoración > Libros decorativos'
  },
  {
    id: 'brisa',
    title: 'Florero BRISA',
    description: 'Florero de vidrio blanco ondulado. Diseño orgánico que aporta ligereza y elegancia.',
    price: 26900,
    image: 'FOTOS/Florero vidrio/BLANCO/ML/1.jpg',
    category: 'Hogar > Decoración > Floreros'
  },
  {
    id: 'coal',
    title: 'Florero COAL',
    description: 'Florero de vidrio negro ondulado. Pieza de impacto visual para espacios modernos.',
    price: 26900,
    image: 'FOTOS/Florero vidrio/NEGRO/ML/1.jpg',
    category: 'Hogar > Decoración > Floreros'
  },
  {
    id: 'terra',
    title: 'Maceta TERRA',
    description: 'Maceta con cara negro mate. Diseño artístico con personalidad para plantas y decoración.',
    price: 25900,
    image: 'FOTOS/FUENTE CARAS/ML/1.jpg',
    category: 'Hogar > Decoración > Macetas'
  },
  {
    id: 'home',
    title: 'Pieza de Decoración HOME',
    description: 'Pieza decorativa HOME. Detalle cálido para ambientar entradas, estantes y mesas.',
    price: 25900,
    image: 'FOTOS/HOME/1.jpg',
    category: 'Hogar > Decoración > Figuras decorativas'
  },
  {
    id: 'esencia-pepino-sandia',
    title: 'Esencia Pepino Sandía',
    description: 'Esencia para difusor aroma Pepino Sandía. Fragancia fresca y frutal para el hogar.',
    price: 12900,
    image: 'FOTOS/Esensias/Pepino sandia/1.jpg',
    category: 'Hogar > Aromaterapia > Esencias'
  },
  {
    id: 'esencia-moras-fresas',
    title: 'Esencia Moras y Fresas',
    description: 'Esencia para difusor aroma Moras y Fresas. Fragancia dulce y envolvente.',
    price: 12900,
    image: 'FOTOS/Esensias/fresas moras/1.jpg',
    category: 'Hogar > Aromaterapia > Esencias'
  },
  {
    id: 'esencia-frutal-pasion',
    title: 'Esencia Frutal de la Pasión',
    description: 'Esencia para difusor aroma Frutal de la Pasión. Fragancia tropical e intensa.',
    price: 12900,
    image: 'FOTOS/Esensias/frutos pasion/1.jpg',
    category: 'Hogar > Aromaterapia > Esencias'
  },
  {
    id: 'esencia-tilo-bamboo',
    title: 'Esencia Tilo Bamboo',
    description: 'Esencia para difusor aroma Tilo Bamboo. Fragancia fresca y serena para ambientes zen.',
    price: 12900,
    image: 'FOTOS/Esensias/tilo bamboo/1.jpg',
    category: 'Hogar > Aromaterapia > Esencias'
  }
];

function encodeImageUrl(path) {
  return BASE + '/' + path.split('/').map(encodeURIComponent).join('/');
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const items = PRODUCTS.map(p => `
    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${escapeXml(p.description)}</g:description>
      <g:link>${BASE}#${escapeXml(p.id)}</g:link>
      <g:image_link>${encodeImageUrl(p.image)}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${p.price} ARS</g:price>
      <g:brand>Country Home Deco</g:brand>
      <g:google_product_category>${escapeXml(p.category)}</g:google_product_category>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Country Home &amp; Deco</title>
    <link>${BASE}</link>
    <description>Catálogo oficial Country Home &amp; Deco — Decoración para el hogar</description>
    ${items}
  </channel>
</rss>`;

  res.status(200).send(xml);
};
