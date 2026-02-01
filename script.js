// ELEMENTOS
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
const ahorroBox = document.getElementById("ahorroMensual");

// FUNCIÓN PARA CAMBIAR DE PASO
function showStep(stepToShow) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.remove("active");
  });
  stepToShow.classList.add("active");
}

// PASO 1 → PASO 2
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  if (!consumo || consumo <= 0) {
    alert("Por favor ingresa un consumo válido en kWh.");
    return;
  }
  showStep(step2);
});

// PASO 2 → RESULTADO
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Por favor ingresa un presupuesto válido.");
    return;
  }

  // CÁLCULOS
  const kwRequeridos = (consumo / 120).toFixed(1);
  const costoEstimado = kwRequeridos * 4500000;

  const precioKwh = 800;
  const cobertura = presupuesto >= costoEstimado ? 0.9 : 0.6;
  const ahorroMensual = Math.round(consumo * precioKwh * cobertura);

  // RESULTADOS
  resultadoFinal.textContent = `${kwRequeridos} kWp aprox`;

  resultadoTexto.textContent =
    presupuesto >= costoEstimado
      ? "Con tu presupuesto podrías cubrir gran parte de tu consumo mensual con energía solar."
      : "Con este presupuesto podrías iniciar un sistema parcial y reducir tu factura eléctrica.";

  ahorroBox.textContent = `Ahorro estimado: $${ahorroMensual.toLocaleString()} COP / mes`;
  ahorroBox.classList.remove("show");
  setTimeout(() => ahorroBox.classList.add("show"), 200);

  showStep(step3);
});

// REINICIAR
btnRestart.addEventListener("click", () => {
  consumoInput.value = "";
  presupuestoInput.value = "";
  ahorroBox.classList.remove("show");
  showStep(step1);
});





