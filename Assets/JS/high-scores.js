const goBackButton = document.getElementById("go-back-button"); // Go back button
const clearButton = document.getElementById("clear-button"); // Clear scores button

// Function to retrieve and display high scores
function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = ""; // Clear the existing list

    // Retrieve high scores from Local Storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort the high scores in descending order (highest scores first)
    highScores.sort((a, b) => b.score - a.score);

    // Display the high scores in a list
    highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Call the function to display high scores when the high scores page loads
displayHighScores();

// Event listeners
document.getElementById("go-back-button").addEventListener("click", function () {
    // Redirect to the quiz page or another page
    window.location.href = "/index.html";
});

document.getElementById("clear-button").addEventListener("click", function () {
    // Clear high scores logic
    displayHighScores();
});

goBackButton.addEventListener("click", function () {
    location.reload(); // Reload the page to start over
});

clearButton.addEventListener("click", function () {
    highScoresList.innerHTML = ""; // Clears the high scores list
});
