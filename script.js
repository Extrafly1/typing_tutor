'use strict';

/* ---------- Данные клавиатуры и упражнений ---------- */

const LAYOUTS = {
  ru: { name: 'Русский', short: 'RU', footer: 'русская' },
  en: { name: 'English', short: 'EN', footer: 'английская' }
};

const LESSONS = {
  home: 'Домашний ряд',
  top: 'Верхний ряд',
  bottom: 'Нижний ряд',
  all: 'Все буквы',
  words: 'Слова',
  sentences: 'Предложения'
};

const FINGER_COLORS = {
  lp: '#f472b6', lr: '#fbbf24', lm: '#34d399', li: '#60a5fa',
  ri: '#60a5fa', rm: '#34d399', rr: '#fbbf24', rp: '#f472b6',
  th: '#a78bfa'
};

const FINGER_NAMES = {
  lp: 'левый мизинец', lr: 'левый безымянный', lm: 'левый средний', li: 'левый указательный',
  ri: 'правый указательный', rm: 'правый средний', rr: 'правый безымянный', rp: 'правый мизинец',
  th: 'большой палец'
};

const MOD_LABELS = {
  Backspace: '⌫', Tab: 'Tab', CapsLock: 'Caps', Enter: 'Enter',
  ShiftLeft: 'Shift', ShiftRight: 'Shift', ControlLeft: 'Ctrl', ControlRight: 'Ctrl',
  AltLeft: 'Alt', AltRight: 'Alt', MetaLeft: 'Win', MetaRight: 'Win',
  ContextMenu: '☰', Space: 'Пробел'
};

const k = (code, w, finger) => ({ code, w, finger });

const KEY_ROWS = [
  [
    k('Backquote', 1, 'lp'), k('Digit1', 1, 'lp'), k('Digit2', 1, 'lr'), k('Digit3', 1, 'lm'),
    k('Digit4', 1, 'li'), k('Digit5', 1, 'li'), k('Digit6', 1, 'ri'), k('Digit7', 1, 'ri'),
    k('Digit8', 1, 'rm'), k('Digit9', 1, 'rr'), k('Digit0', 1, 'rr'), k('Minus', 1, 'rp'),
    k('Equal', 1, 'rp'), k('Backspace', 2, 'rp')
  ],
  [
    k('Tab', 1.5, 'lp'), k('KeyQ', 1, 'lp'), k('KeyW', 1, 'lr'), k('KeyE', 1, 'lm'),
    k('KeyR', 1, 'li'), k('KeyT', 1, 'li'), k('KeyY', 1, 'ri'), k('KeyU', 1, 'ri'),
    k('KeyI', 1, 'rm'), k('KeyO', 1, 'rr'), k('KeyP', 1, 'rp'), k('BracketLeft', 1, 'rp'),
    k('BracketRight', 1, 'rp'), k('Backslash', 1.5, 'rp')
  ],
  [
    k('CapsLock', 1.75, 'lp'), k('KeyA', 1, 'lp'), k('KeyS', 1, 'lr'), k('KeyD', 1, 'lm'),
    k('KeyF', 1, 'li'), k('KeyG', 1, 'li'), k('KeyH', 1, 'ri'), k('KeyJ', 1, 'ri'),
    k('KeyK', 1, 'rm'), k('KeyL', 1, 'rr'), k('Semicolon', 1, 'rp'), k('Quote', 1, 'rp'),
    k('Enter', 2.25, 'rp')
  ],
  [
    k('ShiftLeft', 2.25, 'lp'), k('KeyZ', 1, 'lp'), k('KeyX', 1, 'lr'), k('KeyC', 1, 'lm'),
    k('KeyV', 1, 'li'), k('KeyB', 1, 'li'), k('KeyN', 1, 'ri'), k('KeyM', 1, 'ri'),
    k('Comma', 1, 'rm'), k('Period', 1, 'rr'), k('Slash', 1, 'rp'), k('ShiftRight', 2.75, 'rp')
  ],
  [
    k('ControlLeft', 1.25, 'lp'), k('MetaLeft', 1.25, 'lp'), k('AltLeft', 1.25, 'th'),
    k('Space', 6.25, 'th'), k('AltRight', 1.25, 'th'), k('MetaRight', 1.25, 'rp'),
    k('ContextMenu', 1.25, 'rp'), k('ControlRight', 1.25, 'rp')
  ]
];

