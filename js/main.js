(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
  }
  // Follow a single section at a time. The previous scroll observer could
  // activate the wrong link when two cards occupied the same screen row.
  const sectionLinks = links
    .map(link => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#') || href.length < 2) return null;
      const section = document.getElementById(href.slice(1));
      return section ? { link, section, id: section.id } : null;
    })
    .filter(Boolean);

  if (sectionLinks.length) {
    let scheduled = false;
    const updateActive = () => {
      scheduled = false;
      const ordered = sectionLinks.slice().sort((a, b) =>
        a.section.getBoundingClientRect().top - b.section.getBoundingClientRect().top
      );
      const threshold = Math.min(165, window.innerHeight * 0.3);
      let selected = ordered[0];
      for (const item of ordered) {
        if (item.section.getBoundingClientRect().top <= threshold) selected = item;
      }
      for (const item of sectionLinks) {
        const isCurrent = item.id === selected.id;
        item.link.classList.toggle('active', isCurrent);
        if (isCurrent) item.link.setAttribute('aria-current', 'location');
        else item.link.removeAttribute('aria-current');
      }
    };
    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(updateActive);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    scheduleUpdate();
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
