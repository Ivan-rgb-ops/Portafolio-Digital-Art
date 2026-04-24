const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function buildTransformations({ width, height, fit = 'limit', quality = 'auto', format = 'auto' } = {}) {
  const transforms = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${fit}`);

  return transforms.join(',');
}

export function getImageUrl(src, options = {}) {
  if (!src) return src;

  if (src.startsWith('cld:') && cloudName) {
    const publicId = src.slice(4);
    return `https://res.cloudinary.com/${cloudName}/image/upload/${buildTransformations(options)}/${publicId}`;
  }

  return src;
}
