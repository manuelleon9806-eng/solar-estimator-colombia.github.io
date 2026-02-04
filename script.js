// =====================
// ELEMENTOS
// =====================
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");
const btnRestart = document.getElementById("btn-restart");

const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");

const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoTexto = document.getElementById("resultado");

const progressBar = document.getElementById("progress-bar");

// =====================
// FUNCIÓN CAMBIAR PASO
// =====================
function showStep(step) {
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.remove("active");
  });
  step.classList.add("active");
}

// =====================
// FUNCIÓN PROGRESS BAR
// =====================
function updateProgress(percent) {
  progressBar.style.width = percent + "%";
}

// =====================
// PASO 1 → PASO 2
// =====================
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);

  if (!consumo || consumo <= 0) {
    alert("Ingresa un consumo válido en kWh.");
    return;
  }

  showStep(step2);
  updateProgress(66);
});

// =====================
// PASO 2 → PASO 3 (RESULTADO)
// =====================
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
  }

  // CÁLCULO ESTIMADO
  const kwRequeridos = (consumo / 120).toFixed(1); // promedio Colombia
  const costoEstimado = kwRequeridos * 4500000;

  resultadoFinal.textContent = `${kwRequeridos} kWp aprox`;

  if (presupuesto >= costoEstimado) {
    resultadoTexto.textContent =
      "Con tu presupuesto podrías cubrir gran parte de tu consumo mensual con energía solar. Es un escenario viable para evaluación técnica.";
  } else {
    resultadoTexto.textContent =
      "Con este presupuesto podrías iniciar un sistema parcial y reducir tu factura eléctrica, aunque no cubriría el 100%.";
  }

  showStep(step3);
  updateProgress(100);
});

// =====================
// REINICIAR
// =====================
btnRestart.addEventListener("click", () => {
  consumoInput.value = "";
  presupuestoInput.value = "";

  showStep(step1);
  updateProgress(33);
});

// =====================
// INICIAL
// =====================
updateProgress(33);



