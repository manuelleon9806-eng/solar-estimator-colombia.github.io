document.addEventListener("DOMContentLoaded", () => {

  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progress-bar");

  const btn1 = document.getElementById("btn-step-1");
  const btn2 = document.getElementById("btn-step-2");
  const btnRestart = document.getElementById("btn-restart");
  const btnWhatsapp = document.getElementById("btn-whatsapp");

  const consumoInput = document.getElementById("consumo");
  const presupuestoInput = document.getElementById("presupuesto");

  const resultadoFinal = document.getElementById("resultadoFinal");
  const resultadoTexto = document.getElementById("resultadoTexto");

  let step = 0;

  function showStep(i) {
    steps.forEach((s, index) =>
      s.classList.toggle("active", index === i)
    );
    progressBar.style.width = `${(i + 1) * 33.33}%`;
  }

  showStep(0);

  btn1.addEventListener("click", () => {
    if (consumoInput.value <= 0) {
      alert("Ingresa un consumo válido");
      return;
    }
    step = 1;
    showStep(step);
  });

  btn2.addEventListener("click", () => {
    const consumo = Number(consumoInput.value);
    const presupuesto = Number(presupuestoInput.value);

    if (presupuesto <= 0) {
      alert("Ingresa un presupuesto válido");
      return;
    }

    const kwp = (consumo / 120).toFixed(1);
    resultadoFinal.textContent = `${kwp} kWp`;

    resultadoTexto.textContent =
      presupuesto >= kwp * 4500000
        ? "Con este presupuesto el sistema es totalmente viable."
        : "Con este presupuesto podrías iniciar con un sistema parcial.";

    const mensaje = encodeURIComponent(
      `Hola 👋 hice una estimación solar:\n\n` +
      `🔋 Consumo: ${consumo} kWh\n` +
      `⚡ Sistema estimado: ${kwp} kWp\n` +
      `💰 Presupuesto: $${presupuesto.toLocaleString()} COP\n\n` +
      `Quiero hablar con un instalador.`
    );

    btnWhatsapp.href = `https://wa.me/57TU_NUMERO_AQUI?text=${mensaje}`;

    step = 2;
    showStep(step);
  });

  btnRestart.addEventListener("click", () => {
    consumoInput.value = "";
    presupuestoInput.value = "";
    step = 0;
    showStep(step);
  });

});
