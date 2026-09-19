/* Amazing New Tab - interactions de la page publique */
(function () {
  'use strict';

  /* ---- année du pied de page (présente sur toutes les pages) ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- horloge de la carte "L'heure, en grand" ---- */
  var timeEl = document.getElementById('ui-time');
  var dateEl = document.getElementById('ui-date');

  if (timeEl && dateEl) {
    var tick = function () {
      var now = new Date();
      timeEl.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      var d = now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      dateEl.textContent = d.charAt(0).toUpperCase() + d.slice(1);
    };
    tick();
    setInterval(tick, 20000);
  }

  /* ---- sélecteur d'univers du héros ---- */
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.uni'));
  var layerA = document.getElementById('stage-a');
  var layerB = document.getElementById('stage-b');

  if (!buttons.length || !layerA || !layerB) return;

  var SIZES = '(max-width: 760px) 100vw, 1160px';

  function srcsetFor(key) {
    return '/assets/' + key + '-760.webp 760w, /assets/' + key + '.webp 1161w';
  }

  function srcFor(key) {
    return '/assets/' + key + '.webp';
  }

  /* précharge les univers non affichés pour que le changement soit instantané */
  function warmUp() {
    buttons.forEach(function (b) {
      if (b.classList.contains('is-active')) return;
      var img = new Image();
      img.sizes = SIZES;
      img.srcset = srcsetFor(b.dataset.key);
      img.src = srcFor(b.dataset.key);
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(warmUp, { timeout: 2500 });
  } else {
    setTimeout(warmUp, 1200);
  }

  var busy = false;

  function show(button) {
    if (busy || button.classList.contains('is-active')) return;

    var key = button.dataset.key;
    var visible = layerA.classList.contains('is-on') ? layerA : layerB;
    var hidden = visible === layerA ? layerB : layerA;

    busy = true;

    buttons.forEach(function (b) {
      var on = b === button;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var done = false;

    var reveal = function () {
      if (done) return;
      done = true;

      /* srcset ET src : sans cela le srcset d'origine resterait prioritaire */
      hidden.sizes = SIZES;
      hidden.srcset = srcsetFor(key);
      hidden.src = srcFor(key);
      hidden.alt = button.dataset.alt || '';
      hidden.removeAttribute('aria-hidden');

      visible.alt = '';
      visible.setAttribute('aria-hidden', 'true');

      hidden.classList.add('is-on');
      visible.classList.remove('is-on');
      busy = false;
    };

    var fail = function () {
      if (done) return;
      done = true;
      busy = false;
    };

    var loader = new Image();
    loader.onload = reveal;
    loader.onerror = fail;
    loader.sizes = SIZES;
    loader.srcset = srcsetFor(key);
    loader.src = srcFor(key);

    /* image déjà en cache : l'événement load a pu passer avant l'abonnement */
    if (loader.complete) reveal();
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () { show(button); });
  });
})();
