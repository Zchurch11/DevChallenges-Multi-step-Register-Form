const registerForm = document.getElementById('card-1')
const topicsForm = document.getElementById('card-2')
const summary = document.getElementById('card-3')
const submitBtn = document.querySelector('.submit-btn')

function checkFields(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.name-input');
    const emailInput = document.querySelector('.email-input');
    const name = nameInput.value;
    const email = emailInput.value;

    const isValid = validateInputs(name, email);
    if (isValid) {
        switchToTopicsForm();
        
        return { step: 1, name, email };
    } else {
        alert('Please enter a valid name and email');
        return { step: 0, name: null, email: null };
    }
}

function validateInputs(name, email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return name.length >= 5 && regex.test(email);
}



function switchToTopicsForm() {
    registerForm.style.display = 'none';
    topicsForm.style.display = 'flex';
    addTopicEvents();
}

function addTopicEvents() {
    topicsForm.addEventListener('click', (e) => {
        if (e.target.tagName === 'LABEL') {
            e.preventDefault();
            e.target.classList.toggle('active');
        }
    });
}

function checkLabelSelection() {
    const selectedLabels = topicsForm.querySelectorAll('label.active');
    console.log(selectedLabels)
    return selectedLabels.length > 0;
}

function getLabelSelections(){
    const selectedLabels = topicsForm.querySelectorAll('label.active')
    return Array.from(selectedLabels).map(label => label.textContent)
}

function setStep(step) {
    const stepIndicators = document.querySelectorAll('.step');
    const stepText = document.querySelector('.step-text')
    stepIndicators.forEach((stepIndicator, index) => {
        if (index === step) {
            stepIndicator.classList.add('current');
            
        } else if (index < step) {
            stepIndicator.classList.remove('current');
            stepIndicator.style.backgroundColor = 'var(--primary)';
        }
        
        stepText.textContent =`Step ${step + 1} of 3`
    });
}
function switchToSummary(e){
    const selectedTopics = Array.from(getLabelSelections())
    const userInfo = checkFields(e)
    const topicsList = document.querySelector('.topics-el')
    topicsForm.style.display = 'none'
    summary.style.display = 'flex'
    summary.innerHTML = `<h4>Summary</h4>
                <p><span class="text-gray">Name:</span> ${userInfo.name}</p>
                <p><span class="text-gray">Email:</span> ${userInfo.email}</p>
                <ul class="topics-el"><span class="text-gray">Topics:</span>${
                    selectedTopics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
                <button class="submit-btn" type="submit">Confirm</button>`
  
    console.log(selectedTopics, userInfo)
}

function renderConfirmation(){
    alert('✅ Success')
}

topicsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkLabelSelection()) {
        const nextStep = 2; 
        setStep(nextStep);
        switchToSummary(e)
    } else {
        alert('Please select at least one topic');
    }
});

registerForm.addEventListener('submit', (e) => {
    const nextStep = checkFields(e);
    setStep(nextStep.step);
    console.log(nextStep.step)
});

summary.addEventListener('submit', (e) =>{
    e.preventDefault()
    renderConfirmation()
})
