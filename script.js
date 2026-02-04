const form = document.getElementById("lead-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    consumo,
    presupuesto,
    resultado: document.getElementById("resultadoFinal").innerText
  };

  await fetch("PEGA_AQUI_TU_URL_DE_APPS_SCRIPT", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

  alert("✅ Datos enviados correctamente. Te contactaremos pronto.");
  form.reset();
});
const form = document.getElementById("lead-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    consumo,
    presupuesto,
    resultado: document.getElementById("resultadoFinal").innerText
  };

  await fetch("https://script.google.com/macros/s/AKfycby6dOzSuQ8Zwy2uQud6feSB7zfKGKS9qDhxqNUJ-WHZft4B0LExPeLEYfKjvvgcqzPhMA/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

  alert("✅ Datos enviados correctamente. Te contactaremos pronto.");
  form.reset();
});



