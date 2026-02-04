let currentStep = 1;
const totalSteps = 4;

function nextStep() {
  if (currentStep === 1 && !document.getElementById("city").value) return;
  if (currentStep === 2 && !document.getElementById("property").value) return;

  document.getElementById(`step${currentStep}`).classList.remove("active");
  currentStep++;
  document.getElementById(`step${currentStep}`).classList.add("active");

  updateProgress();
}

function calculate() {
  const city = document.getElementById("city").value;
  const property = document.getElementById("property").value;
  const consumption = Number(document.getElementById("consumption").value);

  if (!consumption || consumption <= 0) return;

  document.getElementById("step3").classList.remove("active");
  document.getElementById("result").classList.add("active");
  updateProgress();

  // Cálculo simple realista Colombia
  const systemSize = (consumption / 120).toFixed(1); // kWp
  const panels = Math.ceil(systemSize / 0.55);
  const price = Math.round(systemSize * 4200000);

  document.getElementById("output").innerHTML = `
    <p><strong>Ciudad:</strong> ${city}</p>
    <p><strong>Inmueble:</strong> ${property}</p>
    <p><strong>Sistema estimado:</strong> ${systemSize} kWp</p>
    <p><strong>Paneles:</strong> ${panels}</p>
    <p><strong>Inversión aproximada:</strong> $${price.toLocaleString("es-CO")} COP</p>
  `;

  // WhatsApp SIN ERROR 404
  const message = encodeURIComponent(
    `Hola, hice una estimación solar.\n\nCiudad: ${city}\nInmueble: ${property}\nConsumo: ${consumption} kWh\nSistema estimado: ${systemSize} kWp`
  );

  document.getElementById("whatsappBtn").href =
    `https://wa.me/573227228786?text=${message}`;
}

function updateProgress() {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}