const KEY_LOOKUP = new Map();
KEY_ROWS.flat().forEach(def => KEY_LOOKUP.set(def.code, def));

const LETTERS = {
  en: {
    KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't', KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
    KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g', KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
    KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b', KeyN: 'n', KeyM: 'm'
  },
  ru: {
    KeyQ: 'й', KeyW: 'ц', KeyE: 'у', KeyR: 'к', KeyT: 'е', KeyY: 'н', KeyU: 'г', KeyI: 'ш', KeyO: 'щ', KeyP: 'з',
    KeyA: 'ф', KeyS: 'ы', KeyD: 'в', KeyF: 'а', KeyG: 'п', KeyH: 'р', KeyJ: 'о', KeyK: 'л', KeyL: 'д',
    KeyZ: 'я', KeyX: 'ч', KeyC: 'с', KeyV: 'м', KeyB: 'и', KeyN: 'т', KeyM: 'ь'
  }
};

const BASE_CHARS = {
  en: {
    Backquote: ['`', '~'], Digit1: ['1', '!'], Digit2: ['2', '@'], Digit3: ['3', '#'],
    Digit4: ['4', '$'], Digit5: ['5', '%'], Digit6: ['6', '^'], Digit7: ['7', '&'],
    Digit8: ['8', '*'], Digit9: ['9', '('], Digit0: ['0', ')'], Minus: ['-', '_'], Equal: ['=', '+'],
    BracketLeft: ['[', '{'], BracketRight: [']', '}'], Backslash: ['\\', '|'],
    Semicolon: [';', ':'], Quote: ["'", '"'], Comma: [',', '<'], Period: ['.', '>'],
    Slash: ['/', '?'], Space: [' ', ' ']
  },
  ru: {
    Backquote: ['ё', 'Ё'], Digit1: ['1', '!'], Digit2: ['2', '"'], Digit3: ['3', '№'],
    Digit4: ['4', ';'], Digit5: ['5', '%'], Digit6: ['6', ':'], Digit7: ['7', '?'],
    Digit8: ['8', '*'], Digit9: ['9', '('], Digit0: ['0', ')'], Minus: ['-', '_'], Equal: ['=', '+'],
    BracketLeft: ['х', 'Х'], BracketRight: ['ъ', 'Ъ'], Backslash: ['\\', '/'],
    Semicolon: ['ж', 'Ж'], Quote: ['э', 'Э'], Comma: ['б', 'Б'], Period: ['ю', 'Ю'],
    Slash: ['.', ','], Space: [' ', ' ']
  }
};

function withLetters(base, letters) {
  const result = { ...base };
  Object.entries(letters).forEach(([code, char]) => {
    result[code] = [char, char.toUpperCase()];
  });
  return result;
}

const KEY_CHARS = {
  en: withLetters(BASE_CHARS.en, LETTERS.en),
  ru: withLetters(BASE_CHARS.ru, LETTERS.ru)
};

const LETTER_SETS = {
  en: {
    home: 'asdfghjkl;',
    top: 'qwertyuiop',
    bottom: 'zxcvbnm',
    all: 'qwertyuiopasdfghjkl;zxcvbnm'
  },
  ru: {
    home: 'фывапролджэ',
    top: 'йцукенгшщзхъ',
    bottom: 'ячсмитьбю',
    all: 'ёйцукенгшщзхъфывапролджэячсмитьбю'
  }
};

