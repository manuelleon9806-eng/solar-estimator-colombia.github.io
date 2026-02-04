/*************************
 VARIABLES GLOBALES
*************************/
let pasoActual = 0;
let consumo = 0;
let presupuesto = 0;

const pasos = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

/*************************
 CONTROL DE PASOS
*************************/
function mostrarPaso(index) {
  pasos.forEach((paso, i) => {
    paso.style.display = i === index ? "block" : "none";
  });

  progressBar.style.width = `${((index + 1) / pasos.length) * 100}%`;
}

function siguientePaso() {
  if (pasoActual < pasos.length - 1) {
    pasoActual++;
    mostrarPaso(pasoActual);
  }
}

function pasoAnterior() {
  if (pasoActual > 0) {
    pasoActual--;
    mostrarPaso(pasoActual);
  }
}

/*************************
 BOTONES DE PASOS
*************************/
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", siguientePaso);
});

document.querySelectorAll("[data-prev]").forEach(btn => {
  btn.addEventListener("click", pasoAnterior);
});

/*************************
 CALCULO DE ESTIMACION
*************************/
function calcularEstimacion() {
  consumo = Number(document.getElementById("consumo").value);
  presupuesto = Number(document.getElementById("presupuesto").value);

  if (!consumo || !presupuesto) {
    alert("Completa consumo y presupuesto");
    return;
  }

  const paneles = Math.ceil(consumo / 40);
  const potencia = (paneles * 550) / 1000;

  const resultado = `
🔆 Sistema estimado:
• ${paneles} paneles
• ${potencia.toFixed(2)} kWp
• Ahorro aprox. 90% factura
  `;

  document.getElementById("resultadoFinal").innerText = resultado;

  siguientePaso();
}

/*************************
 BOTON CALCULAR
*************************/
document.getElementById("btnCalcular").addEventListener("click", calcularEstimacion);

/*************************
 ENVIAR LEAD + WHATSAPP
*************************/
document.getElementById("btnEnviar").addEventListener("click", enviarLead);

async function enviarLead() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !telefono) {
    alert("Completa nombre y WhatsApp");
    return;
  }

  const payload = {
    nombre,
    telefono,
    consumo,
    presupuesto,
    fecha: new Date().toLocaleString()
  };

  try {
    // 🔹 GUARDAR EN GOOGLE SHEETS
    await fetch("https://script.google.com/macros/s/AKfycbxu5jCFRALorx1_SYUydLnc0W1slZTcIOOpm_-ekibcfNNlPMzmrYVeRQZu-UHpJgTC1Q/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    // 🔹 MENSAJE WHATSAPP
    const mensaje = `
Hola, soy ${nombre}.
Hice una estimación solar y obtuve:

🔋 Consumo: ${consumo} kWh
💰 Presupuesto: $${presupuesto}
⚡ Sistema recomendado: ${document.getElementById("resultadoFinal").innerText}

Quiero asesoría personalizada.
    `.trim();

    const url = `https://wa.me/57${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

  } catch (error) {
    alert("Error guardando el lead");
    console.error(error);
  }
}

/*************************
 INICIAL
*************************/
mostrarPaso(pasoActual);



