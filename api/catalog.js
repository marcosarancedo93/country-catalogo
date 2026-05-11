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
    title: 'Libros DUNE — Set x4',
    description: 'Set x4 libros decorativos. Detalle elegante para estantes, mesas y ambientaciones estilo home.',
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
  },

  // === COCINA — MISHKA ===

  // CARTAGO BLANCO GRANITE
  { id: 'plato-playo-cartago', title: 'Plato Playo Cartago Blanco Granite 27 cm', description: 'Plato playo de porcelana 27 cm. Línea Cartago Blanco Granite — diseño artesanal con textura natural y acabado premium.', price: 19999, image: 'FOTOS/mishka/plato-playo-cartago/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'plato-postre-cartago', title: 'Plato Postre Cartago Blanco Granite 21 cm', description: 'Plato postre de porcelana 21 cm. Línea Cartago Blanco Granite — textura natural con acabado artesanal.', price: 15499, image: 'FOTOS/mishka/plato-postre-cartago/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'bowl-cartago', title: 'Bowl Cartago Blanco Granite 15 cm', description: 'Bowl de porcelana 15 cm. Línea Cartago Blanco Granite — ideal para cereales, sopas y postres.', price: 13499, image: 'FOTOS/mishka/bowl-cartago/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'mug-cartago', title: 'Mug Cartago Blanco Granite 450 ml', description: 'Mug de porcelana 450 ml. Línea Cartago Blanco Granite — para el café o té de cada mañana.', price: 10999, image: 'FOTOS/mishka/mug-cartago/1.jpg', category: 'Hogar > Cocina > Tazas y Mugs' },

  // PORTOFINO (VASSA)
  { id: 'plato-playo-portofino', title: 'Plato Playo Portofino 26 cm', description: 'Plato playo de porcelana 26 cm. Línea Portofino — diseño elegante con acabado suave y artesanal.', price: 21999, image: 'FOTOS/mishka/plato-playo-portofino/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'plato-postre-portofino', title: 'Plato Postre Portofino 22 cm', description: 'Plato postre de porcelana 22 cm. Línea Portofino — complemento perfecto para una mesa bien puesta.', price: 16499, image: 'FOTOS/mishka/plato-postre-portofino/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'mug-portofino-400', title: 'Mug Portofino 400 ml', description: 'Mug de porcelana 400 ml. Línea Portofino — diseño cálido y minimalista para el uso diario.', price: 8999, image: 'FOTOS/mishka/mug-portofino-400/1.jpg', category: 'Hogar > Cocina > Tazas y Mugs' },
  { id: 'mug-portofino-410', title: 'Mug Portofino 410 ml', description: 'Mug de porcelana 410 ml. Línea Portofino — capacidad generosa para el café o infusiones.', price: 10999, image: 'FOTOS/mishka/mug-portofino-410/1.jpg', category: 'Hogar > Cocina > Tazas y Mugs' },

  // SORRENTO (VASSA)
  { id: 'plato-playo-sorrento', title: 'Plato Playo Sorrento 27,5 cm', description: 'Plato playo de porcelana 27,5 cm. Línea Sorrento — diseño artesanal con textura y carácter.', price: 25499, image: 'FOTOS/mishka/plato-playo-sorrento/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'plato-postre-sorrento', title: 'Plato Postre Sorrento 22 cm', description: 'Plato postre de porcelana 22 cm. Línea Sorrento — elegancia artesanal en cada detalle.', price: 17999, image: 'FOTOS/mishka/plato-postre-sorrento/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'bowl-sorrento', title: 'Bowl Sorrento 680 ml', description: 'Bowl de porcelana 680 ml. Línea Sorrento — amplio y elegante para pastas, ensaladas o sopas.', price: 17999, image: 'FOTOS/mishka/bowl-sorrento/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'azucarera-sorrento', title: 'Azucarera Sorrento 10,5x11 cm', description: 'Azucarera de porcelana 10,5x11 cm. Línea Sorrento — detalle que completa cualquier mesa.', price: 16999, image: 'FOTOS/mishka/azucarera-sorrento/1.jpg', category: 'Hogar > Cocina > Accesorios de mesa' },
  { id: 'lechera-sorrento', title: 'Lechera Sorrento 280 ml', description: 'Lechera de porcelana 280 ml. Línea Sorrento — pequeño detalle de gran impacto en la mesa.', price: 15499, image: 'FOTOS/mishka/lechera-sorrento/1.jpg', category: 'Hogar > Cocina > Accesorios de mesa' },
  { id: 'bandeja-sorrento', title: 'Bandeja Ovalada Sorrento 30x14,5 cm', description: 'Bandeja ovalada de porcelana 30x14,5 cm. Línea Sorrento — para servir con estilo.', price: 35999, image: 'FOTOS/mishka/bandeja-sorrento/1.jpg', category: 'Hogar > Cocina > Vajilla' },

  // SUNDARA
  { id: 'bowl-sundara-rectangular', title: 'Bowl Rectangular Sundara 700 ml', description: 'Bowl rectangular 700 ml. Diseño orgánico y artesanal — ideal para presentaciones en la mesa.', price: 45999, image: 'FOTOS/mishka/bowl-sundara-rectangular/1.jpg', category: 'Hogar > Cocina > Vajilla' },
  { id: 'bowl-sundara-redondo', title: 'Bowl Redondo Sundara 1000 ml', description: 'Bowl redondo 1000 ml. Forma orgánica generosa — perfecto para pastas, ensaladas y servicio en mesa.', price: 47999, image: 'FOTOS/mishka/bowl-sundara-redondo/1.jpg', category: 'Hogar > Cocina > Vajilla' },

  // VASOS Y COPAS (VASSA)
  { id: 'vasos-maja', title: 'Set x6 Vasos Maja 420 ml', description: 'Set de 6 vasos de vidrio 420 ml. Diseño clásico y versátil — para agua, jugos o cócteles.', price: 89999, image: 'FOTOS/mishka/vasos-maja/1.jpg', category: 'Hogar > Cocina > Vasos y Copas' },
  { id: 'vasos-maja-black', title: 'Set x6 Vasos Maja Black 420 ml', description: 'Set de 6 vasos de vidrio ahumado negro 420 ml. Diseño sofisticado que eleva cualquier mesa.', price: 75999, image: 'FOTOS/mishka/vasos-maja-black/1.jpg', category: 'Hogar > Cocina > Vasos y Copas' },
  { id: 'copas-fedra', title: 'Set x6 Copas Fedra 330 ml', description: 'Set de 6 copas de vidrio 330 ml. Diseño elegante y fino — para vinos blancos, rosados y espumantes.', price: 143999, image: 'FOTOS/mishka/copas-fedra/1.jpg', category: 'Hogar > Cocina > Vasos y Copas' },
  { id: 'copas-fedra-brown', title: 'Set x6 Copas Fedra Brown 320 ml', description: 'Set de 6 copas de vidrio ahumado marrón 320 ml. Diseño exclusivo con tono cálido y sofisticado.', price: 169999, image: 'FOTOS/mishka/copas-fedra-brown/1.jpg', category: 'Hogar > Cocina > Vasos y Copas' },
  { id: 'jarra-maja-black', title: 'Jarra Maja Black 1600 ml', description: 'Jarra de vidrio con funda tejida de rattan negro 1600 ml. Diseño artesanal único.', price: 66999, image: 'FOTOS/mishka/jarra-maja-black/1.jpg', category: 'Hogar > Cocina > Jarras' },

  // BOROSILICATO
  { id: 'mug-icon', title: 'Mug Borosilicato Cuadrado Icon 190 ml', description: 'Mug de borosilicato cuadrado 190 ml. Vidrio resistente al calor — para café, té y mate cocido.', price: 6999, image: 'FOTOS/mishka/mug-icon/1.jpg', category: 'Hogar > Cocina > Tazas y Mugs' },
  { id: 'mug-net', title: 'Mug Borosilicato Net 200 ml', description: 'Mug de borosilicato 200 ml con diseño net. Vidrio doble pared resistente al calor.', price: 10999, image: 'FOTOS/mishka/mug-net/1.jpg', category: 'Hogar > Cocina > Tazas y Mugs' },

  // MADERA / ACACIA
  { id: 'copetineros-acacia', title: 'Set Copetineros Acacia Manila', description: 'Set de copetineros de madera de acacia natural. Ideales para aperitivos, picadas y presentaciones.', price: 23999, image: 'FOTOS/mishka/copetineros-acacia/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'copetineros-porcelana', title: 'Set x4 Copetineros Porcelana + Base Bamboo 20x20 cm', description: 'Set de 4 copetineros de porcelana con base de bamboo negro 20x20 cm. Diseño premium.', price: 47999, image: 'FOTOS/mishka/copetineros-porcelana/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'cuenco-acacia', title: 'Cuenco Ovalado Acacia Manila 26x20x6,5 cm', description: 'Cuenco ovalado de madera de acacia 26x20x6,5 cm. Pieza natural para servir y decorar.', price: 47999, image: 'FOTOS/mishka/cuenco-acacia/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'bifera', title: 'Bifera Cuadrada Acacia 4x27 cm', description: 'Bifera cuadrada de acacia 4x27 cm. Para servir dips, salsas y aperitivos con estilo.', price: 94999, image: 'FOTOS/mishka/bifera/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'bandejas-hanoi', title: 'Set x2 Bandejas Redondas Hanoi 31/25 cm', description: 'Set de 2 bandejas redondas de acacia 31 y 25 cm. Diseño natural y versátil para mesa y cocina.', price: 50999, image: 'FOTOS/mishka/bandejas-hanoi/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'bandeja-family-farm', title: 'Bandeja Rectangular Family Farm 33,5x21 cm', description: 'Bandeja rectangular de madera 33,5x21 cm. Estilo rústico americano para servir y presentar.', price: 22999, image: 'FOTOS/mishka/bandeja-family-farm/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'fuente-family-farm', title: 'Fuente Family Farm 24x16,5x5 cm', description: 'Fuente de madera 24x16,5x5 cm. Diseño rústico y práctico para servir en cualquier ocasión.', price: 19999, image: 'FOTOS/mishka/fuente-family-farm/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'fuente-horno-acacia', title: 'Fuente para Horno con Base Acacia 23 cm', description: 'Fuente redonda para horno con base de madera de acacia 23 cm. Del horno directo a la mesa.', price: 54999, image: 'FOTOS/mishka/fuente-horno-acacia/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'cubiertos-acacia', title: 'Set Cuchara y Tenedor Acacia Manila Black 25,4 cm', description: 'Set de cuchara y tenedor de servicio en acacia negra 25,4 cm. Para ensaladas y fuentes.', price: 15499, image: 'FOTOS/mishka/cubiertos-acacia/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },
  { id: 'cesto-kendari', title: 'Cesto con Manijas Kendari 13x27 cm', description: 'Cesto con manijas tejido Kendari 13x27 cm. Pieza artesanal para organizar y decorar.', price: 61999, image: 'FOTOS/mishka/cesto-kendari/1.jpg', category: 'Hogar > Cocina > Madera y Acacia' },

  // JARRAS Y ENLOZADOS
  { id: 'jarra-bali', title: 'Jarra Recta Bali 1350 ml', description: 'Jarra recta 1350 ml. Diseño limpio y versátil — para agua, jugos y limonadas.', price: 47999, image: 'FOTOS/mishka/jarra-bali/1.jpg', category: 'Hogar > Cocina > Jarras' },
  { id: 'jarra-menak', title: 'Jarra Cónica Menak 1300 ml', description: 'Jarra cónica 1300 ml. Forma elegante con amplia capacidad — perfecta para cualquier mesa.', price: 52999, image: 'FOTOS/mishka/jarra-menak/1.jpg', category: 'Hogar > Cocina > Jarras' },
  { id: 'ensaladera-general-18', title: 'Ensaladera Enlozada General Store 18x7 cm', description: 'Ensaladera enlozada 18x7 cm. Diseño vintage rústico — ideal para guarniciones y ensaladas pequeñas.', price: 15999, image: 'FOTOS/mishka/ensaladera-general-18/1.jpg', category: 'Hogar > Cocina > Enlozados' },
  { id: 'ensaladera-general-22', title: 'Ensaladera Enlozada General Store 22x9 cm', description: 'Ensaladera enlozada 22x9 cm. Diseño vintage rústico — perfecta para ensaladas y guarniciones.', price: 23999, image: 'FOTOS/mishka/ensaladera-general-22/1.jpg', category: 'Hogar > Cocina > Enlozados' },
  { id: 'ensaladera-omari', title: 'Ensaladera Omari 3500 ml', description: 'Ensaladera 3500 ml. Gran capacidad para ensaladas familiares — diseño limpio y atemporal.', price: 57999, image: 'FOTOS/mishka/ensaladera-omari/1.jpg', category: 'Hogar > Cocina > Enlozados' }
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