const WORDS = {
  en: [
    'the', 'and', 'for', 'you', 'with', 'that', 'this', 'from', 'have', 'not', 'are', 'but', 'what', 'all',
    'when', 'there', 'can', 'your', 'which', 'their', 'said', 'will', 'each', 'about', 'how', 'out', 'them',
    'then', 'she', 'many', 'some', 'would', 'other', 'into', 'more', 'her', 'two', 'like', 'him', 'see',
    'time', 'could', 'make', 'than', 'first', 'been', 'who', 'now', 'people', 'made', 'over', 'did', 'down',
    'only', 'way', 'find', 'use', 'water', 'long', 'little', 'very', 'after', 'words', 'called', 'just',
    'where', 'most', 'know', 'place', 'year', 'live', 'back', 'give', 'day', 'work', 'three', 'between',
    'need', 'feel', 'again', 'world', 'house', 'point', 'small', 'large', 'under', 'while', 'light', 'night'
  ],
  ru: [
    'дом', 'кот', 'мир', 'свет', 'день', 'ночь', 'рука', 'вода', 'небо', 'поле', 'лес', 'река', 'город',
    'окно', 'стол', 'стул', 'книга', 'школа', 'работа', 'время', 'слово', 'язык', 'путь', 'жизнь', 'друг',
    'семья', 'утро', 'вечер', 'зима', 'весна', 'лето', 'осень', 'солнце', 'ветер', 'дождь', 'снег', 'море',
    'гора', 'трава', 'цветы', 'птица', 'рыба', 'хлеб', 'молоко', 'чашка', 'ложка', 'бумага', 'письмо',
    'музыка', 'танец', 'песня', 'игра', 'мечта', 'идея', 'мысль', 'память', 'сердце', 'голос', 'тишина',
    'простор', 'дорога', 'встреча', 'радость', 'улыбка', 'тепло', 'запах', 'вкус', 'точка', 'линия',
    'буква', 'звук', 'ритм', 'поток', 'порядок', 'система', 'метод', 'результат', 'скорость', 'точность',
    'внимание', 'практика', 'навык', 'успех', 'движение', 'развитие', 'польза', 'интерес', 'вопрос',
    'ответ', 'пример', 'задача', 'решение', 'проект', 'процесс', 'качество', 'уровень', 'прогресс', 'форма',
    'стиль', 'темп'
  ]
};

const SENTENCES = {
  en: [
    'The quick brown fox jumps over the lazy dog.',
    'Practice every day and your fingers will remember the keys.',
    'A calm rhythm is the secret of fast and accurate typing.',
    'Keep your eyes on the screen while your hands find the keys.',
    'Small steps lead to great results if you keep going.',
    'Type slowly at first, then let the speed come naturally.',
    'Good posture and relaxed hands make typing easier.',
    'Every mistake is a chance to learn something new.',
    'Fast typing is a skill that grows with daily practice.',
    'Stay curious, keep practicing, and enjoy the process!'
  ],
  ru: [
    'Быстрая печать начинается с правильной посадки и спокойного ритма.',
    'Старайтесь не смотреть на клавиатуру и доверяйте своим пальцам.',
    'Каждый день по десять минут дают заметный результат.',
    'Ровный темп важнее высокой скорости в начале обучения.',
    'Держите спину прямо, а руки свободно и расслабленно.',
    'Ошибки помогают понять, какие клавиши стоит повторить.',
    'Практика превращает трудные движения в простые привычки.',
    'Внимание и терпение помогут освоить хороший набор.',
    'Кто быстро печатает, тот успевает делать больше?',
    'Освойте слепую печать, и скорость вырастет сама!'
  ]
};

/* ---------- Вспомогательные функции ---------- */

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = array => array[randInt(0, array.length - 1)];

function scriptOf(char) {
  if (/[a-z]/i.test(char)) return 'en';
  if (/[а-яё]/i.test(char)) return 'ru';
  return null;
}

