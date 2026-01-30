const steps = document.querySelectorAll(".step");
let currentStep = 0;
function showStep(stepIndex) {
    steps.forEach(step => step.classList.remove("active"));
    steps[stepIndex].classList.add("active");
}
document.getElementById("next1").addEventListener("click", () => {
    currentStep = 1;
    showStep(currentStep);
});
document.getElementById("next2").addEventListener("click", () => {
    calcularResultado();
    currentStep = 2;
    showStep(currentStep);
});
function calcularResultado() {
    const consumo = document.getElementById("consumo").value;
    const presupuesto = document.getElementById("presupuesto").value;

    const panelesEstimados = Math.ceil(consumo / 120);
    const mensaje = `
        Con un consumo de ${consumo} kWh,
        necesitarías aproximadamente ${panelesEstimados} paneles.
        Presupuesto ingresado: $${presupuesto} COP.
    `;

    document.getElementById("resultado").innerText = mensaje;
}



