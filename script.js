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
      step.classList.remove("active");
      if (i === stepIndex) step.classList.add("active");
    });

    const progress = ((stepIndex + 1) / steps.length) * 100;
    progressBar.style.width = progress + "%";
  }

  btnStep1.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 CLAVE

    consumo = Number(consumoInput.value);
    if (!consumo || consumo <= 0) {
      alert("Ingresa un consumo válido");
      return;
    }

    showStep(1);
  });

  btnStep2.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 CLAVE

    const presupuesto = Number(presupuestoInput.value);
    if (!presupuesto || presupuesto <= 0) {
      alert("Ingresa un presupuesto válido");
      return;
    }

    const sistemaKW = Math.ceil(consumo / 120);
    const ahorro = Math.round(consumo * 900);

    resultadoFinal.textContent = `${sistemaKW} kWp`;
    resultado.textContent = `Ahorro estimado: $${ahorro.toLocaleString("es-CO")} COP / mes`;

    showStep(2);
  });

  btnRestart.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 CLAVE

    consumoInput.value = "";
    presupuestoInput.value = "";
    resultado.textContent = "";
    resultadoFinal.textContent = "";

    showStep(0);
  });

  showStep(0);
});


