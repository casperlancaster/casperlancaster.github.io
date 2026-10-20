(() => {
  const dialog = document.querySelector('#shot-dialog');
  const buttons = Array.from(document.querySelectorAll('.shot-open'));
  const image = document.querySelector('#dialog-image');
  const heading = document.querySelector('#dialog-title');
  const description = document.querySelector('#dialog-description');
  const counter = document.querySelector('#dialog-counter');
  const close = document.querySelector('.dialog-close');
  const prev = document.querySelector('.dialog-prev');
  const next = document.querySelector('.dialog-next');
  if (!dialog || !image || !heading || !description || !buttons.length || !dialog.showModal) return;
  let currentIndex = 0;
  let returnFocus = null;

  const show = index => {
    currentIndex = (index + buttons.length) % buttons.length;
    const btn = buttons[currentIndex];
    const thumb = btn.querySelector('img');
    const info = btn.closest('.shot-card');
    const title = info.querySelector('h3').textContent;
    const desc = info.querySelector('.shot-info p').textContent;
    image.src = thumb.getAttribute('src');
    image.alt = thumb.getAttribute('alt');
    heading.textContent = title;
    description.textContent = desc;
    counter.textContent = `${currentIndex + 1} / ${buttons.length}`;
  };
  buttons.forEach((button,index) => button.addEventListener('click', () => {
    returnFocus = button;
    show(index);
    if (!dialog.open) dialog.showModal();
    close.focus();
  }));
  prev.addEventListener('click', () => show(currentIndex - 1));
  next.addEventListener('click', () => show(currentIndex + 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(currentIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(currentIndex + 1); }
  });
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); if (returnFocus) returnFocus.focus(); });
})();
