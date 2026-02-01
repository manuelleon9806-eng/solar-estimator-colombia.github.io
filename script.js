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
const retornoBox = document.getElementById("retornoInversion");

// CAMBIO DE PASOS
function showStep(stepToShow) {
  document.querySelectorAll(".step").forEach(step =>
    step.classList.remove("active")
  );
  stepToShow.classList.add("active");
}

// PASO 1 → PASO 2
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  if (!consumo || consumo <= 0) {
    alert("Ingresa un consumo válido en kWh.");
    return;
  }
  showStep(step2);
});

// PASO 2 → RESULTADO
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
  }

  // PARÁMETROS COLOMBIA
  const kwhMensualPorKw = 120;
  const costoKw = 4500000;
  const precioKwh = 800;

  // CÁLCULOS
  const kwRequeridos = consumo / kwhMensualPorKw;
  const costoEstimado = kwRequeridos * costoKw;

  const cobertura = presupuesto >= costoEstimado ? 0.9 : 0.6;
  const ahorroMensual = consumo * precioKwh * cobertura;
  const ahorroAnual = ahorroMensual * 12;
  const retorno = presupuesto / ahorroAnual;

  // MOSTRAR RESULTADOS
  resultadoFinal.textContent = `${kwRequeridos.toFixed(1)} kWp aprox`;

  resultadoTexto.textContent =
    presupuesto >= costoEstimado
      ? "Tu presupuesto permitiría cubrir la mayor parte de tu consumo con energía solar."
      : "Con este presupuesto podrías iniciar un sistema parcial y reducir tu factura eléctrica.";

  ahorroBox.textContent = `Ahorro estimado: $${Math.round(ahorroMensual).toLocaleString()} COP / mes`;
  retornoBox.textContent = `Retorno estimado: ${retorno.toFixed(1)} años`;

  ahorroBox.classList.remove("show");
  retornoBox.classList.remove("show");

  setTimeout(() => ahorroBox.classList.add("show"), 150);
  setTimeout(() => retornoBox.classList.add("show"), 300);

  showStep(step3);
});

// REINICIAR
btnRestart.addEventListener("click", () => {
  consumoInput.value = "";
  presupuestoInput.value = "";
  ahorroBox.classList.remove("show");
  retornoBox.classList.remove("show");
  showStep(step1);
});






