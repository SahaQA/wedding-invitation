// ============ Bengali numeral converter ============
function toBn(n) {
  return String(n).replace(/\d/g, function (d) {
    return '\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF'[+d];
  });
}

// ============ Countdown Timer ============
var countdownEl = document.getElementById('countdown');
var countdownTargetISO = (countdownEl && countdownEl.dataset.target) || '2026-05-03T20:30:00+06:00';
var countdownTarget = new Date(countdownTargetISO).getTime();

function tickCountdown() {
  var target = countdownTarget;
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

// ============ Music Player ============
var playBtn = document.getElementById('playBtn');
var bgMusic = document.getElementById('bgMusic');

if (playBtn && bgMusic) {
  playBtn.addEventListener('click', function () {
    if (bgMusic.paused) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  });

  bgMusic.addEventListener('play', function () {
    playBtn.textContent = '\u23F8';
  });

  bgMusic.addEventListener('pause', function () {
    playBtn.textContent = '\u25B6';
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
