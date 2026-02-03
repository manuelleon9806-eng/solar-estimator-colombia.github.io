// STEPS
const steps = document.querySelectorAll(".step");

// INPUTS
const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");

// RESULTADOS
const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoTexto = document.getElementById("resultado");

// BOTONES
const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");
const leadForm = document.getElementById("lead-form");

// ENDPOINT
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxRCtvEyqmxfZBFV13b9ByfNa6OOT2R7BXc6AbFqZTfknPMDURfeOJfqYGDyT4_lRmh/exec";

function showStep(stepId) {
  steps.forEach(step => step.classList.remove("active"));
  document.getElementById(stepId).classList.add("active");
}

// PASO 1
btnStep1.addEventListener("click", () => {
  if (!consumoInput.value || consumoInput.value <= 0) {
    alert("Ingresa un consumo válido");
    return;
  }
  showStep("step-2");
});

// PASO 2
btnStep2.addEventListener("click", () => {
  if (!presupuestoInput.value || presupuestoInput.value <= 0) {
    alert("Ingresa un presupuesto válido");
    return;
  }

  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  const kwp = (consumo / 120).toFixed(1);
  const costo = kwp * 4500000;

  const escenario =
    presupuesto >= costo ? "Viable" : "Parcial";

  resultadoFinal.textContent = `${kwp} kWp`;
  resultadoTexto.textContent = `Escenario: ${escenario}`;

  showStep("step-3");
});

// FORMULARIO FINAL
leadForm.addEventListener("submit", e => {
  e.preventDefault();

  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);
  const kwp = (consumo / 120).toFixed(1);
  const escenario =
    presupuesto >= kwp * 4500000 ? "Viable" : "Parcial";

  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      telefono,
      consumo,
      presupuesto,
      kwp,
      escenario
    }),
  });

  const mensaje = encodeURIComponent(
`Hola 👋 soy ${nombre}

Hice una estimación solar:

⚡ Consumo: ${consumo} kWh
🔋 Sistema: ${kwp} kWp
💰 Presupuesto: $${presupuesto.toLocaleString()} COP
📊 Escenario: ${escenario}

Quiero continuar con un instalador.`
  );

  window.open(
    `https://wa.me/57${telefono}?text=${mensaje}`,
    "_blank"
  );
});
// 🔁 REINICIAR CALCULADORA
const btnRestart = document.getElementById("btn-restart");

if (btnRestart) {
  btnRestart.addEventListener("click", () => {
    // limpiar inputs
    document.getElementById("consumo").value = "";
    document.getElementById("presupuesto").value = "";

    // volver al paso 1
    showStep(step1);

    // reiniciar barra de progreso
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = "33%";
    }
  });
}


