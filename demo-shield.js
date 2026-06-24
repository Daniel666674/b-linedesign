/* DEMO SHIELD — Pitch protection layer */
(function () {
  'use strict';

  var BRAND = 'B-Line Design';

  /* watermark overlay */
  var overlay = document.createElement('div');
  overlay.id = 'demo-overlay';
  document.body.appendChild(overlay);

  /* repeating watermark text via canvas → CSS background */
  var canvas = document.createElement('canvas');
  canvas.width = 420;
  canvas.height = 260;
  var ctx = canvas.getContext('2d');
  ctx.translate(210, 130);
  ctx.rotate(-30 * Math.PI / 180);
  ctx.font = '600 22px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(26,155,142,0.11)';
  ctx.textAlign = 'center';
  ctx.fillText('MOCKUP — ' + BRAND, 0, -10);
  ctx.font = '500 13px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(26,155,142,0.08)';
  ctx.fillText('Prohibida la reproducción', 0, 14);
  overlay.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';

  /* floating demo banner */
  var banner = document.createElement('div');
  banner.id = 'demo-banner';
  banner.innerHTML = 'VISTA PREVIA — Diseñado por <b>' + BRAND + '</b>';
  document.body.appendChild(banner);

  /* disable right-click */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  /* disable text selection on body */
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';

  /* disable drag on images */
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  /* block common dev-tool shortcuts */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) e.preventDefault();
  });
})();
