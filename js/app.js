/* ═══════════════════════════════════════════════
   MY DASHBOARD — app.js
   Vanilla JS · Local Storage · No dependencies
════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────
   SECTION 0 · SETTINGS (theme / name / pomodoro)
─────────────────────────────────────────────── */
const SETTINGS_KEY = 'dashboard_settings';

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
  catch { return {}; }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

let settings = loadSettings();

/* ── Apply theme on load ── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme || 'dark');
  // Highlight active button in settings modal
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === (theme || 'dark'));
  });
}

applyTheme(settings.theme);

/* ── Settings modal ── */
const btnSettings     = document.getElementById('btn-settings');
const settingsOverlay = document.getElementById('settings-overlay');
const inputName       = document.getElementById('input-name');
const inputPomodoro   = document.getElementById('input-pomodoro');
const settingsSave    = document.getElementById('settings-save');
const settingsCancel  = document.getElementById('settings-cancel');

function openSettings() {
  inputName.value     = settings.name       || '';
  inputPomodoro.value = settings.pomodoro   || 25;
  applyTheme(settings.theme);
  settingsOverlay.hidden = false;
  inputName.focus();
}

function closeSettings() {
  settingsOverlay.hidden = true;
}

btnSettings.addEventListener('click', openSettings);
settingsCancel.addEventListener('click', closeSettings);

settingsOverlay.addEventListener('click', (e) => {
  if (e.target === settingsOverlay) closeSettings();
});

/* ── Theme buttons inside settings ── */
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Preview the theme immediately
    applyTheme(btn.dataset.theme);
    settings.theme = btn.dataset.theme;
  });
});

/* ── Save settings ── */
settingsSave.addEventListener('click', () => {
  const name     = inputName.value.trim();
  const pomRaw   = parseInt(inputPomodoro.value, 10);
  const pomodoro = (!isNaN(pomRaw) && pomRaw >= 1 && pomRaw <= 120) ? pomRaw : 25;

  settings.name     = name;
  settings.pomodoro = pomodoro;
  // theme already saved when pill was clicked
  saveSettings(settings);

  // Update greeting immediately
  updateClock();

  // Update timer duration (takes effect on next reset)
  TIMER_DURATION = pomodoro * 60;

  closeSettings();
});

/* ───────────────────────────────────────────────
   SECTION 1 · GREETING & CLOCK
─────────────────────────────────────────────── */
const clockEl    = document.getElementById('clock');
const greetingEl = document.getElementById('greeting');
const dateEl     = document.getElementById('date-display');

function getGreeting(hour) {
  const name    = settings.name ? `, ${settings.name}` : '';
  const timeMsg = hour >= 5  && hour < 12 ? '🌤️  Good morning'
                : hour >= 12 && hour < 17 ? '☀️  Good afternoon'
                : hour >= 17 && hour < 21 ? '🌆  Good evening'
                : '🌙  Good night';
  return `${timeMsg}${name}!`;
}

function updateClock() {
  const now   = new Date();
  const h     = String(now.getHours()).padStart(2, '0');
  const m     = String(now.getMinutes()).padStart(2, '0');
  const s     = String(now.getSeconds()).padStart(2, '0');

  clockEl.textContent    = `${h}:${m}:${s}`;
  greetingEl.textContent = getGreeting(now.getHours());
  dateEl.textContent     = now.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

updateClock();
setInterval(updateClock, 1000);


/* ───────────────────────────────────────────────
   SECTION 2 · FOCUS TIMER
─────────────────────────────────────────────── */
let TIMER_DURATION = (settings.pomodoro || 25) * 60;

const timerDisplay = document.getElementById('timer-display');
const timerStatus  = document.getElementById('timer-status');
const btnStart     = document.getElementById('timer-start');
const btnStop      = document.getElementById('timer-stop');
const btnReset     = document.getElementById('timer-reset');

// Quick-edit pencil on timer card
const timerEditBtn         = document.getElementById('timer-edit-btn');
const timerModalOverlay    = document.getElementById('timer-modal-overlay');
const timerModalInput      = document.getElementById('timer-modal-input');
const timerModalSave       = document.getElementById('timer-modal-save');
const timerModalCancel     = document.getElementById('timer-modal-cancel');

let timerRemaining = TIMER_DURATION;
let timerInterval  = null;
let timerRunning   = false;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timerRemaining);
  timerDisplay.classList.toggle('running', timerRunning && timerRemaining > 0);
  timerDisplay.classList.toggle('done',    timerRemaining === 0);
}

function startTimer() {
  if (timerRunning || timerRemaining === 0) return;
  timerRunning = true;
  timerStatus.textContent = 'Focusing…';
  renderTimer();

  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    renderTimer();
    if (timerRemaining === 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerStatus.textContent = '✅ Session complete!';
      showNotification('Focus session complete! Take a break. 🎉');
    }
  }, 1000);
}

function stopTimer() {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerRunning = false;
  timerStatus.textContent = 'Paused';
  renderTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning   = false;
  timerRemaining = TIMER_DURATION;
  timerStatus.textContent = 'Ready';
  renderTimer();
}

function showNotification(msg) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(msg);
  }
}

if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click',  stopTimer);
btnReset.addEventListener('click', resetTimer);

/* ── Quick timer edit (pencil icon) ── */
timerEditBtn.addEventListener('click', () => {
  timerModalInput.value  = Math.round(TIMER_DURATION / 60);
  timerModalOverlay.hidden = false;
  timerModalInput.focus();
  timerModalInput.select();
});

timerModalCancel.addEventListener('click', () => { timerModalOverlay.hidden = true; });

timerModalOverlay.addEventListener('click', (e) => {
  if (e.target === timerModalOverlay) timerModalOverlay.hidden = true;
});

