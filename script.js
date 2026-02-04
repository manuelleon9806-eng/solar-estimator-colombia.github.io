let pasoActual = 1;

// ====== ELEMENTOS ======
const pasos = document.querySelectorAll(".step");
const progress = document.getElementById("progress");

// ====== MOSTRAR PASO ======
function mostrarPaso(paso) {
  pasos.forEach((step, index) => {
    step.classList.toggle("active", index + 1 === paso);
  });

  const porcentaje = ((paso - 1) / (pasos.length - 1)) * 100;
  progress.style.width = porcentaje + "%";
}

// ====== SIGUIENTE PASO ======
function siguientePaso() {
  if (pasoActual < pasos.length) {
    pasoActual++;
    mostrarPaso(pasoActual);
  }
}

// ====== CALCULAR ESTIMACIÓN ======
function calcular() {
  const consumo = parseFloat(document.getElementById("consumo").value);

  if (isNaN(consumo) || consumo <= 0) {
    alert("Ingresa un valor válido");
    return;
  }

  // Fórmula básica (ajustable)
  const sistema = (consumo / 120).toFixed(2);

  document.getElementById("resultadoFinal").innerText = sistema + " kWp";

  // 👉 GUARDAR LEAD
  guardarLead(consumo, sistema);

  siguientePaso();
}

// ====== GUARDAR LEAD ======
function guardarLead(consumo, sistema) {
  const lead = {
    id: crypto.randomUUID(),
    consumo: consumo,
    sistema_estimado: sistema,
    fecha: new Date().toISOString(),
    fuente: "estimador_web"
  };

  // 1️⃣ Guardar local (backup seguro)
  let leads = JSON.parse(localStorage.getItem("leads")) || [];
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));

  // 2️⃣ Enviar a backend (si existe)
  enviarLead(lead);
}

// ====== ENVIAR LEAD AL BACKEND ======
function enviarLead(lead) {
  const ENDPOINT = "https://TU-ENDPOINT-AQUI.com/leads"; // luego lo cambiamos

  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lead)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Lead enviado correctamente:", data);
  })
  .catch(err => {
    console.warn("No se pudo enviar el lead, quedó guardado localmente", err);
  });
}

// ====== REINICIAR ======
function reiniciar() {
  pasoActual = 1;
  mostrarPaso(pasoActual);
  document.getElementById("consumo").value = "";
}

// ====== INICIAL ======
mostrarPaso(pasoActual);




