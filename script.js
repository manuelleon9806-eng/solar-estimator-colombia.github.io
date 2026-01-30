const steps = document.querySelectorAll(".step");
let currentStep = 0;
function showStep(stepIndex) {
    steps.forEach(step => step.classList.remove("active"));
    steps[stepIndex].classList.add("active");
}


