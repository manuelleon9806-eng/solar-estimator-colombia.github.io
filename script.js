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
const btnWhatsapp = document.getElementById("btn-whatsapp");

// 👉 TU URL DE GOOGLE SCRIPT
const SHEET_URL = "https://script.google.com/u/0/home/projects/1Q2TeVIS4uogrL-xSceMm9fX8tIfmIahef-6fB0DVPHW2veBe9c9xU7YX/edit";

// FUNCIÓN PASOS
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
    alert("Ingresa un consumo válido.");
    return;
  }
  showStep(step2);
});

// PASO 2 → RESULTADO
btnStep2.addEventListener("click", async () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
  }

  const kwp = (consumo / 120).toFixed(1);
  const costoEstimado = kwp * 4500000;

  resultadoFinal.textContent = `${kwp} kWp aprox`;

  let escenario = "";

  if (presupuesto >= costoEstimado) {
    escenario = "Viable";
    resultadoTexto.textContent =
      "Tu presupuesto es compatible con un sistema solar funcional.";
  } else {
    escenario = "Parcial";
    resultadoTexto.textContent =
      "Podrías iniciar con un sistema parcial y ampliarlo después.";
  }

  // 📥 GUARDAR LEAD
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      consumo,
      presupuesto,
      kwp,
      escenario
    }),
  });

  // 📲 WHATSAPP
  const mensaje = `
Hola 👋
Hice una estimación solar:

🔹 Consumo: ${consumo} kWh
🔹 Sistema: ${kwp} kWp
🔹 Presupuesto: $${presupuesto.toLocaleString()} COP

Quiero continuar con un instalador.
  `.trim();

  const telefono = "573227228786"; // TU NÚMERO
  btnWhatsapp.href =
    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  showStep(step3);
});







