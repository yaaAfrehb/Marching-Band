let currentQuestion = 0;
let score = 0;

const questions = document.querySelectorAll(".question");

// Show only the current question
function showQuestion() {

    questions.forEach((question, index) => {

        if (index === currentQuestion) {
            question.style.display = "block";
        } else {
            question.style.display = "none";
        }

    });

    // Update "1 of 10"
    document.getElementById("question-number").textContent =
        `${currentQuestion + 1} of ${questions.length}`;

    // Update progress bar
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";

    // Change button on last question
    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-button").textContent =
            "Submit →";
    } else {
        document.getElementById("next-button").textContent =
            "Next →";
    }
}


// Next button
document.getElementById("next-button").addEventListener("click", function (event) {

    event.preventDefault();

    // Make sure they answered
    const selected =
        questions[currentQuestion].querySelector(
            'input[type="radio"]:checked'
        );

    if (!selected) {
        alert("Pick an answer first! 🎺");
        return;
    }

    // ⭐ NEW: Check if the selected answer is correct before changing the question
    // This assumes your correct radio inputs look like: <input type="radio" value="correct">
    if (selected.value === "correct") {
        score++;
    }

    // Move to next question
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }

});


// Results
function showResults() {

    // Hide quiz
    document.getElementById("bandQuiz").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.querySelector(".quiz-top").style.display = "none";
    document.querySelector(".progress").style.display = "none";

    // Show results
    // ⭐ UPDATED: Added the dynamic score out of 10 inside the template literal
    document.getElementById("results").innerHTML=`
        <h1>🎺 You survived!</h1>
        <p>You scored <strong>${score}</strong> out of ${questions.length} questions.</p>
        <button onclick="location.reload()">Take it again</button>
    `;
}

window.addEventListener("DOMContentLoaded", () =>  {
    showQuestion();
});

