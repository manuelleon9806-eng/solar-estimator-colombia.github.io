let consumo = 0;

document.getElementById("btn-step-1").addEventListener("click", () => {
  const input = document.getElementById("consumo").value;

  if (!input || input <= 0) {
    alert("Ingresa un consumo válido");
    return;
  }

  consumo = input;

  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
});

document.getElementById("btn-step-2").addEventListener("click", () => {
  const presupuesto = document.getElementById("presupuesto").value;

  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");

  document.getElementById("resultado").innerText =
    `Con un consumo de ${consumo} kWh, la energía solar es viable para ti.`;
});



