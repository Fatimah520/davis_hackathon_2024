function handleLost() {
  const lostButton = document.querySelector('.losta');
  const foundButton = document.querySelector('.founda');
  const buttonsContainer = document.getElementById('buttonsContainer');
  const surveyContainer = document.getElementById('surveyContainer');

  lostButton.classList.add('animate', 'move-out');
  foundButton.classList.add('animate', 'move-out');
  buttonsContainer.style.justifyContent = 'center'; // Center the remaining button(s)

  setTimeout(() => {
    buttonsContainer.style.display = 'none'; // Hide the buttons after animation
    surveyContainer.style.display = 'flex'; // Show the survey container
    surveyContainer.style.justifyContent = 'center'; // Center horizontally
    surveyContainer.style.alignItems = 'center'; // Center vertically
    surveyContainer.classList.add('animate', 'move-in');
  }, 500); // Adjust timing if needed
}

function selectOption(option) {
  const genderSection = document.getElementById('gender-section');
  const genderOptions = document.getElementById('genderOptions');
  const surveyContainer = document.getElementById('surveyContainer');
  const colorSectionExists = document.getElementById('color-section');

  genderSection.classList.add('move-out');
  genderOptions.classList.add('move-out');

  setTimeout(() => {
    genderSection.style.display = 'none';
    genderOptions.style.display = 'none';

    if (option === 'Lost' || option === 'Found') {
      if (!colorSectionExists) {
        const colorSection = document.createElement('h2');
        colorSection.textContent = 'Color';
        colorSection.id = 'color-section';
        colorSection.classList.add('survey-question', 'animate', 'move-in');
        surveyContainer.appendChild(colorSection);

        const colorSelect = document.createElement('select');
        colorSelect.id = 'colorSelect';
        colorSelect.classList.add('select', 'animate', 'move-in');
        colorSelect.addEventListener('change', () => selectColor(colorSelect.value));
        const colorOptions = ['Select Color', 'Gray', 'Black', 'White', 'Beige', 'Silver'];
        colorOptions.forEach((color, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = color;
          colorSelect.appendChild(option);
        });
        surveyContainer.appendChild(colorSelect);

        surveyContainer.style.justifyContent = 'center';
        surveyContainer.style.alignItems = 'center';
      }
    }
  }, 500); // Adjust timing if needed
}

function selectColor(color) {
  const colorSection = document.getElementById('color-section');
  const colorSelect = document.getElementById('colorSelect');

  colorSection.classList.add('move-out');
  colorSelect.classList.add('move-out');

  setTimeout(() => {
    colorSection.style.display = 'none';
    colorSelect.style.display = 'none';

    // Here you can handle submitting the survey or any other action
    // For now, let's just log the selected color
    console.log('Selected color:', color);
  }, 500); // Adjust timing if needed
}

function fillSurvey() {
  // Add your logic for handling the survey submission
}