timerModalSave.addEventListener('click', () => {
  const val = parseInt(timerModalInput.value, 10);
  if (!isNaN(val) && val >= 1 && val <= 120) {
    TIMER_DURATION = val * 60;
    settings.pomodoro = val;
    saveSettings(settings);
    resetTimer();
  }
  timerModalOverlay.hidden = true;
});

renderTimer();


/* ───────────────────────────────────────────────
   SECTION 3 · TO-DO LIST
─────────────────────────────────────────────── */
const TODO_KEY = 'dashboard_todos';

const todoForm  = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList  = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearDone = document.getElementById('clear-done');

const modalOverlay = document.getElementById('modal-overlay');
const modalInput   = document.getElementById('modal-input');
const modalSave    = document.getElementById('modal-save');
const modalCancel  = document.getElementById('modal-cancel');

let todos     = loadTodos();
let editingId = null;

function loadTodos() {
  try { return JSON.parse(localStorage.getItem(TODO_KEY)) || []; }
  catch { return []; }
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    todoList.innerHTML = '<li class="empty-state">No tasks yet — add one above!</li>';
  } else {
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;
      li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" aria-label="Mark done" ${todo.done ? 'checked' : ''} />
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <div class="todo-actions">
          <button class="btn-icon edit-btn"   title="Edit task"   aria-label="Edit task">✏️</button>
          <button class="btn-icon delete-btn" title="Delete task" aria-label="Delete task">🗑️</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  }

  const total     = todos.length;
  const remaining = todos.filter(t => !t.done).length;
  todoCount.textContent = total ? `${remaining} of ${total} remaining` : '';
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.unshift({ id: uid(), text, done: false, created: Date.now() });
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
});

todoList.addEventListener('click', (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;
  const id = li.dataset.id;
  if (e.target.classList.contains('todo-checkbox'))                      toggleTodo(id);
  else if (e.target.classList.contains('edit-btn')   || e.target.closest('.edit-btn'))   openModal(id);
  else if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) deleteTodo(id);
});

function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) { t.done = !t.done; saveTodos(); renderTodos(); }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

clearDone.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  saveTodos();
  renderTodos();
});

function openModal(id) {
  const t = todos.find(t => t.id === id);
  if (!t) return;
  editingId = id;
  modalInput.value = t.text;
  modalOverlay.hidden = false;
  modalInput.focus();
  modalInput.select();
}

function closeModal() {
  modalOverlay.hidden = true;
  editingId = null;
}

modalSave.addEventListener('click', () => {
  const newText = modalInput.value.trim();
  if (!newText || !editingId) { closeModal(); return; }
  const t = todos.find(t => t.id === editingId);
  if (t) { t.text = newText; saveTodos(); renderTodos(); }
  closeModal();
});

modalCancel.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!modalOverlay.hidden)        closeModal();
    if (!settingsOverlay.hidden)     closeSettings();
    if (!timerModalOverlay.hidden)   timerModalOverlay.hidden = true;
  }
  if (e.key === 'Enter' && !modalOverlay.hidden) modalSave.click();
});

renderTodos();


/* ───────────────────────────────────────────────
   SECTION 4 · QUICK LINKS
─────────────────────────────────────────────── */
const LINKS_KEY = 'dashboard_links';

const linkForm  = document.getElementById('link-form');
const linkName  = document.getElementById('link-name');
const linkUrl   = document.getElementById('link-url');
const linksGrid = document.getElementById('links-grid');

let links = loadLinks();

function loadLinks() {
  try { return JSON.parse(localStorage.getItem(LINKS_KEY)) || defaultLinks(); }
  catch { return defaultLinks(); }
}

function defaultLinks() {
  return [
    { id: uid(), name: 'Google',   url: 'https://google.com' },
    { id: uid(), name: 'GitHub',   url: 'https://github.com' },
    { id: uid(), name: 'YouTube',  url: 'https://youtube.com' },
    { id: uid(), name: 'MDN Docs', url: 'https://developer.mozilla.org' },
  ];
}

function saveLinks() {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
}

function faviconUrl(url) {
  try {
    const origin = new URL(url).origin;
    return `https://www.google.com/s2/favicons?sz=32&domain_url=${origin}`;
  } catch { return ''; }
}

function renderLinks() {
  linksGrid.innerHTML = '';

  if (links.length === 0) {
    linksGrid.innerHTML = '<p class="empty-state">No links yet — add one above!</p>';
    return;
  }

  links.forEach(link => {
    const item    = document.createElement('div');
    item.className = 'link-item';
    item.dataset.id = link.id;
    const favicon = faviconUrl(link.url);
    item.innerHTML = `
      <a href="${escapeAttr(link.url)}" target="_blank" rel="noopener noreferrer" class="link-btn" title="${escapeAttr(link.url)}">
        ${favicon ? `<img src="${favicon}" class="link-favicon" alt="" loading="lazy" onerror="this.style.display='none'">` : ''}
        ${escapeHtml(link.name)}
      </a>
      <button class="btn-icon link-delete" data-id="${link.id}" title="Remove link" aria-label="Remove link">✕</button>
    `;
    linksGrid.appendChild(item);
  });
}

linkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = linkName.value.trim();
  let   url  = linkUrl.value.trim();
  if (!name || !url) return;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  links.push({ id: uid(), name, url });
  saveLinks();
  renderLinks();
  linkName.value = '';
  linkUrl.value  = '';
  linkName.focus();
});

linksGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.link-delete');
  if (!btn) return;
  links = links.filter(l => l.id !== btn.dataset.id);
  saveLinks();
  renderLinks();
});

renderLinks();


/* ───────────────────────────────────────────────
   UTILITIES
─────────────────────────────────────────────── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
