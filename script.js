const steps = document.querySelectorAll(".step");
let currentStep = 0;
function showStep(stepIndex) {
    steps.forEach(step => step.classList.remove("active"));
    steps[stepIndex].classList.add("active");
}
document.getElementById("next1").addEventListener("click", () => {
// Guardamos el consumo
let consumoMensual = 0;

// Botones
const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");

// Pasos
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

// Input
const inputConsumo = document.getElementById("consumo");

// Paso 1 → Paso 2
btnStep1.addEventListener("click", () => {
  if (inputConsumo.value === "" || inputConsumo.value <= 0) {
    alert("Por favor ingresa un consumo válido en kWh");
    return;
  }

  consumoMensual = inputConsumo.value;

  step1.classList.remove("active");
  step2.classList.add("active");
});

// Paso 2 → Paso 3
btnStep2.addEventListener("click", () => {
  step2.classList.remove("active");
  step3.classList.add("active");

  document.getElementById("resultado").innerText =
    `Tu consumo mensual es de ${consumoMensual} kWh.`;
});

    currentStep = 1;
    showStep(currentStep);
});
document.getElementById("next2").addEventListener("click", () => {
    calcularResultado();
    currentStep = 2;
    showStep(currentStep);
});
function calcularResultado() {
    const consumo = document.getElementById("consumo").value;
    const presupuesto = document.getElementById("presupuesto").value;

    const panelesEstimados = Math.ceil(consumo / 120);
    const mensaje = `
        Con un consumo de ${consumo} kWh,
        necesitarías aproximadamente ${panelesEstimados} paneles.
        Presupuesto ingresado: $${presupuesto} COP.
    `;

    document.getElementById("resultado").innerText = mensaje;
}



