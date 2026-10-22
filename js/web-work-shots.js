/* Phase 3: Use REAL public-site screenshots when their local image files exist.
   Missing screenshots leave the explicitly illustrative Phase 2 art visible.
   No private/admin screenshots or third-party screenshot services are used. */
(() => {
  const visuals = document.querySelectorAll('.case-visual[data-screenshot]');
  visuals.forEach(visual => {
    const src = visual.dataset.screenshot;
    const alt = visual.dataset.screenshotAlt || 'Public website screenshot';
    if (!src) return;

    const shot = new Image();
    shot.className = 'case-screenshot-img';
    shot.alt = alt;
    shot.loading = 'lazy';
    shot.decoding = 'async';
    shot.addEventListener('load', () => {
      if (!shot.naturalWidth) return;
      visual.appendChild(shot);
      visual.classList.add('has-screenshot');
      const note = document.createElement('span');
      note.className = 'actual-shot-label';
      note.textContent = 'REAL SITE SCREENSHOT';
      visual.appendChild(note);
    }, { once: true });
    // If no screenshot is supplied yet, leave the illustrative art in place.
    shot.addEventListener('error', () => {}, { once: true });
    shot.src = src;
  });
})();
