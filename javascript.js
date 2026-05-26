const display = document.getElementById('display');

function appendValue(val) {
  display.value += val;
  display.focus();
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    const result = Function('"use strict";return (' + display.value + ')')();
    display.value = result === undefined || result === Infinity || isNaN(result) ? 'Error' : result;
  } catch {
    display.value = 'Error';
    shakeDisplay();
  }
}

function shakeDisplay() {
  display.style.animation = 'none';
  void display.offsetHeight;
  display.style.animation = 'shake 0.4s ease';
}

const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}`;
document.head.appendChild(style);

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key >= '0' && key <= '9' || key === '.') {
    appendValue(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendValue(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearDisplay();
  }
});
