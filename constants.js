export const CONTACT_INFO = {
  email: 'cuencaabril7@gmail.com',
  gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=cuencaabril7@gmail.com',
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
    url: 'https://www.youtube.com/@abbilenerose',
    handle: '@abbilenerose',
  },
];

export const CATEGORIES = [
  { id: 'digital', label: 'Digital Art' },
  { id: 'tradicional', label: 'Tradicional Art' },
  { id: 'linea', label: 'Dibujo de línea' },
  { id: 'retratos', label: 'Retratos y figuras' },
  { id: 'personajes', label: 'Caracteres y props' },
  { id: '3dmaya', label: '3D Maya', coverImage: '/images/Cuarto.jpeg' },
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
    id: '3d-lampara',
    title: 'Lámpara',
    category: '3dmaya',
    imageUrl: '/images/Lampara.jpeg',
    gallery: [
      { id: '3d-lampara-1', imageUrl: '/images/Lampara.jpeg' },
      { id: '3d-lampara-2', imageUrl: '/images/Lampara2.jpeg' },
      { id: '3d-lampara-3', imageUrl: '/images/Lampara3.jpeg' },
    ],
  },
  {
    id: '3d-nino',
    title: 'Niño',
    category: '3dmaya',
    imageUrl: '/images/Niño.jpeg',
    gallery: [
      { id: '3d-nino-1', imageUrl: '/images/Niño.jpeg' },
      { id: '3d-nino-2', imageUrl: '/images/Niño2.jpeg' },
      { id: '3d-nino-3', imageUrl: '/images/Niño3.jpeg' },
    ],
  },
  {
    id: '3d-cuarto',
    title: 'Cuarto',
    category: '3dmaya',
    imageUrl: '/images/Cuarto.jpeg',
    gallery: [
      { id: '3d-cuarto-1', imageUrl: '/images/Cuarto.jpeg' },
      { id: '3d-cuarto-2', imageUrl: '/images/Cuarto2.jpeg' },
      { id: '3d-cuarto-3', imageUrl: '/images/Cuarto3.jpeg' },
      { id: '3d-cuarto-4', imageUrl: '/images/Cuarto4.jpeg' },
    ],
  },
  {
    id: '3d-sonic',
    title: 'Sonic',
    category: '3dmaya',
    imageUrl: '/images/Sonic.mp4',
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
