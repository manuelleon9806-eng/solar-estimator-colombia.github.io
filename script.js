// =====================
// ELEMENTOS
// =====================
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");

const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");

// =====================
// ENDPOINT GOOGLE SCRIPT
// =====================
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxhqP230ZUXOYPtWmD2viPM6m3VAFZWApAX7ilA_ILvx6-7D-9OU1feMmMHGG09QXZ9/exec";

// =====================
// FUNCIONES
// =====================
function showStep(stepToShow) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.remove("active");
  });
  stepToShow.classList.add("active");
}

function enviarLead(consumo, presupuesto, kwp, escenario) {
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      consumo,
      presupuesto,
      kwp,
      escenario,
    }),
  }).catch(err => console.error("Error guardando lead", err));
}

// =====================
// PASO 1 → PASO 2
// =====================
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  if (!consumo || consumo <= 0) {
    alert("Ingresa un consumo válido.");
    return;
  }
  showStep(step2);
});

// =====================
// PASO 2 → RESULTADO
// =====================
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
  }

  const kwp = (consumo / 120).toFixed(1);
  const costoEstimado = kwp * 4500000;

  const escenario =
    presupuesto >= costoEstimado ? "Viable" : "Parcial";

  // ✅ GUARDAR LEAD
  enviarLead(consumo, presupuesto, kwp, escenario);

  // ✅ WHATSAPP
  const telefono = "5732272287
