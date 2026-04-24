export const CONTACT_INFO = {
  email: 'contact@abrilcuenca.com',
};

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/itsabilene.art',
    handle: '@itsabilene.art',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abril-cuenca/',
    handle: 'Abril Cuenca',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@tu_canal',
    handle: 'Abril Process',
  },
];

export const CATEGORIES = [
  { id: 'digital', label: 'Digital Art' },
  { id: 'tradicional', label: 'Tradicional Art' },
  { id: 'linea', label: 'Dibujo de línea' },
  { id: 'retratos', label: 'Retratos y figuras' },
  { id: 'personajes', label: 'Caracteres y props' },
  { id: '3dmaya', label: '3D Maya' },
];

export const ARTWORK = [
  {
    id: 'gallery-estress',
    title: 'Estrés',
    category: 'digital',
    imageUrl: '/images/Estress.jpeg',
    gallery: [
      { id: 'estress-01', imageUrl: '/images/Estress.jpeg' },
      { id: 'estress-02', imageUrl: '/images/EstresProceso.jpeg' },
    ],
  },
  {
    id: 'digital-03',
    title: 'Hombre tirado',
    category: 'digital',
    imageUrl: '/images/HombreTirado.jpeg',
  },
  {
    id: 'gallery-spiderman',
    title: 'SpiderMan',
    category: 'digital',
    imageUrl: '/images/SpiderMan.jpeg',
    gallery: [
      { id: 'spiderman-01', imageUrl: '/images/SpiderMan.jpeg' },
      { id: 'spiderman-02', imageUrl: '/images/SpidermanProceso.jpeg' },
    ],
  },
  {
    id: 'trad-01',
    title: 'Óleo sobre lienzo',
    category: 'tradicional',
    imageUrl: 'https://picsum.photos/seed/trad1/1920/2880',
  },
  {
    id: 'linea-01',
    title: 'Estudio de trazo',
    category: 'linea',
    imageUrl: 'https://picsum.photos/seed/linea1/1920/2160',
  },
  {
    id: 'retr-01',
    title: 'Estudio de anatomía',
    category: 'retratos',
    imageUrl: 'https://picsum.photos/seed/retr1/1920/2640',
  },
  {
    id: 'char-01',
    title: 'Diseño de personaje principal',
    category: 'personajes',
    imageUrl: 'https://picsum.photos/seed/char1/1920/2400',
  },
  {
    id: '3d-01',
    title: 'Modelado de escenario',
    category: '3dmaya',
    imageUrl: 'https://picsum.photos/seed/3d1/1920/1920',
  },
];

export const STORE_ITEMS = [
  {
    id: 's1',
    name: 'Original: Sunset Canvas',
    price: 450.0,
    imageUrl: 'https://picsum.photos/seed/store1/1200/1200',
    category: 'original',
  },
  {
    id: 's2',
    name: 'Print: Character Anthology',
    price: 25.0,
    imageUrl: 'https://picsum.photos/seed/store2/1200/1200',
    category: 'print',
  },
];
