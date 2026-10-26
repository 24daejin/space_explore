(function () {
  var LINKS = window.GUIDE_LINKS || {};
  var ORDER = ['guide', 'login', 'l1', 'l2', 'l3', 'l4'];
  var STORE_KEY = 'space-guide-stage';

  // 링크 채우기: 주소가 비어 있으면 버튼을 숨긴다.
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var url = LINKS[a.getAttribute('data-link')];
    if (!url) { a.hidden = true; return; }
    var from = a.getAttribute('data-from');
    if (from) url += (url.indexOf('?') === -1 ? '?' : '&') + 'from=' + encodeURIComponent(from);
    a.href = url;
  });
  // 버튼이 모두 숨겨진 줄은 줄째로 숨긴다.
  document.querySelectorAll('.link-row, .ai-strip').forEach(function (row) {
    var links = row.querySelectorAll('[data-link]');
    if (links.length && Array.prototype.every.call(links, function (a) { return a.hidden; })) row.hidden = true;
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.stage'));
  var fill = document.querySelector('.track-fill');

  function show(id, focus) {
    if (ORDER.indexOf(id) === -1) id = 'guide';
    var idx = ORDER.indexOf(id);
    tabs.forEach(function (t, i) {
      var on = t.getAttribute('data-stage') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('done', i < idx);
      if (on && focus) t.focus();
    });
    ORDER.forEach(function (p) {
      var el = document.getElementById('panel-' + p);
      if (el) el.hidden = p !== id;
    });
    if (fill) fill.style.width = (idx / (ORDER.length - 1) * 100) + '%';
    try { localStorage.setItem(STORE_KEY, id); } catch (e) {}
    try { if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      show(t.getAttribute('data-stage'));
      var track = document.querySelector('.track');
      var top = track.getBoundingClientRect().top;
      if (top < 0 || window.scrollY > track.offsetTop) {
        window.scrollTo({ top: track.offsetTop, behavior: 'smooth' });
      }
    });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); show(tabs[n].getAttribute('data-stage'), true); }
    });
  });

  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  var start = location.hash.slice(1);
  if (ORDER.indexOf(start) === -1) {
    try { start = localStorage.getItem(STORE_KEY) || 'guide'; } catch (e) { start = 'guide'; }
  }
  show(start);
})();
