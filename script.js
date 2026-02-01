// ===============================
// ELEMENTOS
// ===============================
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");

const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");

const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoTexto = document.getElementById("resultado");

const box = document.getElementById("resultadoBox");
const progressBar = document.querySelector(".progress-bar");


// ===============================
// FUNCIÓN CAMBIAR PASOS
// ===============================
function showStep(stepToShow, progress) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.remove("active");
  });

  stepToShow.classList.add("active");

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
}


// ===============================
// PASO 1 → PASO 2
// ===============================
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);

  if (!consumo || consumo <= 0) {
    alert("Por favor ingresa un consumo válido en kWh.");
    return;
  }

  showStep(step2, 66);
});


// ===============================
// PASO 2 → RESULTADO
// ===============================
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Por favor ingresa un presupuesto válido.");
    return;
  }

  // ===============================
  // CÁLCULOS (estimación Colombia)
  // ===============================
  const kwRequeridos = (consumo / 120).toFixed(1);
  const costoEstimado = kwRequeridos * 4500000;

  // ===============================
  // RESULTADO PRINCIPAL
  // ===============================
  resultadoFinal.textContent = `${kwRequeridos} kWp aprox`;

  // ===============================
  // TEXTO UX FINAL
  // ===============================
  if (presupuesto >= costoEstimado) {
    resultadoTexto.textContent =
      "Con tu presupuesto podrías cubrir gran parte de tu consumo mensual con energía solar. Es una opción viable para evaluación técnica.";
  } else {
    resultadoTexto.textContent =
      "Con este presupuesto podrías iniciar un sistema parcial, reducir tu factura eléctrica y crecer el sistema más adelante.";
  }

  // ===============================
  // MOSTRAR PASO 3
  // ===============================
  showStep(step3, 100);

  // ===============================
  // ANIMACIÓN DEL RESULTADO
  // ===============================
  if (box) {
    box.classList.remove("show");
    setTimeout(() => {
      box.classList.add("show");
    }, 100);
  }
});
;





