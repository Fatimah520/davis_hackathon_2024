function handleButtonClick() {
    // Scroll to the next section of the page
    var nextSection = document.getElementById('nextSection');
    nextSection.scrollIntoView({ behavior: 'smooth' });

    // Fade out the current button
    this.style.opacity = '0';

    // Set a timeout to fade in the next button after fade out is complete
    setTimeout(() => {
        // Hide the current button
        this.classList.add('hidden');

        // Find the next button and fade it in
        var nextButtonId;
        if (this.id === 'maleButton') {
            nextButtonId = 'femaleButton';
        } else if (this.id === 'femaleButton') {
            nextButtonId = 'ageButton';
        } else if (this.id === 'ageButton') {
            nextButtonId = 'animalTypeButton';
        }
        var nextButton = document.getElementById(nextButtonId);
        nextButton.classList.remove('hidden');
        nextButton.style.opacity = '1';
    }, 500); // 500ms = 0.5s, same duration as the transition in CSS
}

// Add click event listeners to buttons
document.getElementById('maleButton').addEventListener('click', handleButtonClick);
document.getElementById('femaleButton').addEventListener('click', handleButtonClick);
document.getElementById('ageButton').addEventListener('click', handleButtonClick);
document.getElementById('animalTypeButton').addEventListener('click', handleButtonClick);
