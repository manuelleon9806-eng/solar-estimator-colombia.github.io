let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");
  progressBar.style.width = ((index) / (steps.length - 1)) * 100 + "%";
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function enviarWhatsApp() {
  const ciudad = document.getElementById("ciudad").value;
  const tipo = document.getElementById("tipo").value;
  const consumo = document.getElementById("consumo").value;

  const mensaje = `
Hola 👋
Quiero una estimación solar ☀️

📍 Ciudad: ${ciudad}
🏠 Inmueble: ${tipo}
⚡ Consumo mensual: ${consumo} kWh

Quedo atento, gracias.
`;

  const phone = "573227228786";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

