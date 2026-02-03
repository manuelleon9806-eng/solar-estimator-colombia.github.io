// ===============================
// ELEMENTOS
// ===============================
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnStep1 = document.getElementById("btn-step-1");
const btnStep2 = document.getElementById("btn-step-2");
const btnRestart = document.getElementById("btn-restart");

const consumoInput = document.getElementById("consumo");
const presupuestoInput = document.getElementById("presupuesto");

const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoTexto = document.getElementById("resultado");

const progressBar = document.getElementById("progress-bar");

// FORM LEAD
const leadForm = document.getElementById("lead-form");
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");

// ===============================
// FUNCIONES
// ===============================
function showStep(stepToShow) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.remove("active");
  });
  stepToShow.classList.add("active");
}

function updateProgress(percent) {
  if (progressBar) {
    progressBar.style.width = percent;
  }
}

// ===============================
// PASO 1 → PASO 2
// ===============================
btnStep1.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);

  if (!consumo || consumo <= 0) {
    alert("Ingresa un consumo válido en kWh.");
    return;
  }

  showStep(step2);
  updateProgress("66%");
});

// ===============================
// PASO 2 → PASO 3 (RESULTADO)
// ===============================
btnStep2.addEventListener("click", () => {
  const consumo = Number(consumoInput.value);
  const presupuesto = Number(presupuestoInput.value);

  if (!presupuesto || presupuesto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
  }

  // CÁLCULO SIMPLE (COLOMBIA)
  const kwRequeridos = (consumo / 120).toFixed(1); // promedio mensual
 costoEstimado = kwRequeridos * 4500000;

  resultadoFinal.textContent = `${kwRequeridos} kWp aprox`;

  if (presupuesto >= costoEstimado) {
    resultadoTexto.textContent =
      "Con este presupuesto podrías cubrir gran parte de tu consumo mensual con energía solar. Es un escenario viable para evaluación técnica.";
  } else {
    resultadoTexto.textContent =
      "Con este presupuesto podrías iniciar un sistema parcial que reduzca tu factura eléctrica.";
  }

  showStep(step3);
  updateProgress("100%");
});

// ===============================
// FORMULARIO → WHATSAPP
// ===============================
if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const consumo = consumoInput.value;
    const presupuesto = presupuestoInput.value;
    const sistema = resultadoFinal.textContent;

    if (!nombre || !telefono) {
      alert("Completa tus datos para continuar.");
      return;
    }

    const mensaje = encodeURIComponent(
      `Hola 👋\n\nHice una estimación solar:\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `📱 Teléfono: ${telefono}\n` +
      `🔋 Consumo: ${consumo} kWh\n` +
      `💰 Presupuesto: $${presupuesto} COP\n` +
      `⚡ Sistema estimado: ${sistema}\n\n` +
      `Quiero continuar con un instalador.`
    );
guardarLead({
  nombre,
  telefono,
  consumo,
  presupuesto,
  sistema,
  escenario: presupuesto >= costoEstimado ? "Viable" : "Parcial"
});

    const telefonoDestino = "573227228786"; // 👈 CAMBIA ESTO
    window.open(`https://wa.me/${telefonoDestino}?text=${mensaje}`, "_blank");
  });
}

// ===============================
// REINICIAR CALCULADORA
// ===============================
if (btnRestart) {
  btnRestart.addEventListener("click", () => {
    consumoInput.value = "";
    presupuestoInput.value = "";
    if (nombreInput) nombreInput.value = "";
    if (telefonoInput) telefonoInput.value = "";

    showStep(step1);
    updateProgress("33%");
  });
}

// ===============================
// INIT
// ===============================
updateProgress("33%");
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbywRyr6wd5hlyog7sbokwmunhcatmovfuoXS2mu5oHMg7rvx4P71E_xNKV7AV0xQPXX/exec";
function guardarLead(data) {
  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(() => {
    console.log("Lead guardado correctamente");
  })
  .catch(err => {
    console.error("Error guardando lead", err);
  });
}



