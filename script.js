let consumo = 0;
const progressBar = document.getElementById("progress-bar");

document.getElementById("btn-step-1").addEventListener("click", () => {
  const input = document.getElementById("consumo").value;

  if (!input || input <= 0) {
    alert("Ingresa un consumo válido");
    return;
  }

  consumo = input;

  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");

  progressBar.style.width = "66%";
});

document.getElementById("btn-step-2").addEventListener("click", () => {
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");

  progressBar.style.width = "100%";

  document.getElementById("resultado").innerText =
    `Con un consumo aproximado de ${consumo} kWh mensuales,
    la energía solar podría ser una buena opción para ti en Colombia.`;
});





