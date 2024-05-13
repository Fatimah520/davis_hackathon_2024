let currentQuestionIndex = 1;

function selectOption(option) {
  const currentQuestion = document.getElementById(`question${currentQuestionIndex}`);
  currentQuestion.classList.add('slide-out-right');

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.classList.add('slide-out-right');

  setTimeout(() => {
    currentQuestion.classList.add('hidden');
    currentQuestionIndex++;
    const nextQuestion = document.getElementById(`question${currentQuestionIndex}`);
    
  }, 500); // Adjust this delay to match your CSS transition duration
}

function redirectToHome() {
  // Get the selected image file
  var fileInput = document.getElementById('fileInput');
  var imageFile = fileInput.files[0];

  // Check if a file is selected
  if (imageFile) {
      // Create a FileReader object
      var reader = new FileReader();

      // Define a callback function to be called when reading is complete
      reader.onload = function(event) {
          // Get the data URL of the image
          var imageUrl = event.target.result;

          // Redirect to home.html with the image data URL as a query parameter
          window.location.href = "home.html?image=" + encodeURIComponent(imageUrl);
      };

      // Read the selected image file as a data URL
      reader.readAsDataURL(imageFile);
  } else {
      // If no image file is selected, simply redirect to home.html
      window.location.href = "home.html";
  }
}


var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var imageDataUrl = urlParams.get('image');

// Display the uploaded image
var uploadedImage = document.getElementById('uploadedImage');
if (imageDataUrl) {
    uploadedImage.src = decodeURIComponent(imageDataUrl);
} else {
    uploadedImage.src = "placeholder.jpg"; // Provide a placeholder image if no image is uploaded
}

document.getElementById("petForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  var formData = new FormData(this); // Create form data object
  fetch("/submit", { // Send form data to the Flask server
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          document.getElementById("message").textContent = "Form submitted successfully!";
      } else {
          document.getElementById("message").textContent = "Error submitting form. Please try again.";
      }
  })
  .catch(error => {
      console.error("Error:", error);
      document.getElementById("message").textContent = "Error submitting form. Please try again.";
  });
});

function redirectToHome() {
  // Redirect to home.html
  window.location.href = "home.html";
}