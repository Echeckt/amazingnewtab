const preview = document.querySelector('#hero-preview');
const dots = document.querySelectorAll('.preview-dot');

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    if (!preview || dot.classList.contains('is-active')) return;

    preview.classList.add('is-changing');
    dots.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-pressed', 'false');
    });
    dot.classList.add('is-active');
    dot.setAttribute('aria-pressed', 'true');

    window.setTimeout(() => {
      preview.src = dot.dataset.preview;
      preview.alt = dot.dataset.alt;
      preview.classList.remove('is-changing');
    }, 120);
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
