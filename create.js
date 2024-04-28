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

  


// Function to display the uploaded images
function displayUploadedImages() {
  const uploadedImagesContainer = document.getElementById('uploadedImagesContainer');
  uploadedImagesContainer.innerHTML = '';
  const uploadedImages = retrieveImageData();
  uploadedImages.forEach(imageData => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');

      const img = new Image();
      img.src = imageData;
      img.alt = 'Uploaded Image';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Post';
      deleteButton.classList.add('delete-post');
      deleteButton.onclick = () => deleteImage(imageData);

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteButton);
      uploadedImagesContainer.appendChild(imgContainer);
  });
}

// Function to store image data in local storage
function storeImageData(imageData) {
  const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
  uploadedImages.push(imageData);
  localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
}

// Function to retrieve image data from local storage
function retrieveImageData() {
  return JSON.parse(localStorage.getItem('uploadedImages')) || [];
}

// Function to delete an uploaded image
function deleteImage(imageData) {
  const uploadedImages = retrieveImageData().filter(img => img !== imageData);
  localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
  displayUploadedImages();
}

// Function to handle image upload and finding similar pets
async function uploadAndFindSimilarPets() {
  // Your implementation for finding similar pets goes here
}

// Function to handle image upload and posting
async function uploadAndPostImage() {
  const input = document.getElementById('imageInput');
  const file = input.files[0];
  if (!file) return;

  // Display the uploaded image
  const imageUrl = URL.createObjectURL(file);
  storeImageData(imageUrl);
  displayUploadedImages();

  // You can also trigger further actions such as sending the image to the server for processing
  // Your implementation for sending the image to the server goes here
}

// Check if there are uploaded images in local storage and display them
window.onload = function() {
  displayUploadedImages();
};