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
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-3").classList.add("active");
  
document.getElementById("resultado").innerText =
  `Con un consumo aproximado de ${consumo} kWh al mes, la energía solar puede ayudarte a reducir tu gasto en electricidad y ganar mayor estabilidad frente a futuras alzas en Colombia.`;

});




