document.addEventListener("DOMContentLoaded", () => {

  /***********************
   ELEMENTOS
  ***********************/
  const steps = document.querySelectorAll(".step");
  const btnStep1 = document.getElementById("btn-step-1");
  const btnStep2 = document.getElementById("btn-step-2");
  const btnRestart = document.getElementById("btn-restart");

  const consumoInput = document.getElementById("consumo");
  const presupuestoInput = document.getElementById("presupuesto");

  const resultadoFinal = document.getElementById("resultadoFinal");
  const resultadoTexto = document.getElementById("resultado");

  let currentStep = 0;

  /***********************
   CONTROL DE PASOS
  ***********************/
  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });
  }

  // MOSTRAR PASO 1 AL CARGAR
  showStep(currentStep);

  /***********************
   PASO 1 → PASO 2
  ***********************/
  btnStep1.addEventListener("click", () => {
    const consumo = Number(consumoInput.value);

    if (!consumo || consumo <= 0) {
      alert("Ingresa un consumo válido en kWh");
      return;
    }

    currentStep = 1;
    showStep(currentStep);
  });

  /***********************
   PASO 2 → PASO 3
  ***********************/
  btnStep2.addEventListener("click", () => {
    const consumo = Number(consumoInput.value);
    const presupuesto = Number(presupuestoInput.value);

    if (!presupuesto || presupuesto <= 0) {
      alert("Ingresa un presupuesto válido");
      return;
    }

    const kwp = (consumo / 120).toFixed(1);

    resultadoFinal.textContent = `${kwp} kWp aprox`;

    resultadoTexto.textContent =
      presupuesto >= kwp * 4500000
        ? "Con este presupuesto el sistema es viable para cubrir gran parte de tu consumo."
        : "Con este presupuesto podrías iniciar con un sistema parcial y reducir tu factura.";

    currentStep = 2;
    showStep(currentStep);
  });

  /***********************
   REINICIAR
  ***********************/
  btnRestart.addEventListener("click", () => {
    consumoInput.value = "";
    presupuestoInput.value = "";
    currentStep = 0;
    showStep(currentStep);
  });

});