function generateGroups(lang, lesson) {
  const alphabet = LETTER_SETS[lang][lesson] || LETTER_SETS[lang].all;
  const target = randInt(80, 96);
  let out = '';
  while (out.length < target) {
    const length = pick([3, 4, 5]);
    let group = '';
    for (let i = 0; i < length; i++) group += alphabet[randInt(0, alphabet.length - 1)];
    out += (out ? ' ' : '') + group;
  }
  return out;
}

function generateWords(lang) {
  const pool = WORDS[lang];
  const target = randInt(76, 92);
  let out = '';
  let last = '';
  while (out.length < target) {
    let word = pick(pool);
    let guard = 0;
    while (word === last && guard++ < 12) word = pick(pool);
    out += (out ? ' ' : '') + word;
    last = word;
  }
  return out;
}

function generateSentences(lang) {
  const pool = SENTENCES[lang];
  let out = '';
  let lastIndex = -1;
  for (let i = 0; i < 2; i++) {
    let index = randInt(0, pool.length - 1);
    let guard = 0;
    while (index === lastIndex && guard++ < 12) index = randInt(0, pool.length - 1);
    lastIndex = index;
    out += (out ? ' ' : '') + pool[index];
  }
  return out;
}

function generateText(lang, lesson) {
  if (lesson === 'words') return generateWords(lang);
  if (lesson === 'sentences') return generateSentences(lang);
  return generateGroups(lang, lesson);
}

function buildCharMap(lang) {
  const map = new Map();
  Object.entries(KEY_CHARS[lang]).forEach(([code, pair]) => {
    const [main, shifted] = pair;
    if (main && !map.has(main)) map.set(main, { code, shift: false });
    if (shifted && shifted !== main && !map.has(shifted)) map.set(shifted, { code, shift: true });
  });
  return map;
}

/* ---------- Состояние и DOM ---------- */

const state = {
  lang: 'ru',
  lesson: 'home',
  text: '',
  index: 0,
  errors: 0,
  startedAt: 0,
  finishedAt: 0,
  finished: false,
  timerId: null,
  keyboardHidden: false,
  layoutWarned: false
};

let charEls = [];
let keyEls = new Map();
let charMap = buildCharMap(state.lang);
let statusTimer = null;

const el = id => document.getElementById(id);
const els = {
  langButtons: document.querySelectorAll('.lang-btn'),
  chips: document.querySelectorAll('.chip'),
  brand: document.querySelector('.brand'),
  kbToggle: el('kbToggle'),
  kbToggleLabel: el('kbToggleLabel'),
  keyboardShell: el('keyboardShell'),
  keyboard: el('keyboard'),
  statWpm: el('statWpm'),
  statAccuracy: el('statAccuracy'),
  statTime: el('statTime'),
  statErrors: el('statErrors'),
  typingCard: el('typingCard'),
  langTag: el('langTag'),
  lessonName: el('lessonName'),
  textDisplay: el('textDisplay'),
  progressTrack: el('progressTrack'),
  progressFill: el('progressFill'),
  progressValue: el('progressValue'),
  statusLine: el('statusLine'),
  statusText: el('statusText'),
  restartBtn: el('restartBtn'),
  newTextBtn: el('newTextBtn'),
  nextHint: el('nextHint'),
  nextDot: el('nextDot'),
  nextChar: el('nextChar'),
  footerLayout: el('footerLayout'),
  resultOverlay: el('resultOverlay'),
  resultSubtitle: el('resultSubtitle'),
  resultWpm: el('resultWpm'),
  resultAccuracy: el('resultAccuracy'),
  resultTime: el('resultTime'),
  resultErrors: el('resultErrors'),
  resultRetry: el('resultRetry'),
  resultNext: el('resultNext'),
  resultClose: el('resultClose')
};

