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
