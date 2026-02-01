// ELEMENTOS
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");

const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");

const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoTexto = document.getElementById("resultado");

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

  // CÁLCULOS BÁSICOS (estimación)
  const kwRequeridos = (consumo / 120).toFixed(1); // promedio Colombia
  const costoEstimado = kwRequeridos * 4500000; // COP aprox por kWp

  // TEXTO PRINCIPAL
  resultadoFinal.textContent = `
    ${kwRequeridos} kWp aprox
  `;

  // TEXTO EXPLICATIVO
  if (presupuesto >= costoEstimado) {
    resultadoTexto.textContent = `
      Con tu presupuesto podrías cubrir gran parte de tu consumo mensual
      con energía solar. Es un escenario viable para evaluación técnica.
    `;
  } else {
    resultadoTexto.textContent = `
      Con este presupuesto podrías iniciar un sistema parcial
      y reducir tu factura eléctrica, aunque no cubriría el 100%.
    `;
  }

  showStep(step3);
});