const STORAGE = {
  lang: 'tt.lang',
  lesson: 'tt.lesson',
  keyboard: 'tt.keyboardHidden'
};

function getStored(key) {
  try { return localStorage.getItem(key); } catch (error) { return null; }
}

function setStored(key, value) {
  try { localStorage.setItem(key, value); } catch (error) { /* локальное хранилище недоступно */ }
}

/* ---------- Отрисовка клавиатуры ---------- */

function renderKeyboard() {
  keyEls.clear();
  els.keyboard.innerHTML = '';
  const chars = KEY_CHARS[state.lang];

  KEY_ROWS.forEach(rowDefs => {
    const row = document.createElement('div');
    row.className = 'kbd-row';

    rowDefs.forEach(def => {
      const cell = document.createElement('div');
      cell.className = 'key-cell';
      cell.style.gridColumn = `span ${Math.round(def.w * 4)}`;

      const key = document.createElement('div');
      key.className = 'key';
      key.dataset.code = def.code;
      const pair = chars[def.code];

      if (pair) {
        const [main, shifted] = pair;
        if (shifted && shifted !== main) {
          const shiftLabel = document.createElement('span');
          shiftLabel.className = 'key-shift';
          shiftLabel.textContent = shifted;
          key.append(shiftLabel);
        }
        const mainLabel = document.createElement('span');
        mainLabel.className = 'key-main';
        mainLabel.textContent = def.code === 'Space'
          ? (state.lang === 'ru' ? 'Пробел' : 'Space')
          : main;
        if (def.code === 'Space') key.classList.add('key--space');
        key.append(mainLabel);
      } else {
        key.classList.add('key--mod');
        const label = document.createElement('span');
        label.className = 'key-main';
        label.textContent = MOD_LABELS[def.code] || def.code;
        key.append(label);
      }

      if (def.finger) {
        key.style.setProperty('--finger-color', FINGER_COLORS[def.finger]);
        const strip = document.createElement('span');
        strip.className = 'key-finger';
        key.append(strip);
      }

      cell.append(key);
      row.append(cell);
      keyEls.set(def.code, key);
    });

    els.keyboard.append(row);
  });

  updateKeyboardHint();
}

function updateKeyboardHint() {
  keyEls.forEach(key => key.classList.remove('is-next', 'is-next-shift'));

  if (state.finished || !state.text) {
    els.nextChar.textContent = '—';
    els.nextDot.style.background = 'var(--muted-2)';
    els.nextHint.title = 'Следующая клавиша';
    return;
  }

  const char = state.text[state.index];
  const info = charMap.get(char);
  if (!info) {
    els.nextChar.textContent = char === ' ' ? 'пробел' : char;
    els.nextDot.style.background = 'var(--muted-2)';
    return;
  }

  const def = KEY_LOOKUP.get(info.code);
  const finger = def ? def.finger : null;
  els.nextChar.textContent = char === ' ' ? 'пробел' : (info.shift ? `Shift + ${char}` : char);
  els.nextDot.style.background = finger ? FINGER_COLORS[finger] : 'var(--muted-2)';
  els.nextHint.title = finger ? `Следующая клавиша · ${FINGER_NAMES[finger]}` : 'Следующая клавиша';

  const keyEl = keyEls.get(info.code);
  if (keyEl) keyEl.classList.add('is-next');

  if (info.shift && finger) {
    const shiftCode = finger.startsWith('l') ? 'ShiftRight' : 'ShiftLeft';
    const shiftEl = keyEls.get(shiftCode);
    if (shiftEl) shiftEl.classList.add('is-next-shift');
  }
}

/* ---------- Отрисовка текста и статистики ---------- */

function makeChar(char, index) {
  const span = document.createElement('span');
  span.className = char === ' ' ? 'char char--space' : 'char';
  span.dataset.index = index;
  span.textContent = char === ' ' ? ' ' : char;
  return span;
}

