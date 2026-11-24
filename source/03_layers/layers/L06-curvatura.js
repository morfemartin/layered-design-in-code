function renderGlassWarp(map, width, height, curve = 13) {
  const scale = Number(map.nextElementSibling.getAttribute('scale'));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  const pixels = context.createImageData(width, height);

  // Match the inward taper of the rim’s cubic Bézier edges.
  for (let x = 0; x < width; x++) {
    const edgePosition = Math.min(1, Math.max(0, (x - 24) / (width - 48)));
    const inward = 3 * curve * edgePosition * (1 - edgePosition);
    for (let y = 0; y < height; y++) {
      // Displacement maps look up the source pixel for each destination pixel.
      const sourceY = (y - inward) * height / (height - 2 * inward);
      const index = (y * width + x) * 4;
      pixels.data[index] = 128;
      pixels.data[index + 1] = Math.round(255 * (0.5 + (sourceY - y) / scale));
      pixels.data[index + 3] = 255;
    }
  }

  context.putImageData(pixels, 0, 0);
  map.setAttribute('href', canvas.toDataURL());
}

{
  const poloMap = document.querySelector('#pdp-glass-map');
  renderGlassWarp(poloMap, Number(poloMap.getAttribute('width')), Number(poloMap.getAttribute('height')));

  const card = document.querySelector('.sales-card');
  if (card && card.offsetHeight) {
    const rim = card.querySelector('.sales-rim');
    const outline = rim.querySelector('#sales-glass-outline');
    const map = rim.querySelector('#sales-glass-map');
    const filter = map.parentElement;
    const curve = 13 * .8;

    const drawGlass = () => {
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      if (!height) return;

      const firstControl = Math.round(width * .323);
      const secondControl = width - firstControl;
      rim.setAttribute('viewBox', `0 0 ${width} ${height}`);
      outline.setAttribute('d', [
        `M24 2C${firstControl} ${2 + curve} ${secondControl} ${2 + curve} ${width - 24} 2`,
        `Q${width - 2} 0 ${width - 2} 24V${height - 24}`,
        `Q${width - 2} ${height} ${width - 24} ${height - 2}`,
        `C${secondControl} ${height - 2 - curve} ${firstControl} ${height - 2 - curve} 24 ${height - 2}`,
        `Q2 ${height} 2 ${height - 24}V24Q2 0 24 2Z`,
      ].join(' '));
      for (const node of [filter, map]) {
        node.setAttribute('width', width);
        node.setAttribute('height', height);
      }
      renderGlassWarp(map, width, height, curve);
    };

    new ResizeObserver(drawGlass).observe(card);
    drawGlass();
  }
}
