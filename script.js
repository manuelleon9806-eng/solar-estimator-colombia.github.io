function nextStep(step) {
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.add("hidden");

  document.getElementById("step" + step).classList.remove("hidden");
}

function estimate() {
  const city = document.getElementById("city").value;
  const property = document.getElementById("property").value;
  const consumption = Number(document.getElementById("consumption").value);

  if (!city || !property || !consumption) {
    alert("Completa todos los campos");
    return;
  }

  const systemSize = (consumption / 120).toFixed(1);
  const panels = Math.ceil(systemSize / 0.55);
  const price = Math.round(systemSize * 4200000);

  document.getElementById("result").innerHTML = `
    <h3>Estimación lista ✅</h3>
    <p><strong>Sistema:</strong> ${systemSize} kWp</p>
    <p><strong>Paneles:</strong> ${panels}</p>
    <p><strong>Precio aprox:</strong> $${price.toLocaleString("es-CO")} COP</p>
    <p>Un asesor puede ayudarte con una cotización exacta.</p>
  `;

  document.getElementById("result").classList.remove("hidden");

  const message = encodeURIComponent(
    `Hola, hice una estimación solar:\nCiudad: ${city}\nInmueble: ${property}\nConsumo: ${consumption} kWh\nSistema estimado: ${systemSize} kWp`
  );

  const whatsappUrl = `https://wa.me/573227228786?text=${message}`;

  const btn = document.getElementById("whatsapp");
  btn.href = whatsappUrl;
  btn.classList.remove("hidden");
}
