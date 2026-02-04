// Elementos DOM
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const btnStep1 = document.getElementById('btn-step-1');
const btnStep2 = document.getElementById('btn-step-2');
const btnRestart = document.getElementById('btn-restart');
const progressBar = document.getElementById('progress-bar');
const consumoInput = document.getElementById('consumo');
const presupuestoInput = document.getElementById('presupuesto');
const resultado = document.getElementById('resultado');
const resultadoFinal = document.getElementById('resultadoFinal');
const leadForm = document.getElementById('lead-form');

// Variables globales
let consumo = 0;
let presupuesto = 0;
let costoEstimado = 0;

// Factores reales para Colombia (promedio irradiación: 4.5 kWh/m²/día, eficiencia paneles: 20%, factor seguridad: 1.2)
const irradiacionDiaria = 4.5; // kWh/m²/día (promedio nacional, fuente IDEAM)
const eficienciaPanel = 0.20; // 20%
const factorSeguridad = 1.2; // Para pérdidas y variabilidad

// Avanzar pasos
btnStep1.addEventListener('click', () => {
  consumo = parseFloat(consumoInput.value);
  if (isNaN(consumo) || consumo <= 0) {
    alert('Ingresa un consumo válido mayor a 0.');
    return;
  }
  step1.classList.remove('active');
  step2.classList.add('active');
  progressBar.style.width = '50%';
});

btnStep2.addEventListener('click', () => {
  presupuesto = parseFloat(presupuestoInput.value);
  if (isNaN(presupuesto) || presupuesto <= 0) {
    alert('Ingresa un presupuesto válido mayor a 0.');
    return;
  }
  step2.classList.remove('active');
  step3.classList.add('active');
  progressBar.style.width = '100%';
  calcularResultado();
});

// Cálculo preciso
function calcularResultado() {
  // kWh diarios requeridos (asumiendo 30 días/mes)
  const kWhDiarios = (consumo / 30) * factorSeguridad;

  // Tamaño sistema en kWp (kW pico)
  const kwRequeridos = kWhDiarios / (irradiacionDiaria * eficienciaPanel);

  // Costo estimado (aprox 4.500.000 COP por kWp, basado en mercado colombiano 2026)
  costoEstimado = kwRequeridos * 4500000;

  // Escenario basado en comparación
  let escenario = '';
  if (costoEstimado <= presupuesto) {
    escenario = `¡Viable! Puedes cubrir tu consumo con un sistema de ${kwRequeridos.toFixed(1)} kWp por aprox. ${costoEstimado.toLocaleString()} COP. Ahorro estimado: hasta 70% en factura.`;
  } else {
    const kwPosible = presupuesto / 4500000;
    escenario = `Con tu presupuesto, puedes instalar aprox. ${kwPosible.toFixed(1)} kWp, cubriendo ${(kwPosible / kwRequeridos * 100).toFixed(0)}% de tu consumo. Considera financiamiento.`;
  }

  resultado.textContent = escenario;
  resultadoFinal.textContent = `${kwRequeridos.toFixed(1)} kWp`;
}

// Enviar a WhatsApp (leads manuales por ahora)
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;

  // Mensaje prellenado
  const mensaje = `Hola, soy ${nombre}. Mi consumo es ${consumo} kWh/mes, presupuesto ${presupuesto.toLocaleString()} COP. Sistema estimado: ${resultadoFinal.textContent}. Costo aprox: ${costoEstimado.toLocaleString()} COP.`;

  // Redirigir a WhatsApp (tu número)
  const telefonoDestino = '573227228786';
  const whatsappUrl = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(mensaje)}`;
  window.open(whatsappUrl, '_blank');

  // Nota: Por ahora, guarda manualmente en Sheets desde WhatsApp. Más tarde automatizamos.
  alert('¡Gracias! Te redirigimos a WhatsApp. Guarda el lead manualmente por ahora.');
});

// Reiniciar
btnRestart.addEventListener('click', () => {
  step3.classList.remove('active');
  step1.classList.add('active');
  progressBar.style.width = '0%';
  consumoInput.value = '';
  presupuestoInput.value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('telefono').value = '';
  resultado.textContent = '';
  resultadoFinal.textContent = 'Calculando...';
});