function renderText() {
  charEls = [];
  els.textDisplay.innerHTML = '';
  const tokens = state.text.match(/\S+|\s+/g) || [];

  tokens.forEach(token => {
    if (/^\s+$/.test(token)) {
      for (const char of token) {
        const span = makeChar(char, charEls.length);
        els.textDisplay.append(span);
        charEls.push(span);
      }
      return;
    }

    const word = document.createElement('span');
    word.className = 'word';
    for (const char of token) {
      const span = makeChar(char, charEls.length);
      word.append(span);
      charEls.push(span);
    }
    els.textDisplay.append(word);
  });

  if (charEls[0]) charEls[0].classList.add('is-current');
}

function updateStats() {
  const elapsed = currentElapsedMs();
  const minutes = elapsed / 60000;
  const wpm = elapsed > 800 && minutes > 0 ? Math.min(999, Math.round((state.index / 5) / minutes)) : 0;
  const attempts = state.index + state.errors;
  const accuracy = attempts === 0 ? 100 : Math.round((state.index / attempts) * 100);
  const percent = state.text ? Math.round((state.index / state.text.length) * 100) : 0;

  els.statWpm.textContent = String(wpm);
  els.statAccuracy.textContent = String(accuracy);
  els.statTime.textContent = formatTime(elapsed);
  els.statErrors.textContent = String(state.errors);
  els.progressFill.style.width = `${percent}%`;
  els.progressValue.textContent = `${percent}%`;
  els.progressTrack.setAttribute('aria-valuenow', String(percent));
}

