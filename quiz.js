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



function showResults() {
    // Hide  quiz containers
    document.getElementById("bandQuiz").style.display = "none";
    document.querySelector(".quiz-top").style.display = "none";
    document.querySelector(".progress").style.display = "none";

    //to hold customized text and color
    let resultHeading = "";
    let resultDescription = "";
    let backgroundColor = "";

    // Check score to determine the tier and color
    if (score === 10) {
        resultHeading = "🥇 Absolute Unit!";
        resultDescription = "Flawless 10/10. You're definitely ready for Summer Band Camp.";
        backgroundColor = "#d4af37"; // Metallic Gold
    } else if (score >= 7) {
        resultHeading = "🎺 Band Camp Survivor";
        resultDescription = "AYYY, you made through... Didn't really expect you to.";
        backgroundColor = "#4caf50"; // Grass Green
    } else if (score >= 4) {
        resultHeading = "🥵 Severely Dehydrated";
        resultDescription = "At least you survived...  ";
        backgroundColor = "#ff9800"; // Heat Warning Orange
    } else {
        resultHeading = "❌ Instant Cut";
        resultDescription = "You're selling bad. Did you even show up to camp?";
        backgroundColor = "8B1E2D"; // Sun-burnt Red
    }

  
    document.body.style.setProperty("background", backgroundColor, "important");
    
    const styleOverride = document.createElement("style");
    styleOverride.innerHTML = "body::before, body::after { display: none !important; }";
    document.head.appendChild(styleOverride);


    document.body.style.color = "#ffffff"; 


const resultsContainer = document.getElementById("results");
resultsContainer.innerHTML = `
    <h1 class="results-heading">${resultHeading}</h1>
    <p class="results-score">Your Final Score: <strong>${score}</strong> out of ${questions.length}</p>
    <p class="results-desc">${resultDescription}</p>
    
    <button onclick="location.reload()" class="restart-btn">Take it again</button>

    <div class="results-nav-box">
        <a href="homepage.html" class="back-home-btn">← Back to Main Page</a>
    </div>
`;
    resultsContainer.style.display = "block";

}


window.addEventListener("DOMContentLoaded", () =>  {
    showQuestion();
});

