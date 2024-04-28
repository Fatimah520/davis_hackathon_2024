// Get references to DOM elements
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const progressBar = document.getElementById('progressBar');
const message = document.getElementById('message');
const plusButton = document.querySelector('.custom-file-upload'); // Select the plus button

// Add event listener to the plus button click event
plusButton.addEventListener('click', function() {
  imageInput.click(); // Trigger the file input when the plus button is clicked
});

// Add event listener to the file input change event
imageInput.addEventListener('change', function() {
  const formData = new FormData(); // Create a new FormData object
  formData.append('image', imageInput.files[0]); // Append the selected file to the FormData object

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the XMLHttpRequest object
  xhr.open('POST', '/upload');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Listen for progress events
  xhr.upload.addEventListener('progress', function(event) {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      progressBar.style.width = percentComplete + '%'; // Update the progress bar width
    }
  });

  // Listen for the XMLHttpRequest 'load' event
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Display a success message
      message.textContent = 'File uploaded successfully';
      message.style.color = 'green';
    } else {
      // Display an error message
      message.textContent = 'An error occurred while uploading the file';
      message.style.color = 'red';
    }
  };

  // Listen for the XMLHttpRequest 'error' event
  xhr.onerror = function() {
    // Display an error message
    message.textContent = 'An error occurred while uploading the file';
    message.style.color = 'red';
  };

  // Send the FormData object with the file to the server
  xhr.send(formData);
});