function currentElapsedMs() {
  if (!state.startedAt) return 0;
  const end = state.finished ? state.finishedAt : performance.now();
  return Math.max(0, end - state.startedAt);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function finalStats() {
  const elapsed = state.finishedAt && state.startedAt ? state.finishedAt - state.startedAt : currentElapsedMs();
  const minutes = elapsed / 60000;
  const wpm = minutes > 0 ? Math.min(999, Math.round((state.text.length / 5) / minutes)) : 0;
  const attempts = state.text.length + state.errors;
  const accuracy = attempts === 0 ? 100 : Math.round((state.text.length / attempts) * 100);
  return { wpm, accuracy, time: formatTime(elapsed), errors: state.errors };
}

/* ---------- Статус и обратная связь ---------- */

function setStatus(kind, text) {
  els.statusLine.dataset.kind = kind;
  els.statusText.textContent = text;
}

function resetStatus() {
  if (state.finished) setStatus('success', 'Упражнение завершено. Отличная работа!');
  else if (state.startedAt) setStatus('info', 'Спокойный ритм и точность важнее скорости.');
  else setStatus('info', 'Начните печатать — таймер запустится автоматически.');
}

function setStatusTimed(kind, text, delay = 2400) {
  clearTimeout(statusTimer);
  setStatus(kind, text);
  statusTimer = setTimeout(() => {
    if (!state.finished) resetStatus();
  }, delay);
}

function pulseCard(kind) {
  const className = kind === 'warning' ? 'flash-warning' : 'flash-error';
  els.typingCard.classList.remove('flash-warning', 'flash-error');
  void els.typingCard.offsetWidth;
  els.typingCard.classList.add(className);
  setTimeout(() => els.typingCard.classList.remove(className), 600);
}

/* ---------- Таймер ---------- */

function startTicker() {
  stopTicker();
  state.timerId = setInterval(updateStats, 200);
}

function stopTicker() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

/* ---------- Ввод ---------- */

function handleTypedChar(event) {
  const char = event.key;
  const expected = state.text[state.index];
  if (!expected) return;

  const typedScript = scriptOf(char);
  if (typedScript && typedScript !== state.lang) {
    state.layoutWarned = true;
    const needed = state.lang === 'ru' ? 'русская' : 'английская';
    setStatus('warning', `Сейчас нужна ${needed} раскладка. Переключите язык ввода (Alt + Shift).`);
    pulseCard('warning');
    return;
  }

  if (!state.startedAt) {
    state.startedAt = performance.now();
    startTicker();
  }

  if (char === expected) {
    state.layoutWarned = false;
    clearTimeout(statusTimer);

    const current = charEls[state.index];
    if (current) {
      current.classList.remove('is-current', 'miss', 'is-error');
      current.classList.add('is-correct');
    }

    state.index += 1;

    if (state.index >= state.text.length) {
      updateStats();
      finishSession();
      return;
    }

    const next = charEls[state.index];
    if (next) next.classList.add('is-current');
    resetStatus();
    updateStats();
    updateKeyboardHint();
    return;
  }

  state.errors += 1;
  const current = charEls[state.index];
  if (current) {
    current.classList.add('miss');
    current.classList.remove('is-error');
    void current.offsetWidth;
    current.classList.add('is-error');
    clearTimeout(current._shakeTimer);
    current._shakeTimer = setTimeout(() => current.classList.remove('is-error'), 340);
  }

  pulseCard('error');
  const capsLock = typeof event.getModifierState === 'function' && event.getModifierState('CapsLock');
  if (capsLock) {
    setStatusTimed('warning', 'Caps Lock включён. Отключите его, чтобы печатать строчные буквы.', 3000);
  } else {
    setStatusTimed('error', 'Неверная клавиша. Попробуйте ещё раз — подсветка подскажет нужную.', 2400);
  }
  updateStats();
}

function flashPhysicalKey(code, pressed) {
  const key = keyEls.get(code);
  if (!key) return;
  key.classList.toggle('is-pressed', pressed);
}

function clearPressedKeys() {
  keyEls.forEach(key => key.classList.remove('is-pressed'));
}

/* ---------- Сессия ---------- */

function resetSession({ newText = false } = {}) {
  stopTicker();
  clearTimeout(statusTimer);

  if (newText || !state.text) {
    state.text = generateText(state.lang, state.lesson);
  }

  state.index = 0;
  state.errors = 0;
  state.startedAt = 0;
  state.finishedAt = 0;
  state.finished = false;
  state.layoutWarned = false;

  hideResult();
  updateMeta();
  renderText();
  resetStatus();
  updateStats();
  updateKeyboardHint();
}

function finishSession() {
  if (state.finished) return;
  state.finished = true;
  state.finishedAt = performance.now();
  stopTicker();
  updateStats();
  updateKeyboardHint();
  setStatus('success', 'Упражнение завершено. Отличная работа!');
  showResult();
}

function showResult() {
  const stats = finalStats();
  els.resultWpm.textContent = String(stats.wpm);
  els.resultAccuracy.textContent = String(stats.accuracy);
  els.resultTime.textContent = stats.time;
  els.resultErrors.textContent = String(stats.errors);

  if (stats.accuracy >= 98) els.resultSubtitle.textContent = 'Безупречная точность! Так держать.';
  else if (stats.accuracy >= 94) els.resultSubtitle.textContent = 'Отличный результат — ритм уже чувствуется.';
  else if (stats.accuracy >= 88) els.resultSubtitle.textContent = 'Хорошая работа! Точность растёт вместе с практикой.';
  else els.resultSubtitle.textContent = 'Главное — уверенность. Попробуйте ещё раз в спокойном темпе.';

  els.resultOverlay.classList.add('is-open');
  els.resultOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function hideResult() {
  els.resultOverlay.classList.remove('is-open');
  els.resultOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function updateMeta() {
  els.langTag.textContent = LAYOUTS[state.lang].short;
  els.lessonName.textContent = LESSONS[state.lesson];
  els.footerLayout.textContent = LAYOUTS[state.lang].footer;
}

/* ---------- Переключение режимов ---------- */

function setLanguage(lang) {
  if (!LAYOUTS[lang] || lang === state.lang) return;
  state.lang = lang;
  setStored(STORAGE.lang, lang);
  els.langButtons.forEach(button => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  charMap = buildCharMap(lang);
  renderKeyboard();
  resetSession({ newText: true });
}

function setLesson(lesson) {
  if (!LESSONS[lesson] || lesson === state.lesson) return;
  state.lesson = lesson;
  setStored(STORAGE.lesson, lesson);
  els.chips.forEach(chip => {
    const active = chip.dataset.lesson === lesson;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });
  resetSession({ newText: true });
}

function setKeyboardHidden(hidden, persist = true) {
  state.keyboardHidden = hidden;
  els.keyboardShell.hidden = hidden;
  els.kbToggle.classList.toggle('is-hidden', hidden);
  els.kbToggle.setAttribute('aria-expanded', String(!hidden));
  els.kbToggleLabel.textContent = hidden ? 'Показать клавиатуру' : 'Скрыть клавиатуру';
  els.kbToggle.title = hidden ? 'Показать экранную клавиатуру' : 'Скрыть экранную клавиатуру';
  if (persist) setStored(STORAGE.keyboard, hidden ? '1' : '0');
}

/* ---------- События ---------- */

els.langButtons.forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
    button.blur();
  });
});

