const omni = document.getElementById("omnitrix");
const dial = document.getElementById("dial");
const touch = document.getElementById("touch");

let transformed = false;
let hasSelection = false;

const ALIEN_NAMES = [
  "Massa Cinzenta","Macaco-Aranha","Besta","Gigante","XLR8",
  "Ameaça Aquática","Fogo Fátuo","Ultra-T","Arraia-jato",
  "Enormossauro","Fantasmático","Diamante","Feedback","Eco Eco","Friagem"
];

// CONFIG
const N = 15;
const STEP = 360 / N;
const SENS = 2.5; // Sensibilidade ao arrastar

let isDown = false;
let startY = 0;
let baseAngle = 0;
let angle = 0;
let selectedIndex = 0;

function applyAngle(a){
  angle = a;
  dial.style.transform = `rotate(${angle}deg)`;
}

function snapToNearest(){
  const nearestSteps = Math.round(angle / STEP);
  const target = nearestSteps * STEP;
  applyAngle(target);

  const norm = ((target % 360) + 360) % 360;
  selectedIndex = Math.round(norm / STEP) % N;

  hasSelection = true;
  omni.classList.add("selected");
  console.log("Selecionado:", ALIEN_NAMES[selectedIndex]);
}

// Versão MUITO simples - só o essencial
touch.addEventListener("pointerdown", (e) => {
  // Se está transformado → volta
  if (transformed) {
    omni.classList.remove("transformed");
    transformed = false;
    return;
  }
  
  // Se tem seleção → transforma
  if (hasSelection) {
    omni.classList.add("transformed");
    transformed = true;
    return;
  }
  
  // Se não tem nada → começa a girar
  isDown = true;
  // ... resto do código para girar
});

// Reset simples: duplo clique
let lastClick = 0;
touch.addEventListener("click", (e) => {
  const now = Date.now();
  if (now - lastClick < 300) { // Duplo clique em 300ms
    hasSelection = false;
    transformed = false;
    omni.classList.remove("selected", "transformed");
  }
  lastClick = now;
});
touch.addEventListener("pointermove", (e) => {
  if (!isDown) return;
  const dy = e.clientY - startY;
  applyAngle(baseAngle - dy * SENS);
});

touch.addEventListener("pointerup", () => {
  if (!isDown) return;
  isDown = false;
  omni.classList.remove("selecting");
  snapToNearest();
});

touch.addEventListener("pointercancel", () => {
  isDown = false;
  omni.classList.remove("selecting");
});

// Adicione um botão de reset para escolher outro alien
// Ou use clique longo para resetar
let resetTimeout;
touch.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Previne menu de contexto
  
  if (hasSelection && !transformed) {
    hasSelection = false;
    transformed = false;
    omni.classList.remove("selected", "transformed");
    console.log("Reset: pode escolher outro alien");
  }
});

// Clique longo para resetar (3 segundos)
touch.addEventListener("pointerdown", (e) => {
  if (hasSelection && !transformed && e.button === 0) {
    resetTimeout = setTimeout(() => {
      hasSelection = false;
      omni.classList.remove("selected");
      console.log("Reset por clique longo");
    }, 3000);
  }
});

touch.addEventListener("pointerup", () => {
  clearTimeout(resetTimeout);
});