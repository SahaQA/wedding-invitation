// ============ Bengali numeral converter ============
function toBn(n) {
  return String(n).replace(/\d/g, function (d) {
    return '\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF'[+d];
  });
}

// ============ Countdown Timer ============
function tickCountdown() {
  var target = new Date('2026-05-03T20:30:00+05:30').getTime();
  var now = Date.now();
  var diff = Math.max(0, target - now);

  var d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  var h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  var m = Math.floor(diff / 60000);
  diff -= m * 60000;
  var s = Math.floor(diff / 1000);

  var map = { d: d, h: h, m: m, s: s };
  document.querySelectorAll('[data-u]').forEach(function (el) {
    var val = String(map[el.dataset.u]).padStart(2, '0');
    el.textContent = toBn(val);
  });
}

tickCountdown();
setInterval(tickCountdown, 1000);

// ============ Theme Switcher ============
var themeToggle = document.getElementById('themeToggle');
var themeNav = document.getElementById('themeNav');
var themeOptions = document.querySelectorAll('.theme-options button');

themeToggle.addEventListener('click', function () {
  themeNav.classList.toggle('open');
});

// Close theme nav when clicking outside
document.addEventListener('click', function (e) {
  if (!themeNav.contains(e.target)) {
    themeNav.classList.remove('open');
  }
});

themeOptions.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var dir = btn.dataset.dir;
    document.body.className = 'dir-' + dir;
    themeOptions.forEach(function (b) {
      b.classList.toggle('active', b.dataset.dir === dir);
    });
    themeNav.classList.remove('open');
  });
});

// ============ Music Player (placeholder) ============
var playBtn = document.getElementById('playBtn');
var playing = false;

if (playBtn) {
  playBtn.addEventListener('click', function () {
    playing = !playing;
    playBtn.textContent = playing ? '\u23F8' : '\u25B6';
  });
}

// ============ Add Wish ============
var addWishBtn = document.getElementById('addWish');

if (addWishBtn) {
  addWishBtn.addEventListener('click', function () {
    var msg = prompt('\u0986\u09AA\u09A8\u09BE\u09B0 \u09B6\u09C1\u09AD\u09C7\u09C1\u09CD\u099B\u09BE \u09B2\u09BF\u0996\u09C1\u09A8:');
    if (!msg) return;
    var name = prompt('\u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BE\u09AE:');
    if (!name) return;

    var el = document.createElement('div');
    el.className = 'postcard visible';
    el.style.setProperty('--r', (Math.random() * 4 - 2) + 'deg');

    var pEl = document.createElement('p');
    pEl.textContent = '\u201C' + msg + '\u201D';
    el.appendChild(pEl);

    var sigEl = document.createElement('div');
    sigEl.className = 'sig';
    sigEl.textContent = '\u2014 ' + name;
    el.appendChild(sigEl);

    addWishBtn.before(el);
  });
}

// ============ RSVP Form ============
var rsvpForm = document.getElementById('rsvpForm');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('\u09A7\u09A8\u09CD\u09AF\u09AC\u09BE\u09A6! \u0986\u09AA\u09A8\u09BE\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u0997\u09C3\u09B9\u09C0\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964');
    rsvpForm.reset();
  });
}

// ============ Scroll Reveal ============
var sections = document.querySelectorAll('.sec');

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

sections.forEach(function (sec) {
  // Hero is always visible
  if (sec.classList.contains('hero')) {
    sec.classList.add('visible');
  } else {
    observer.observe(sec);
  }
});