els.chips.forEach(chip => {
  chip.addEventListener('click', () => {
    setLesson(chip.dataset.lesson);
    chip.blur();
  });
});

els.restartBtn.addEventListener('click', event => {
  resetSession({ newText: false });
  event.currentTarget.blur();
});

els.newTextBtn.addEventListener('click', event => {
  resetSession({ newText: true });
  event.currentTarget.blur();
});

els.kbToggle.addEventListener('click', () => {
  setKeyboardHidden(!state.keyboardHidden);
  els.kbToggle.blur();
});

els.resultRetry.addEventListener('click', () => resetSession({ newText: false }));
els.resultNext.addEventListener('click', () => resetSession({ newText: true }));
els.resultClose.addEventListener('click', hideResult);

els.resultOverlay.addEventListener('click', event => {
  if (event.target === els.resultOverlay) hideResult();
});

els.brand.addEventListener('click', event => {
  event.preventDefault();
  resetSession({ newText: false });
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', event => {
  if (event.code) flashPhysicalKey(event.code, true);

  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    resetSession({ newText: false });
    return;
  }

  if (state.finished) {
    if (event.key === 'Enter') {
      event.preventDefault();
      resetSession({ newText: true });
    }
    return;
  }

  const modifierKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'AltGraph', 'OS'];
  if (modifierKeys.includes(event.key)) return;

  if (event.repeat) {
    if (event.key === ' ') event.preventDefault();
    return;
  }

  if (event.isComposing) return;

  if (event.key === 'Backspace' || event.key === 'Tab' || event.key === 'Enter') {
    event.preventDefault();
    return;
  }

  if (event.key.length !== 1) return;

  event.preventDefault();
  handleTypedChar(event);
});

document.addEventListener('keyup', event => {
  if (event.code) flashPhysicalKey(event.code, false);
});

window.addEventListener('blur', clearPressedKeys);

/* ---------- Запуск ---------- */

function init() {
  const storedLang = getStored(STORAGE.lang);
  const storedLesson = getStored(STORAGE.lesson);
  const storedKeyboard = getStored(STORAGE.keyboard);

  if (storedLang && LAYOUTS[storedLang]) state.lang = storedLang;
  if (storedLesson && LESSONS[storedLesson]) state.lesson = storedLesson;
  state.keyboardHidden = storedKeyboard === '1';

  els.langButtons.forEach(button => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  els.chips.forEach(chip => {
    const active = chip.dataset.lesson === state.lesson;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });

  charMap = buildCharMap(state.lang);
  renderKeyboard();
  setKeyboardHidden(state.keyboardHidden, false);
  resetSession({ newText: true });
  updateStats();
}

init();
