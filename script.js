document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progress-bar");

  const consumoInput = document.getElementById("consumo");
  const presupuestoInput = document.getElementById("presupuesto");

  const btnStep1 = document.getElementById("btn-step-1");
  const btnStep2 = document.getElementById("btn-step-2");
  const btnRestart = document.getElementById("btn-restart");

  const resultado = document.getElementById("resultado");
  const resultadoFinal = document.getElementById("resultadoFinal");

  let consumo = 0;

  function showStep(stepIndex) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === stepIndex);
    });

    const progress = ((stepIndex + 1) / steps.length) * 100;
    progressBar.style.width = progress + "%";
  }

  // PASO 1 → PASO 2
  btnStep1.addEventListener("click", () => {
    consumo = Number(consumoInput.value);

    if (!consumo || consumo <= 0) {
      alert("Por favor ingresa un consumo válido en kWh");
      return;
    }

    showStep(1);
  });

  // PASO 2 → RESULTADO
  btnStep2.addEventListener("click", () => {
    const presupuesto = Number(presupuestoInput.value);

    if (!presupuesto || presupuesto <= 0) {
      alert("Ingresa un presupuesto válido");
      return;
    }

    const sistemaKW = Math.ceil(consumo / 120);
    const ahorro = Math.round(consumo * 900);

    resultadoFinal.textContent = `${sistemaKW} kWp`;
    resultado.textContent = `Podrías ahorrar aproximadamente $${ahorro.toLocaleString(
      "es-CO"
    )} COP al mes en tu factura.`

    showStep(2);
  });

  // REINICIAR
  btnRestart.addEventListener("click", () => {
    consumoInput.value = "";
    presupuestoInput.value = "";
    resultado.textContent = "";
    resultadoFinal.textContent = "";

    showStep(0);
  });

  // Inicial
  showStep(0);
});

