//Aqui va los scripts
// script.js
// Aplica la clase .pressed de forma coherente en click/touch/teclado.
// Evita efectos visuales desagradables en móviles y asegura que se vea bien en navegadores.

(function () {
  const SELECTOR = '.cartoon-btn';
  const PRESSED_CLASS = 'pressed';
  const PRESSED_MS = 160; // duración visible del estado pressed para clicks rápidos

  function addPressed(el) {
    el.classList.add(PRESSED_CLASS);
  }
  function removePressed(el) {
    el.classList.remove(PRESSED_CLASS);
  }

  document.querySelectorAll(SELECTOR).forEach(el => {
    // MOUSE
    el.addEventListener('mousedown', () => addPressed(el));
    el.addEventListener('mouseup', () => {
      // se espera un poco para que la pulsación sea visible
      setTimeout(() => removePressed(el), 60);
    });
    el.addEventListener('mouseleave', () => removePressed(el));

    // TOUCH
    el.addEventListener('touchstart', (e) => {
      addPressed(el);
    }, { passive: true });
    el.addEventListener('touchend', () => {
      // mantener un breve instante para que se note la pulsación
      setTimeout(() => removePressed(el), PRESSED_MS);
    });
    el.addEventListener('touchcancel', () => removePressed(el));

    // CLICK (cubre casos rápidos donde mousedown/mouseup no son perceptibles)
    el.addEventListener('click', () => {
      addPressed(el);
      setTimeout(() => removePressed(el), PRESSED_MS);
    });

    // TECLADO (Enter / Space)
    el.addEventListener('keydown', (ev) => {
      if (ev.key === ' ' || ev.key === 'Spacebar' || ev.key === 'Enter') {
        // No prevengo por defecto; solo muestro el efecto visual.
        addPressed(el);
      }
    });
    el.addEventListener('keyup', (ev) => {
      if (ev.key === ' ' || ev.key === 'Spacebar' || ev.key === 'Enter') {
        setTimeout(() => removePressed(el), 80);
      }
    });
  });
})();
