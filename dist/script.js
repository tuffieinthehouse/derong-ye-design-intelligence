const progress = document.querySelector('.progress span');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}

addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const pages = document.getElementById(button.dataset.open);
    const isOpening = pages.hidden;
    pages.hidden = !isOpening;
    button.setAttribute('aria-expanded', String(isOpening));
    button.querySelector('span').textContent = isOpening ? 'Close case study ×' : `Explore case study · ${pages.querySelectorAll('img').length + 1} pages`;
    if (isOpening) pages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

document.querySelectorAll('.page-grid img').forEach((image) => {
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
