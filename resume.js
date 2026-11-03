/* ==========================================================================
   Zhuohang Jiang — research resume
   Shared behaviour for index.html and index_beauty.html.
   Progressive enhancement only: every fact, link and download works without
   JavaScript. Storage failures never disable the page.
   ========================================================================== */

(function () {
  'use strict';

  var LANG_KEY = 'language';
  var THEME_KEY = 'theme';
  var AUTO_KEY = 'themeAutoMode';
  var DOC_LANG = { en: 'en', zh: 'zh-CN' };

  /* ------------------------------------------------------------- storage */
  function readValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null; /* private mode / disabled storage — keep the page alive */
    }
  }

  function writeValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* ignore: preferences simply do not persist */
    }
  }

  /* -------------------------------------------------------------- language */
  function currentLanguage() {
    var stored = readValue(LANG_KEY);
    return stored === 'zh' ? 'zh' : 'en';
  }

  function applyLanguage(lang, persist) {
    if (lang !== 'zh' && lang !== 'en') { lang = 'en'; }

    var nodes = document.querySelectorAll('.lang-content');
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var matches = node.classList.contains('lang-' + lang);
      if (matches) {
        node.classList.remove('hidden');
      } else {
        node.classList.add('hidden');
      }
    }

    document.documentElement.setAttribute('lang', DOC_LANG[lang]);

    var buttons = document.querySelectorAll('[data-lang]');
    for (var b = 0; b < buttons.length; b += 1) {
      var active = buttons[b].getAttribute('data-lang') === lang;
      buttons[b].setAttribute('aria-pressed', active ? 'true' : 'false');
      buttons[b].classList.toggle('is-active', active);
    }

    if (persist) { writeValue(LANG_KEY, lang); }
  }

  function switchLanguage(lang) {
    applyLanguage(lang === 'zh' ? 'zh' : 'en', true);
  }

  /* ----------------------------------------------------------------- theme */
  function resolveTheme() {
    var stored = readValue(THEME_KEY);
    if (stored === 'dark' || stored === 'light') { return stored; }
    if (readValue(AUTO_KEY) === 'true') {
      var hour = new Date().getHours();
      return (hour < 6 || hour >= 18) ? 'dark' : 'light';
    }
    return 'light';
  }

  function applyTheme(theme, persist) {
    if (theme !== 'dark' && theme !== 'light') { theme = 'light'; }

    document.documentElement.setAttribute('data-theme', theme);
    /* legacy hook kept so older shared styles keep working */
    document.body.classList.toggle('dark-mode', theme === 'dark');

    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      var next = theme === 'dark' ? 'light' : 'dark';
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', next === 'dark'
        ? 'Switch to dark theme'
        : 'Switch to light theme');
      toggle.textContent = next === 'dark' ? 'Dark' : 'Light';
    }

    if (persist) {
      writeValue(THEME_KEY, theme);
      writeValue(AUTO_KEY, 'false');
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  }

  /* -------------------------------------------------------------- clipboard */
  function legacyCopy(value) {
    var field = document.createElement('textarea');
    try {
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.top = '-1000px';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      field.setSelectionRange(0, value.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(field);
      return !!ok;
    } catch (error) {
      if (field.parentNode) { field.parentNode.removeChild(field); }
      return false;
    }
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).then(
        function () { return true; },
        function () { return legacyCopy(value); }
      );
    }
    return Promise.resolve(legacyCopy(value));
  }

  var toast = null;
  var toastTimer = null;

  function ensureToast() {
    if (toast) { return toast; }
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(message) {
    var node = ensureToast();
    node.textContent = message;
    node.classList.add('is-visible');
    if (toastTimer) { window.clearTimeout(toastTimer); }
    toastTimer = window.setTimeout(function () {
      node.classList.remove('is-visible');
    }, 3200);
  }

  function isChinese() {
    return document.documentElement.getAttribute('lang') === 'zh-CN';
  }

  function setupCopyButtons() {
    var buttons = document.querySelectorAll('[data-copy-value]');
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', function (event) {
        event.preventDefault();
        var trigger = event.currentTarget;
        var value = trigger.getAttribute('data-copy-value') || '';
        var kind = trigger.getAttribute('data-copy-kind') || 'email';
        var zh = isChinese();

        copyText(value).then(function (ok) {
          if (ok) {
            var label = kind === 'wechat'
              ? (zh ? '微信号' : 'WeChat ID')
              : (zh ? '邮箱' : 'Email');
            showToast(zh ? '已复制' + label + '：' + value : 'Copied ' + label + ': ' + value);
          } else {
            showToast(zh
              ? '复制失败，请手动复制：' + value
              : 'Copy failed — please copy manually: ' + value);
          }
        }).catch(function () {
          showToast(zh
            ? '复制失败，请手动复制：' + value
            : 'Copy failed — please copy manually: ' + value);
        });
      });
    }
  }

  /* ------------------------------------------------------------------ init */
  function init() {
    applyLanguage(currentLanguage(), false);
    applyTheme(resolveTheme(), false);

    var languageButtons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < languageButtons.length; i += 1) {
      languageButtons[i].addEventListener('click', function (event) {
        switchLanguage(event.currentTarget.getAttribute('data-lang'));
      });
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) { themeToggle.addEventListener('click', toggleTheme); }

    setupCopyButtons();
  }

  /* legacy global, kept so older links still work */
  window.switchLanguage = switchLanguage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
