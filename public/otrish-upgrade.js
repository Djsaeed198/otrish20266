/* ===================================================
   Otrish-Neshin — Complete Global Interactive Systems
   =================================================== */

(function() {
  "use strict";
  var w = window, d = document, $ = function(s, r) { return (r || d).querySelector(s); };

  /* ====== 1) Global Toast System ====== */
  function toast(msg, opts) {
    opts = opts || {};
    var cur = d.getElementById('upg-toast');
    if (cur) { cur.remove(); }
    var el = d.createElement('div');
    el.id = 'upg-toast';
    el.className = 'upg-toast' + (opts.type ? ' upg-toast-' + opts.type : '');
    el.innerHTML = '<span class="ic">' + (opts.icon || '✨') + '</span><span>' + msg + '</span>';
    d.body.appendChild(el);
    requestAnimationFrame(function() { el.classList.add('show'); });
    setTimeout(function() {
      el.classList.remove('show');
      setTimeout(function() { el.remove(); }, 350);
    }, opts.ms || 3200);
  }
  w.upgToast = toast;
  
  if (typeof w.showToast !== 'function') {
    w.showToast = function(msg) { toast(msg); };
  }

  /* ====== 2) Copy Protection System ====== */
  function initCopyGuard() {
    var toastEl = null, toastTimer = null;
    function showGuardToast(msg) {
      if (!toastEl) {
        toastEl = d.createElement('div');
        toastEl.className = 'copy-guard-toast';
        d.body.appendChild(toastEl);
      }
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function() { toastEl.classList.remove('show'); }, 1800);
    }
    function isEditable(el) {
      if (!el) return false;
      var tag = (el.tagName || '').toLowerCase();
      return tag === 'input' || tag === 'textarea' || el.isContentEditable;
    }
    d.addEventListener('contextmenu', function(e) {
      if (isEditable(e.target)) return;
      e.preventDefault();
      showGuardToast('کپی‌برداری از این سایت غیرفعال است 🛡️');
    });
    ['copy', 'cut'].forEach(function(evt) {
      d.addEventListener(evt, function(e) {
        if (isEditable(e.target)) return;
        e.preventDefault();
        showGuardToast('کپی‌کردن محتوا مجاز نیست 🔒');
      });
    });
    d.addEventListener('selectstart', function(e) {
      if (isEditable(e.target)) return;
      e.preventDefault();
    });
    d.addEventListener('keydown', function(e) {
      var k = (e.key || '').toLowerCase();
      var blocked = k === 'f12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||
        ((e.ctrlKey || e.metaKey) && (k === 'u' || k === 's'));
      if (blocked) {
        e.preventDefault();
        showGuardToast('این عملکرد غیرفعال است 🚫');
      }
    });
  }

  /* ====== 3) Micro-interactions & Shimmer ====== */
  function upg2Confetti(host, count) {
    count = count || 28;
    if (!host) {
      host = d.createElement('div');
      host.className = 'upg2-confetti';
      d.body.appendChild(host);
    }
    var colors = ['#C8102E', '#B8862E', '#0E7C5A', '#2657CC', '#6D4AAF', '#C23768'];
    for (var i = 0; i < count; i++) {
      var p = d.createElement('i');
      var x = Math.random() * 100;
      p.style.left = x + '%';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--fx', (Math.random() * 100 - 50) + 'px');
      p.style.animationDelay = (Math.random() * 0.4) + 's';
      p.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      host.appendChild(p);
    }
    setTimeout(function() { if (host.parentNode) host.parentNode.removeChild(host); }, 2400);
  }
  w.upg2Confetti = upg2Confetti;

  function initMicro() {
    d.addEventListener('click', function(e) {
      var t = e.target;
      var lik = t.closest && t.closest('[data-upg-like], .like-btn, .fav, [aria-label*="پسندید"]');
      if (lik) {
        var r = lik.getBoundingClientRect();
        var b = d.createElement('span');
        b.className = 'upg-heart-burst'; b.textContent = '❤️';
        b.style.left = (r.left + r.width / 2 - 12) + 'px';
        b.style.top = (r.top + r.height / 2 - 12) + 'px';
        b.style.position = 'fixed'; b.style.zIndex = '100000';
        d.body.appendChild(b);
        setTimeout(function() { b.remove(); }, 1000);
      }
    }, true);
  }

  /* ====== 4) Command Palette ====== */
  var CMDS = [
    {id:'home', lbl:'صفحه اصلی', ic:'🏠', go:function(){ if(w.switchTab) w.switchTab('home'); }},
    {id:'chance', lbl:'شانس مهاجرت', ic:'🎯', go:function(){ if(w.switchTab) w.switchTab('chance'); }},
    {id:'tracker', lbl:'اقامت و چک‌لیست', ic:'📋', go:function(){ if(w.switchTab) w.switchTab('tracker'); }},
    {id:'finance', lbl:'امور مالی و بودجه', ic:'💰', go:function(){ if(w.switchTab) w.switchTab('finance'); }},
    {id:'german', lbl:'یادگیری زبان آلمانی', ic:'📖', go:function(){ if(w.switchTab) w.switchTab('german'); }},
    {id:'jobs', lbl:'مشاغل و خدمات', ic:'💼', go:function(){ if(w.switchTab) w.switchTab('jobs'); }},
    {id:'compare', lbl:'مرکز مقایسه', ic:'⚖️', go:function(){ if(w.switchTab) w.switchTab('compare'); }}
  ];
  function openCmd() {
    var host = d.getElementById('upg-cmd-overlay');
    if (!host) {
      host = d.createElement('div');
      host.id = 'upg-cmd-overlay'; host.className = 'upg-cmd-overlay';
      host.innerHTML = '<div class="upg-cmd" role="dialog" aria-label="Command Palette">'
        + '<div class="upg-cmd-search"><span class="kbd">Ctrl+K</span><input id="upg-cmd-q" placeholder="جستجو یا دستور فعال‌سازی …" autocomplete="off"/></div>'
        + '<div class="upg-cmd-list" id="upg-cmd-list"></div></div>';
      d.body.appendChild(host);
      host.addEventListener('click', function(e) { if (e.target === host) closeCmd(); });
      var inp = d.getElementById('upg-cmd-q');
      inp.addEventListener('input', function() { renderCmdList(inp.value); });
    }
    host.classList.add('show');
    d.getElementById('upg-cmd-q').focus();
    renderCmdList('');
  }
  function closeCmd() {
    var h = d.getElementById('upg-cmd-overlay');
    if (h) h.classList.remove('show');
  }
  function renderCmdList(q) {
    q = (q || '').toLowerCase();
    var items = CMDS.filter(function(c) { return c.lbl.toLowerCase().indexOf(q) >= 0; });
    var list = d.getElementById('upg-cmd-list');
    list.innerHTML = items.length ? items.map(function(c, i) {
      return '<div class="upg-cmd-item" data-i="' + i + '"><span style="font-size:18px">' + c.ic + '</span><span class="lbl">' + c.lbl + '</span><span class="hint">Enter</span></div>';
    }).join('') : '<div class="upg-cmd-item" style="opacity:.5;cursor:default">موردی یافت نشد</div>';
    list.querySelectorAll('.upg-cmd-item').forEach(function(el) {
      el.onclick = function() {
        var idx = parseInt(el.getAttribute('data-i'), 10);
        if (items[idx]) items[idx].go();
        closeCmd();
      };
    });
  }

  /* ====== 5) Gamification & Lucky Wheel ====== */
  var STREAK_KEY = 'otrishneshin_upg_streak';
  function getStreak() {
    try { return JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"last":0}'); } catch (e) { return {count:0, last:0}; }
  }
  function bumpStreak() {
    var s = getStreak();
    var now = new Date(); now.setHours(0,0,0,0);
    var last = new Date(s.last || 0); last.setHours(0,0,0,0);
    var diff = Math.round((now - last) / 86400000);
    if (diff === 1) { s.count = (s.count || 0) + 1; }
    else if (diff > 1) { s.count = 1; }
    s.last = now.getTime();
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
    paintStreak();
  }
  function paintStreak() {
    var b = d.getElementById('upg2-streak'); if (!b) return;
    var s = getStreak();
    var num = b.querySelector('.num');
    if (num) num.textContent = (s.count || 1).toLocaleString('fa-IR');
  }
  function openWheel() {
    var m = d.getElementById('upg2-wheel-modal');
    if (!m) {
      m = d.createElement('div'); m.id = 'upg2-wheel-modal'; m.className = 'upg2-reward-wheel';
      m.innerHTML = '<div class="upg2-wheel-box">'
        + '<h3>🎉 گردون شانس روزانه</h3>'
        + '<div class="upg2-wheel" id="upg2-wheel"><span class="upg2-wheel-pointer">▼</span></div>'
        + '<div class="upg2-wheel-result" id="upg2-wheel-result">برای چرخاندن و شانس برنده شدن کلیک کنید</div>'
        + '<button class="btn btn-red" id="upg2-spin">چرخاندن شانس 🎰</button>'
        + '<button class="btn" style="background:transparent;color:var(--red);box-shadow:none;margin-top:10px" onclick="this.closest(\'.upg2-reward-wheel\').classList.remove(\'show\')">بستن</button>'
        + '</div>';
      d.body.appendChild(m);
      var wheel = d.getElementById('upg2-wheel');
      var res = d.getElementById('upg2-wheel-result');
      var prizes = ['+5 XP', 'امتیاز ویژه', 'بیمه ÖGK رایگان', '+10 XP', 'تایید مدرک', '+15 XP', 'مسکن ارزان', 'موفقیت'];
      d.getElementById('upg2-spin').onclick = function(e) {
        e.preventDefault();
        var deg = 360 * 5 + Math.floor(Math.random() * 360);
        wheel.style.transform = 'rotate(' + deg + 'deg)';
        res.textContent = 'در حال چرخش...';
        setTimeout(function() {
          var idx = Math.floor(((deg % 360) / 45)) % prizes.length;
          var p = prizes[idx];
          res.textContent = 'جایزه شما: ' + p + ' 🎉';
          upg2Confetti();
        }, 4200);
      };
    }
    m.classList.add('show');
  }

  /* ====== 6) Interactive Onboarding ====== */
  var ONB_KEY = 'otrish_onboard_upg_v2';
  var ONB_STEPS = [
    {icon:'🇦🇹', h:'به اتریش‌نشین خوش آمدید!', sub:'پورتال هوشمند و دایرکتوری جامع فارسی‌زبانان مقیم اتریش.'},
    {icon:'🧮', h:'محاسبه‌گرهای کارآمد فدرال', sub:'با ابزار Brutto-Netto حقوق خالص خود را بر حسب قوانین مالیاتی سال جاری بسنجید.'},
    {icon:'🏆', h:'گام‌به‌گام تا استقرار نهایی', sub:'از چک‌لیست ۱۰۰ روز اول استفاده کنید و امتیازات را ذخیره نمایید.'}
  ];
  function showOnboarding() {
    if (localStorage.getItem(ONB_KEY) === '1') return;
    var ov = d.createElement('div'); ov.className = 'upg-onboard show';
    var idx = 0;
    function paint() {
      var s = ONB_STEPS[idx];
      var pct = Math.round((idx + 1) / ONB_STEPS.length * 100);
      ov.innerHTML = '<div class="upg-onb-card">'
        + '<div class="prog"><span style="width:' + pct + '%"></span></div>'
        + '<span class="icon">' + s.icon + '</span>'
        + '<h3>' + s.h + '</h3>'
        + '<div class="step-sub">' + s.sub + '</div>'
        + '<div class="step-ctr">' + ONB_STEPS.map(function(_, k) { return '<span class="dot' + (k === idx ? ' active' : '') + '"></span>'; }).join('') + '</div>'
        + '<div class="actions">'
        + '<button class="btn-skip" id="upg-onb-skip">رد کردن</button>'
        + '<button class="btn-next" id="upg-onb-next">' + (idx === ONB_STEPS.length - 1 ? 'بزن بریم! ✓' : 'بعدی ➔') + '</button>'
        + '</div></div>';
    }
    paint();
    d.body.appendChild(ov);
    ov.addEventListener('click', function(e) {
      if (e.target && e.target.id === 'upg-onb-next') {
        if (idx < ONB_STEPS.length - 1) { idx++; paint(); }
        else {
          localStorage.setItem(ONB_KEY, '1');
          ov.classList.remove('show');
          setTimeout(function() { ov.remove(); }, 300);
        }
      } else if (e.target && e.target.id === 'upg-onb-skip') {
        localStorage.setItem(ONB_KEY, '1');
        ov.classList.remove('show');
        setTimeout(function() { ov.remove(); }, 300);
      }
    });
  }

  /* ====== Boot Everything ====== */
  function boot() {
    initCopyGuard();
    initMicro();
    bumpStreak();
    setTimeout(showOnboarding, 1400);

    /* Watch key events */
    d.addEventListener('keydown', function(e) {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openCmd();
      }
    });

    /* Auto floating streak */
    var b = d.createElement('button'); b.id = 'upg2-streak'; b.className = 'upg2-daily-streak show';
    b.innerHTML = '<span class="flame">🔥</span><span><span class="num">1</span> روز پیاپی</span>';
    b.onclick = openWheel;
    d.body.appendChild(b);
    paintStreak();
  }

  if (d.readyState === 'loading') { d.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();
