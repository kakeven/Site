const omni = document.getElementById("omni");
const dial = document.getElementById("dial");
const touch = document.getElementById("touch");
const statusEl = document.getElementById("status");
const INDEX_OFFSET = 0; // ajuste depois: 1, 2, 3... até bater
let transformed = false;

const ALIEN_NAMES = [
  "Massa Cinzenta",
  "Macaco-Aranha",
  "Besta",
  "Gigante",
  "XLR8",
  "Ameaça Aquática",
  "Fogo Fátuo",
  "Ultra-T",
  "Arraia-jato",
  "Enormossauro",
  "Fantasmático",
  "Diamante",
  "Feedback",
  "Eco Eco",
  "Friagem"
];


// CONFIG
const N = 15;                 // número de aliens
const STEP = 360 / N;         // graus por alien
const SENS = 0.90;            // graus por pixel (ajuste fino)

let isDown = false;
let startY = 0;
let baseAngle = 0;
let angle = 0;
let selectedIndex = 0;
let hasSelection = false;

function setStatus(t){ statusEl.textContent = t; }

function applyAngle(a){
  angle = a;
  dial.style.transform = `rotate(${angle}deg)`;
}

function snapToNearest(){
  const step = STEP;

  // qual "posição" (em passos) está mais perto do ângulo atual?
  const nearestSteps = Math.round(angle / step);
  const target = nearestSteps * step;

  applyAngle(target);

  // índice selecionado (0..N-1), independente de ser -360, 0, 360, etc.
  const norm = ((target % 360) + 360) % 360;
  const idx = Math.round(norm / step) % N;

  selectedIndex = idx;
  hasSelection = true;
  omni.classList.add("selected");
  setStatus(`Selecionado: Alien ${ALIEN_NAMES[selectedIndex]} (toque para transformar)`);
}


touch.addEventListener("pointerdown", (e) => {
  if (transformed) {
    transformed = false;
    hasSelection = false;
    omni.classList.remove("selected");
    setStatus("Arraste para escolher…");
    return;
  }
  // Se já está selecionado, um toque vira “transformar”
  if (hasSelection && !isDown) {
    setStatus(`TRANSFORMAÇÃO: ${ALIEN_NAMES[selectedIndex]}`);
    transformed = true;
    // aqui depois você dispara animação / troca de tela / etc
    return;
  }

  isDown = true;
  hasSelection = false;
  omni.classList.remove("selected");
  omni.classList.add("selecting");

  startY = e.clientY;
  baseAngle = angle;

  touch.setPointerCapture(e.pointerId);
  setStatus("Arraste para escolher…");
});

touch.addEventListener("pointermove", (e) => {
  if (!isDown) return;
  const dy = e.clientY - startY;     // + pra baixo
  // arrastar pra cima/baixo -> gira esquerda/direita
  const next = baseAngle - dy * SENS;
  applyAngle(next);
});

touch.addEventListener("pointerup", (e) => {
  if (!isDown) return;
  isDown = false;
  omni.classList.remove("selecting");

  snapToNearest();
});

touch.addEventListener("pointercancel", () => {
  isDown = false;
  omni.classList.remove("selecting");
  setStatus("Cancelado");
});
