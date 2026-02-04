let data = {};

function nextStep(step) {
  if (step === 1) {
    const city = document.getElementById("city").value;
    if (!city) return alert("Ingresa la ciudad");
    data.city = city;
  }

  if (step === 2) {
    const property = document.getElementById("property").value;
    if (!property) return alert("Selecciona el tipo de inmueble");
    data.property = property;
  }

  document.getElementById(`step${step}`).classList.remove("active");
  document.getElementById(`step${step + 1}`).classList.add("active");
}

function calculate() {
  const consumption = document.getElementById("consumption").value;
  if (!consumption || consumption <= 0) {
    return alert("Ingresa un consumo válido");
  }

  data.consumption = consumption;

  const systemKW = (consumption / 120).toFixed(1);
  const price = (systemKW * 4500000).toLocaleString("es-CO");

  document.getElementById("estimate").innerHTML =
    `Para un consumo de <b>${consumption} kWh</b>, necesitas un sistema de <b>${systemKW} kW</b>.<br>
     Inversión estimada: <b>$${price} COP</b>`;

  const message = encodeURIComponent(
    `Hola, hice una estimación solar:\n\n` +
    `📍 Ciudad: ${data.city}\n` +
    `🏠 Inmueble: ${data.property}\n` +
    `⚡ Consumo: ${consumption} kWh\n` +
    `🔋 Sistema estimado: ${systemKW} kW\n` +
    `💰 Valor aproximado: $${price} COP`
  );

  document.getElementById("whatsapp").href =
    `https://wa.me/573227228786?text=${message}`;

  document.getElementById("step3").classList.remove("active");
  document.getElementById("result").classList.add("active");
}

function resetAll() {
  data = {};
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step1").classList.add("active");
}

