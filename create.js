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
  const colorSection = document.getElementById('color-section');

  genderSection.style.display = 'none';
  genderOptions.style.display = 'none';

  if (option === 'Lost' || option === 'Found') {
    if (!colorSection) {
      const surveyContainer = document.getElementById('surveyContainer');

      const colorSection = document.createElement('h2');
      colorSection.textContent = 'Color';
      colorSection.id = 'color-section';
      surveyContainer.appendChild(colorSection);

      const colorSelect = document.createElement('select');
      colorSelect.id = 'colorSelect';
      colorSelect.classList.add('select');
      colorSelect.addEventListener('change', () => selectColor(colorSelect.value));
      const colorOptions = ['Select Color', 'Gray', 'Black', 'White', 'Beige', 'Silver'];
      colorOptions.forEach((color, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = color;
        colorSelect.appendChild(option);
      });
      surveyContainer.appendChild(colorSelect);

      // Scroll down to the color section
      colorSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function selectColor(color) {
  const colorSection = document.getElementById('color-section');
  const colorSelect = document.getElementById('colorSelect');

  colorSection.style.display = 'none';
  colorSelect.style.display = 'none';

  // Here you can handle submitting the survey or any other action
  // For now, let's just log the selected color
  console.log('Selected color:', color);
}

  
// Function to handle file input animation
function animateFileInput() {
  const uploadText = document.getElementById('uploadText');
  const uploadBtn = document.querySelector('.upload-btn');
  const fileInput = document.getElementById('fileInput');

  uploadText.classList.remove('animate-in');
  uploadBtn.classList.remove('animate-in');
  fileInput.classList.remove('animate-out');

  setTimeout(() => {
    uploadText.classList.add('animate-out');
    uploadBtn.classList.add('animate-out');
    fileInput.classList.add('animate-in');
  }, 500); // Adjust timing if needed
}

// Add event listener to trigger animation when file input changes
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', animateFileInput);
